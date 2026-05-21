/**
 * HotelManagement Component
 * 
 * Admin page for managing hotels - Super Admin only
 */

import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface Hotel {
  id: number;
  name: string;
  location: string;
  address: string;
  stars: number;
  rating: number;
  review_count: number;
  distance_from_center: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Room {
  id: number;
  room_type: string;
  description: string;
  price_per_night: number;
  original_price?: number;
  available_rooms: number;
  max_guests: number;
  room_image_url: string;
  amenities: string[];
  is_active: boolean;
  discount_percentage: number;
  created_at: string;
  updated_at: string;
}

import { getAdminAuthHeaders } from '@/utils/adminAuth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-travel.fly.dev/api';

const getMediaUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  let resolvedUrl = url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    resolvedUrl = url;
  } else {
    const rootHost = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    const relativePath = url.startsWith('/') ? url : `/${url}`;
    resolvedUrl = `${rootHost}${relativePath}`;
  }
  if (resolvedUrl.startsWith('http://res.cloudinary.com')) {
    resolvedUrl = resolvedUrl.replace('http://', 'https://');
  }
  return resolvedUrl;
};

const HotelManagement: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Room management state
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedHotelForRooms, setSelectedHotelForRooms] = useState<Hotel | null>(null);
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
  const [showRoomFormModal, setShowRoomFormModal] = useState(false);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [roomFormData, setRoomFormData] = useState({
    room_type: '',
    description: '',
    price_per_night: 0,
    original_price: 0,
    available_rooms: 0,
    max_guests: 2,
    room_image_url: '',
    amenities: [] as string[],
    is_active: true,
  });
  const [selectedRoomImage, setSelectedRoomImage] = useState<File | null>(null);
  const [roomImagePreview, setRoomImagePreview] = useState<string | null>(null);
  const roomFileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    stars: 3,
    rating: 0,
    review_count: 0,
    distance_from_center: 0,
    is_active: true,
    image_url: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch hotels on mount
  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels
  useEffect(() => {
    let filtered = hotels;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((hotel) => 
        statusFilter === 'active' ? hotel.is_active : !hotel.is_active
      );
    }

    setFilteredHotels(filtered);
  }, [searchQuery, statusFilter, hotels]);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/hotels/`, {
        credentials: 'include',
        headers: getAdminAuthHeaders(),
      });
      const data = await response.json();
      
      if (data.success) {
        setHotels(data.hotels);
        setFilteredHotels(data.hotels);
      } else {
        setError(data.message || 'Failed to fetch hotels');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'image_url') {
        setImagePreview(value || null);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedRoomImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRoomImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      address: '',
      stars: 3,
      rating: 0,
      review_count: 0,
      distance_from_center: 0,
      is_active: true,
      image_url: '',
    });
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openCreateModal = () => {
    resetForm();
    setSelectedHotel(null);
    setIsEditing(false);
    setShowHotelModal(true);
    setError(null);
  };

  const openEditModal = (hotel: Hotel) => {
    setFormData({
      name: hotel.name,
      location: hotel.location,
      address: hotel.address,
      stars: hotel.stars,
      rating: hotel.rating,
      review_count: hotel.review_count,
      distance_from_center: hotel.distance_from_center,
      is_active: hotel.is_active,
      image_url: hotel.image_url || '',
    });
    setImagePreview(hotel.image_url);
    setSelectedImage(null);
    setSelectedHotel(hotel);
    setIsEditing(true);
    setShowHotelModal(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Hotel name is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('stars', formData.stars.toString());
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('review_count', formData.review_count.toString());
      formDataToSend.append('distance_from_center', formData.distance_from_center.toString());
      formDataToSend.append('image_url', formData.image_url);
      
      if (isEditing) {
        formDataToSend.append('is_active', formData.is_active.toString());
      }
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const url = isEditing 
        ? `${API_BASE_URL}/admin/hotels/${selectedHotel?.id}/update/`
        : `${API_BASE_URL}/admin/hotels/create/`;

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: getAdminAuthHeaders(true),
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(isEditing ? 'Hotel updated successfully!' : 'Hotel created successfully!');
        setShowHotelModal(false);
        fetchHotels();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (hotelId: number) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) {
      return;
    }

    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}/delete/`, {
        method: 'POST',
        credentials: 'include',
        headers: getAdminAuthHeaders(),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Hotel deleted successfully!');
        fetchHotels();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || 'Failed to delete hotel');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  // Room management functions
  const handleManageRooms = async (hotel: Hotel) => {
    setSelectedHotelForRooms(hotel);
    setShowRoomModal(true);
    await fetchHotelRooms(hotel.id);
  };

  const fetchHotelRooms = async (hotelId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}/rooms/`, {
        credentials: 'include',
        headers: getAdminAuthHeaders(),
      });

      const data = await response.json();
      
      if (data.success) {
        setHotelRooms(data.rooms);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/rooms/${roomId}/delete/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getAdminAuthHeaders(),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage('Room deleted successfully!');
        if (selectedHotelForRooms) {
          fetchHotelRooms(selectedHotelForRooms.id);
        }
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || 'Failed to delete room');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  // Room form handlers
  const handleRoomFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all room form data
      Object.entries(roomFormData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value !== undefined && value !== null ? value.toString() : '');
        }
      });
      
      // Add image file if selected
      if (selectedRoomImage) {
        formDataToSend.append('image', selectedRoomImage);
      }
      
      let response;
      if (isEditingRoom && currentRoom) {
        // Update existing room
        response = await fetch(`${API_BASE_URL}/admin/rooms/${currentRoom.id}/update/`, {
          method: 'PUT',
          credentials: 'include',
          headers: getAdminAuthHeaders(true),
          body: formDataToSend,
        });
      } else {
        // Create new room
        response = await fetch(`${API_BASE_URL}/admin/hotels/${selectedHotelForRooms?.id}/rooms/create/`, {
          method: 'POST',
          credentials: 'include',
          headers: getAdminAuthHeaders(true),
          body: formDataToSend,
        });
      }

      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(isEditingRoom ? 'Room updated successfully!' : 'Room created successfully!');
        setShowRoomFormModal(false);
        if (selectedHotelForRooms) {
          fetchHotelRooms(selectedHotelForRooms.id);
        }
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || `Failed to ${isEditingRoom ? 'update' : 'create'} room`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleRoomInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoomFormData(prev => ({
      ...prev,
      [name]: name === 'price_per_night' || name === 'original_price' || name === 'available_rooms' || name === 'max_guests' 
        ? Number(value) 
        : value
    }));
    if (name === 'room_image_url') {
      setRoomImagePreview(value || null);
    }
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amenities = value.split(',').map(item => item.trim()).filter(item => item);
    setRoomFormData(prev => ({
      ...prev,
      amenities
    }));
  };

  const openRoomFormModal = (room: Room | null = null) => {
    if (room) {
      // Edit existing room
      setIsEditingRoom(true);
      setCurrentRoom(room);
      setRoomFormData({
        room_type: room.room_type,
        description: room.description,
        price_per_night: room.price_per_night,
        original_price: room.original_price || 0,
        available_rooms: room.available_rooms,
        max_guests: room.max_guests,
        room_image_url: room.room_image_url,
        amenities: room.amenities,
        is_active: room.is_active,
      });
      // Set image preview if room has an image
      if (room.room_image_url) {
        setRoomImagePreview(room.room_image_url);
      } else {
        setRoomImagePreview(null);
      }
      setSelectedRoomImage(null);
    } else {
      // Create new room
      setIsEditingRoom(false);
      setCurrentRoom(null);
      setRoomFormData({
        room_type: '',
        description: '',
        price_per_night: 0,
        original_price: 0,
        available_rooms: 0,
        max_guests: 2,
        room_image_url: '',
        amenities: [],
        is_active: true,
      });
      setRoomImagePreview(null);
      setSelectedRoomImage(null);
    }
    setShowRoomFormModal(true);
  };

  const handleToggleStatus = async (hotel: Hotel) => {
    setError(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('is_active', (!hotel.is_active).toString());

      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotel.id}/update/`, {
        method: 'POST',
        credentials: 'include',
        headers: getAdminAuthHeaders(),
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Hotel ${hotel.is_active ? 'deactivated' : 'activated'} successfully!`);
        fetchHotels();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || 'Failed to update hotel status');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const columns = [
    {
      key: 'name',
      header: 'Hotel',
      render: (hotel: Hotel) => (
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden">
            {hotel.image_url ? (
              <img
                src={getMediaUrl(hotel.image_url)}
                alt={hotel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">{hotel.name}</p>
            <p className="text-sm text-gray-500">{hotel.location}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'stars',
      header: 'Stars',
      render: (hotel: Hotel) => renderStars(hotel.stars),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (hotel: Hotel) => (
        <div className="flex items-center">
          <span className="font-semibold text-gray-800">{hotel.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm ml-1">({hotel.review_count} reviews)</span>
        </div>
      ),
    },
    {
      key: 'distance',
      header: 'Distance',
      render: (hotel: Hotel) => (
        <span className="text-gray-800">{hotel.distance_from_center.toFixed(1)} km</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (hotel: Hotel) => (
        <StatusBadge
          status={hotel.is_active ? 'active' : 'inactive'}
          variant={hotel.is_active ? 'success' : 'default'}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (hotel: Hotel) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(hotel);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(hotel);
            }}
            className={`text-sm font-medium ${
              hotel.is_active
                ? 'text-yellow-600 hover:text-yellow-700'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            {hotel.is_active ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(hotel.id);
            }}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleManageRooms(hotel);
            }}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Manage Rooms
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="text-green-600 hover:text-green-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <AdminPageHeader
          title="Hotel management"
          description="Manage hotels and rooms in the system."
          action={
            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              Add hotel
            </button>
          }
        />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Hotels</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{hotels.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Active Hotels</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {hotels.filter((h) => h.is_active).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Inactive Hotels</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {hotels.filter((h) => !h.is_active).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Avg Rating</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {hotels.length > 0 
                ? (hotels.reduce((sum, h) => sum + h.rating, 0) / hotels.length).toFixed(1)
                : '0.0'}
            </p>
          </div>
        </div>

        {/* Hotels Table */}
        <DataTable
          data={filteredHotels}
          columns={columns}
          loading={loading}
          emptyMessage="No hotels found"
        />

        {/* Hotel Modal */}
        {showHotelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? 'Edit Hotel' : 'Add New Hotel'}
                </h2>
                <button
                  onClick={() => setShowHotelModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                {/* Error in modal */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                 {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                      {imagePreview ? (
                        <img
                          src={getMediaUrl(imagePreview)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1 font-semibold">Upload Local Image File</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1 font-semibold">Or Enter Image URL</label>
                        <input
                          type="text"
                          name="image_url"
                          value={formData.image_url}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="e.g., https://images.unsplash.com/..."
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: JPG, PNG, WebP
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter hotel name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Paris, France"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stars
                    </label>
                    <select
                      name="stars"
                      value={formData.stars}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                          {star} Star{star > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter rating"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review Count
                    </label>
                    <input
                      type="number"
                      name="review_count"
                      value={formData.review_count}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Number of reviews"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance from Center (km)
                    </label>
                    <input
                      type="number"
                      name="distance_from_center"
                      value={formData.distance_from_center}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Distance in km"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700">Active (visible to users)</label>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowHotelModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{isEditing ? 'Update Hotel' : 'Create Hotel'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Room Management Modal */}
        {showRoomModal && selectedHotelForRooms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <div>
                  <h2 className="text-2xl font-bold">Manage Rooms</h2>
                  <p className="text-purple-100">{selectedHotelForRooms.name}</p>
                </div>
                <button
                  onClick={() => setShowRoomModal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Rooms for {selectedHotelForRooms.name}</h3>
                  <button
                    onClick={() => openRoomFormModal(null)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Add Room</span>
                  </button>
                </div>
                
                {hotelRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms added yet</h3>
                    <p className="text-gray-600">Click "Add Room" to create your first room.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hotelRooms.map((room) => (
                      <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-900">{room.room_type}</h4>
                              <StatusBadge
                                status={room.is_active ? 'active' : 'inactive'}
                                variant={room.is_active ? 'success' : 'default'}
                              />
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{room.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {room.amenities.slice(0, 4).map((amenity, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {room.amenities.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                  +{room.amenities.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end ml-4">
                            <div className="text-right mb-3">
                              {room.original_price && room.discount_percentage > 0 && (
                                <div className="text-gray-400 line-through text-sm">
                                  PKR {room.original_price.toLocaleString()}
                                </div>
                              )}
                              <div className="text-2xl font-bold text-purple-600">
                                PKR {room.price_per_night.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">per night</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {room.available_rooms} available
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openRoomFormModal(room)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteRoom(room.id)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Room Form Modal */}
        {showRoomFormModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditingRoom ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button
                  onClick={() => setShowRoomFormModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleRoomFormSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type *
                    </label>
                    <input
                      type="text"
                      name="room_type"
                      value={roomFormData.room_type}
                      onChange={handleRoomInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Deluxe Room, Executive Suite"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Guests
                    </label>
                    <select
                      name="max_guests"
                      value={roomFormData.max_guests}
                      onChange={handleRoomInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={roomFormData.description}
                    onChange={handleRoomInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter room description"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Night (PKR) *
                    </label>
                    <input
                      type="number"
                      name="price_per_night"
                      value={roomFormData.price_per_night}
                      onChange={handleRoomInputChange}
                      min="0"
                      step="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter price in PKR"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price (PKR)
                    </label>
                    <input
                      type="number"
                      name="original_price"
                      value={roomFormData.original_price}
                      onChange={handleRoomInputChange}
                      min="0"
                      step="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="For discount display"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Rooms *
                    </label>
                    <input
                      type="number"
                      name="available_rooms"
                      value={roomFormData.available_rooms}
                      onChange={handleRoomInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Number of available rooms"
                      required
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        {roomImagePreview ? (
                          <img
                            src={getMediaUrl(roomImagePreview)}
                            alt="Room Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 w-full space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1 font-semibold">Upload Local Image File</label>
                          <input
                            ref={roomFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleRoomImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1 font-semibold">Or Enter Image URL</label>
                          <input
                            type="text"
                            name="room_image_url"
                            value={roomFormData.room_image_url}
                            onChange={handleRoomInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="e.g., https://images.unsplash.com/..."
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Supported formats: JPG, PNG, WebP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amenities (comma separated)
                  </label>
                  <input
                    type="text"
                    value={roomFormData.amenities.join(', ')}
                    onChange={handleAmenitiesChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Free WiFi, Air Conditioning, TV, Mini Bar"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={roomFormData.is_active}
                    onChange={(e) => setRoomFormData(prev => ({
                      ...prev,
                      is_active: e.target.checked
                    }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="text-sm text-gray-700">Active (visible to users)</label>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowRoomFormModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <span>{isEditingRoom ? 'Update Room' : 'Create Room'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default HotelManagement;

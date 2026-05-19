import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface Package {
  id: number;
  title: string;
  destination: string;
  description: string;
  hotel_name: string;
  hotel_location: string;
  hotel_stars: number;
  hotel_rating: string;
  hotel_review_count: number;
  hotel_image_url: string;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  flight_duration: string;
  flight_stops: number;
  departure_time: string;
  arrival_time: string;
  price_per_person: string;
  original_price: string;
  price_per_package: string;
  nights: number;
  package_type: string;
  highlights: string[];
  includes: string[];
  availability: number;
  bookings: number;
  is_featured: boolean;
  is_popular: boolean;
  status: string;
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

const PackageManagement: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Partial<Package>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, WebP)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }
      
      // Set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Clear image
  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Remove image from formData if it exists
    setFormData(prev => {
      const newFormData = {...prev};
      return newFormData;
    });
  };

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/admin/packages/`, {
          headers: getAdminAuthHeaders(),
        });
        
        if (response.status === 401 || response.status === 403) {
          setError('Unauthorized. Please log in as an admin.');
          return;
        }
        
        const data = await response.json();
        if (data.success) {
          // Transform API data to match expected format
          const transformedPackages = data.packages?.map((pkg: any) => ({
            ...pkg,
            price_per_person: pkg.price || pkg.price_per_person,
          })) || [];
          setPackages(transformedPackages);
        } else {
          setError(data.message || 'Failed to fetch packages');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array input changes (highlights, includes)
  const handleArrayInputChange = (fieldName: keyof Package, value: string) => {
    try {
      // Try to parse as JSON array first
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: parsed
        }));
      }
    } catch {
      // If not valid JSON, treat as comma-separated string
      const arr = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        [fieldName]: arr
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const url = editingPackage 
        ? `${API_BASE_URL}/admin/packages/${editingPackage.id}/update/`
        : `${API_BASE_URL}/admin/packages/create/`;
      
      // Create FormData for multipart request (to support file upload)
      const formDataToSend = new FormData();
      
      // Ensure defaults exist for required/numeric fields
      const dataToSend = {
        ...formData,
        nights: formData.nights !== undefined && formData.nights !== '' ? formData.nights : 3,
        package_type: formData.package_type || 'city',
        status: formData.status || 'active',
        hotel_stars: formData.hotel_stars !== undefined && formData.hotel_stars !== '' ? formData.hotel_stars : 3,
        hotel_rating: formData.hotel_rating !== undefined && formData.hotel_rating !== '' ? formData.hotel_rating : '0.00',
        hotel_review_count: formData.hotel_review_count !== undefined && formData.hotel_review_count !== '' ? formData.hotel_review_count : 0,
        flight_stops: formData.flight_stops !== undefined && formData.flight_stops !== '' ? formData.flight_stops : 0,
        availability: formData.availability !== undefined && formData.availability !== '' ? formData.availability : 0,
        bookings: formData.bookings !== undefined && formData.bookings !== '' ? formData.bookings : 0,
        is_featured: formData.is_featured || false,
        is_popular: formData.is_popular || false,
      };
      
      // Add all form fields to FormData
      Object.entries(dataToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });
      
      // Add image if selected
      if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        formDataToSend.append('hotel_image', fileInputRef.current.files[0]);
      }
      
      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',  // Include cookies for session authentication
        headers: getAdminAuthHeaders(true),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh packages list
        const refreshResponse = await fetch(`${API_BASE_URL}/admin/packages/`, {
          headers: getAdminAuthHeaders(),
        });
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          const transformedPackages = refreshData.packages?.map((pkg: any) => ({
            ...pkg,
            price_per_person: pkg.price || pkg.price_per_person,
          })) || [];
          setPackages(transformedPackages);
        }
        
        setShowModal(false);
        setEditingPackage(null);
        setFormData({});
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(result.message || 'Failed to save package');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error saving package:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle package deletion
  const handleDelete = async (packageId: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/admin/packages/${packageId}/delete/`, {
        method: 'DELETE',
        headers: getAdminAuthHeaders(),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh packages list
        const refreshResponse = await fetch(`${API_BASE_URL}/admin/packages/`, {
          headers: getAdminAuthHeaders(),
        });
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          const transformedPackages = refreshData.packages?.map((pkg: any) => ({
            ...pkg,
            price_per_person: pkg.price || pkg.price_per_person,
          })) || [];
          setPackages(transformedPackages);
        }
      } else {
        setError(result.message || 'Failed to delete package');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error deleting package:', err);
    }
  };

  // Open edit modal
  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      destination: pkg.destination,
      description: pkg.description,
      hotel_name: pkg.hotel_name,
      hotel_location: pkg.hotel_location,
      hotel_stars: pkg.hotel_stars,
      hotel_rating: pkg.hotel_rating,
      hotel_review_count: pkg.hotel_review_count,
      hotel_image_url: pkg.hotel_image_url,
      airline: pkg.airline,
      departure_airport: pkg.departure_airport,
      arrival_airport: pkg.arrival_airport,
      flight_duration: pkg.flight_duration,
      flight_stops: pkg.flight_stops,
      departure_time: pkg.departure_time,
      arrival_time: pkg.arrival_time,
      price_per_person: pkg.price_per_person,
      original_price: pkg.original_price,
      price_per_package: pkg.price_per_package,
      nights: pkg.nights,
      package_type: pkg.package_type,
      highlights: pkg.highlights,
      includes: pkg.includes,
      availability: pkg.availability,
      bookings: pkg.bookings,
      is_featured: pkg.is_featured,
      is_popular: pkg.is_popular,
      status: pkg.status,
    });
    setImagePreview(pkg.hotel_image_url || null);
    setShowModal(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false);
    setEditingPackage(null);
    setFormData({});
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Columns for the data table
  const columns = [
    { header: 'ID', key: 'id', render: (pkg: any) => pkg.id },
    { 
      header: 'Image', 
      key: 'hotel_image_url',
      render: (pkg: any) => (
        <img 
          src={getMediaUrl(pkg.hotel?.image || pkg.hotel_image_url) || 'https://placehold.co/60x40?text=N/A'} 
          alt={pkg.title} 
          className="w-12 h-8 object-cover rounded"
        />
      )
    },
    { header: 'Title', key: 'title', render: (pkg: any) => pkg.title },
    { header: 'Destination', key: 'destination', render: (pkg: any) => pkg.destination },
    { 
      header: 'Hotel', 
      key: 'hotel_name',
      render: (pkg: any) => pkg.hotel?.name || pkg.hotel_name || '-'
    },
    { 
      header: 'Price (PKR)', 
      key: 'price_per_person',
      render: (pkg: any) => {
        const price = pkg.price_per_person || pkg.price;
        return price ? `PKR ${price.toLocaleString()}` : '-';
      }
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (pkg: Package) => <StatusBadge status={pkg.status} />
    },
    { 
      header: 'Actions', 
      key: 'actions',
      render: (pkg: Package) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openEditModal(pkg)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(pkg.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      )
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Package Management</h1>
          <button
            onClick={() => {
              setEditingPackage(null);
              setFormData({
                nights: 3,
                package_type: 'city',
                status: 'active',
                hotel_stars: 3,
                hotel_rating: '0.00',
                hotel_review_count: 0,
                flight_stops: 0,
                availability: 0,
                bookings: 0,
                is_featured: false,
                is_popular: false,
                highlights: [],
                includes: [],
              });
              setImagePreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Package
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <DataTable
          columns={columns}
          data={packages}
          loading={loading}
          emptyMessage="No packages found. Create your first package!"
        />

        {/* Modal for adding/editing packages */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div 
              ref={modalRef}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingPackage ? 'Edit Package' : 'Create Package'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hotel Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
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
                      <div className="flex-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Upload an image of the hotel. Supported formats: JPG, PNG, WebP. Max size: 5MB
                        </p>
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={clearImage}
                            className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                      <input
                        type="text"
                        name="hotel_name"
                        value={formData.hotel_name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Location *</label>
                      <input
                        type="text"
                        name="hotel_location"
                        value={formData.hotel_location || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Stars</label>
                      <select
                        name="hotel_stars"
                        value={formData.hotel_stars || 3}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(star => (
                          <option key={star} value={star}>{star} Star</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Airline *</label>
                      <input
                        type="text"
                        name="airline"
                        value={formData.airline || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Airport *</label>
                      <input
                        type="text"
                        name="departure_airport"
                        value={formData.departure_airport || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Airport *</label>
                      <input
                        type="text"
                        name="arrival_airport"
                        value={formData.arrival_airport || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price per Person (PKR) *</label>
                      <input
                        type="number"
                        name="price_per_person"
                        value={formData.price_per_person || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (PKR)</label>
                      <input
                        type="number"
                        name="original_price"
                        value={formData.original_price || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
                      <input
                        type="number"
                        name="nights"
                        value={formData.nights || 3}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                      <select
                        name="package_type"
                        value={formData.package_type || 'city'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="city">City Break</option>
                        <option value="beach">Beach</option>
                        <option value="adventure">Adventure</option>
                        <option value="luxury">Luxury</option>
                        <option value="romantic">Romantic</option>
                        <option value="family">Family</option>
                        <option value="cultural">Cultural</option>
                        <option value="wellness">Wellness</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status || 'active'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured || false}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">Featured Package</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_popular"
                        checked={formData.is_popular || false}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">Popular Package</label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated or JSON array)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.highlights) ? JSON.stringify(formData.highlights) : (formData.highlights || '')}
                      onChange={(e) => handleArrayInputChange('highlights', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder='["Free Cancellation", "Breakfast Included"] or Free Cancellation,Breakfast Included'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Includes (comma-separated or JSON array)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.includes) ? JSON.stringify(formData.includes) : (formData.includes || '')}
                      onChange={(e) => handleArrayInputChange('includes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder='["Round-trip flights", "5 nights hotel"] or Round-trip flights,5 nights hotel'
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : (editingPackage ? 'Update Package' : 'Create Package')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PackageManagement;
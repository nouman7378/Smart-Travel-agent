import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface Car {
  id: number;
  model: string;
  company: string;
  type: string;
  price_per_day: number;
  rating?: number;
  review_count?: number;
  is_available: boolean;
  car_image_url?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getAdminAuthHeader = (): string => {
  const adminCreds = localStorage.getItem('admin_credentials');
  if (adminCreds) return `Basic ${btoa(adminCreds)}`;
  return '';
};

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    model: '',
    company: '',
    type: 'compact',
    price_per_day: '',
    original_price: '',
    transmission: 'automatic',
    seats: '5',
    luggage_capacity: '2',
    fuel_type: 'gasoline',
    mileage: 'Unlimited',
    rating: '',
    review_count: '0',
    features: '',
    car_image_url: '',
    is_available: true,
  });

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const headers: Record<string, string> = {};
      const authHeader = getAdminAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;

      const res = await fetch(`${API_BASE_URL}/admin/cars/`, { credentials: 'include', headers });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setCars(data.cars || data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openCreateModal = () => {
    setEditingCar(null);
    setFormData({
      model: '', company: '', type: 'compact', price_per_day: '', original_price: '', transmission: 'automatic', seats: '5', luggage_capacity: '2', fuel_type: 'gasoline', mileage: 'Unlimited', rating: '', review_count: '0', features: '', car_image_url: '', is_available: true,
    });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowModal(true);
  };

  const openEditModal = (car: Car) => {
    setEditingCar(car);
    setFormData({
      model: car.model,
      company: car.company,
      type: car.type,
      price_per_day: String(car.price_per_day),
      original_price: '',
      transmission: 'automatic',
      seats: String((car as any).seats || 5),
      luggage_capacity: String((car as any).luggage_capacity || 2),
      fuel_type: (car as any).fuel_type || 'gasoline',
      mileage: (car as any).mileage || 'Unlimited',
      rating: car.rating ? String(car.rating) : '',
      review_count: car.review_count ? String(car.review_count) : '0',
      features: (car as any).features ? (car as any).features.join(', ') : '',
      car_image_url: car.car_image_url || '',
      is_available: car.is_available,
    });
    setImagePreview(car.car_image_url || null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ model: '', company: '', type: 'compact', price_per_day: '', original_price: '', transmission: 'automatic', seats: '5', luggage_capacity: '2', fuel_type: 'gasoline', mileage: 'Unlimited', rating: '', review_count: '0', features: '', car_image_url: '', is_available: true });
    setImagePreview(null);
    setEditingCar(null);
    setShowModal(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const url = editingCar ? `${API_BASE_URL}/admin/cars/${editingCar.id}/update/` : `${API_BASE_URL}/admin/cars/create/`;
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });
      if (fileInputRef.current?.files?.[0]) fd.append('image', fileInputRef.current.files[0]);

      const fetchOptions: any = { 
        method: 'POST', 
        credentials: 'include', 
        body: fd 
      };
      
      const authHeader = getAdminAuthHeader();
      if (authHeader) {
        fetchOptions.headers = { 'Authorization': authHeader };
      }

      const res = await fetch(url, fetchOptions);
      const result = await res.json();
      if (result.success) {
        resetForm();
        fetchCars();
      } else {
        setError(result.message || 'Failed to save car');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (carId: number) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      const headers: Record<string, string> = {};
      const authHeader = getAdminAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
      const res = await fetch(`${API_BASE_URL}/admin/cars/${carId}/delete/`, { method: 'DELETE', credentials: 'include', headers });
      const result = await res.json();
      if (result.success) fetchCars(); else setError(result.message || 'Failed to delete car');
    } catch (err) {
      setError('Network error.');
    }
  };

  const columns = [
    { header: 'Car', key: 'model', render: (car: Car) => (
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded mr-3 overflow-hidden">
          {car.car_image_url ? <img src={car.car_image_url} alt={car.model} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100">—</div>}
        </div>
        <div>
          <p className="font-medium text-gray-800">{car.model}</p>
          <p className="text-sm text-gray-500">{car.company}</p>
        </div>
      </div>
    )},
    { header: 'Type', key: 'type', render: (c: Car) => c.type },
    { header: 'Price/Day (PKR)', key: 'price_per_day', render: (c: Car) => `PKR ${c.price_per_day.toLocaleString()}` },
    { header: 'Rating', key: 'rating', render: (c: Car) => (c.rating ? `${c.rating} (${c.review_count})` : '-') },
    { header: 'Status', key: 'is_available', render: (c: Car) => <StatusBadge status={c.is_available ? 'active' : 'inactive'} variant={c.is_available ? 'success' : 'default'} /> },
    { header: 'Actions', key: 'actions', render: (c: Car) => (
      <div className="flex space-x-2">
        <button onClick={() => openEditModal(c)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Edit</button>
        <button onClick={() => handleDelete(c.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">Delete</button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Car Management</h1>
          <button onClick={openCreateModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Add Car</button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">{error}</div>}

        <DataTable columns={columns} data={cars} loading={loading} emptyMessage="No cars found. Create your first car!" />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                    <input type="text" name="model" value={formData.model} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Toyota Camry" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Hertz" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="compact">Compact</option>
                      <option value="mid-size">Mid-size</option>
                      <option value="suv">SUV</option>
                      <option value="luxury">Luxury</option>
                      <option value="electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price/Day (PKR) *</label>
                    <input type="number" name="price_per_day" value={formData.price_per_day} onChange={handleInputChange} required min="0" step="100" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., 4500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select name="fuel_type" value={(formData as any).fuel_type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                    <input type="text" name="mileage" value={(formData as any).mileage} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Unlimited" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input type="number" name="rating" value={(formData as any).rating} onChange={handleInputChange} min="0" max="5" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., 4.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
                    <input type="number" name="review_count" value={(formData as any).review_count} onChange={handleInputChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                  <input type="text" name="features" value={(formData as any).features} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., GPS, Bluetooth" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500" />
                  {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 w-40 h-24 object-cover rounded" />}
                </div>

                <div className="flex items-center">
                  <input type="checkbox" name="is_available" checked={(formData as any).is_available} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Available</label>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{isSubmitting ? 'Saving...' : (editingCar ? 'Update Car' : 'Create Car')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CarManagement;

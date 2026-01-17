/**
 * Image Placeholder Utility
 * 
 * Provides placeholder images for missing assets
 * Uses Unsplash for travel-related placeholders
 */

export const getPlaceholderImage = (category: 'hotel' | 'flight' | 'car' | 'destination' | 'package' | 'general' = 'general'): string => {
  const placeholders: Record<string, string> = {
    hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    flight: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    car: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    destination: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    package: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    general: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  };

  return placeholders[category] || placeholders.general;
};

export const getAvatarPlaceholder = (name?: string): string => {
  const initial = name?.charAt(0).toUpperCase() || 'U';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=3b82f6&color=fff&size=128`;
};


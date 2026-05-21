import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../config/env.config';

const DEFAULT_PLACEHOLDER =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

/**
 * Renders catalog images with resolved media URLs and a fallback when the asset 404s.
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = DEFAULT_PLACEHOLDER,
  alt = '',
  ...props
}) => {
  const resolved = getMediaUrl(src) || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolved);

  useEffect(() => {
    setCurrentSrc(getMediaUrl(src) || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default SafeImage;

import React, { useState, useEffect } from 'react';
import MediaLoader from './index';

interface AsyncMediaProps {
  src: string;
  type?: 'image' | 'video';
  alt?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AsyncMedia: React.FC<AsyncMediaProps> = ({
  src,
  type = 'image',
  alt = '',
  autoPlay = false,
  loop = false,
  muted = true,
  className,
  style,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  // For Images
  useEffect(() => {
    if (type === 'image') {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setLoaded(true);
      };
    }
  }, [src, type]);

  // For Videos
  const handleVideoLoad = (el: HTMLVideoElement | null) => {
    if (el) {
      el.onloadedmetadata = () => {
        setDimensions({
          width: el.videoWidth,
          height: el.videoHeight,
        });
        setLoaded(true);
      };
    }
  };

  if (!loaded || !dimensions) {
    return (
      <MediaLoader
        style={{
          width: dimensions?.width ?? '100%',
          height: dimensions?.height ?? 'auto',
          ...style,
        }}
      />
    );
  }

  if (type === 'image') {
    return (
      <img
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={className}
        style={style}
      />
    );
  }

  if (type === 'video') {
    return (
      <video
        ref={handleVideoLoad}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls
        width={dimensions.width}
        height={dimensions.height}
        className={className}
        style={style}
      />
    );
  }

  return null;
};

export default AsyncMedia;
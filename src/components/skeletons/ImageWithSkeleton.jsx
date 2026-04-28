import React, { useEffect, useState } from 'react';
import Skeleton from './Skeleton.jsx';

const ImageWithSkeleton = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  onLoad,
  onError,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setIsLoaded(true);
    onError?.(event);
  };

  return (
    <div className={`skeleton-image-shell ${isLoaded ? 'is-loaded' : ''} ${wrapperClassName}`.trim()}>
      {!isLoaded && <Skeleton className={skeletonClassName} aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  );
};

export default ImageWithSkeleton;

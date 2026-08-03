import { useState } from 'react';

interface LoadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export default function LoadingImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading,
  onLoad,
  onError,
  ...props
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 image-loading-shimmer" aria-hidden="true" />
      )}
      {errored && (
        <div className="absolute inset-0 bg-surface-dark flex items-center justify-center text-xs text-gray-400">
          Image unavailable
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`${className} ${
          loaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setErrored(true);
          onError?.(event);
        }}
        {...props}
      />
    </div>
  );
}

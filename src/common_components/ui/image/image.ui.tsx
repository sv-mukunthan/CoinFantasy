import React from 'react';
import './image.ui.scss';

interface IImage {
  width?: string;
  height?: string;
  borderRadius?: string;
  src?: string;
  backgroundSize?: string;
  style?: any;
  objectFit?: string;
  alt: string;
  className?: string;
  boxShadow?: string;
}

const Image = (props: IImage) => {
  const {
    width,
    height,
    borderRadius,
    src,
    backgroundSize,
    style,
    objectFit,
    alt,
    className,
    boxShadow,
  } = props;
  return (
    <img
      className={`image_component ${className}`}
      src={src}
      alt={alt}
      style={{
        ...{
          width: width || '100%',
          height: height || '100%',
          borderRadius: borderRadius || '0',
          backgroundSize: backgroundSize || 'cover',
          objectFit: objectFit || 'cover',
          boxShadow: boxShadow,
        },
        ...style,
      }}
    />
  );
};

export default Image;

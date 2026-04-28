import React from 'react';
import './skeleton.css';

const Skeleton = ({
  as: Tag = 'div',
  className = '',
  width,
  height,
  rounded,
  style,
  ...rest
}) => {
  const mergedStyle = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(rounded ? { borderRadius: rounded } : {}),
  };

  return <Tag className={`skeleton ${className}`.trim()} style={mergedStyle} {...rest} />;
};

export default Skeleton;

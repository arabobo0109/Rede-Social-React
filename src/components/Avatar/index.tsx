import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden bg-gray-200">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

const MiniAvatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-200">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export {Avatar, MiniAvatar};


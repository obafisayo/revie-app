import React from 'react';

const isImage = (src) => {
  return /\.(jpeg|jpg|gif|png|bmp|webp)$/i.test(src);
};

const isVideo = (src) => {
  return /\.(mp4|webm|ogg|avi|mov|wmv|flv)$/i.test(src);
};

const Media = ({ config }) => {
  return (
    <div>
      {Array.isArray(config) && config.length > 0 ? (
        <>
          {config.map((src, index) => {
            if (isImage(src)) {
              return <img key={index} src={src} alt={`Image-${index}`} className="rounded-md" />;
            } else if (isVideo(src)) {
              return (
                <video key={index} controls className="rounded-md">
                  <source src={src} type={`video/${src.split('.').pop()}`} />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return <p key={index} className="text-red-700">Unsupported media type</p>;
            }
          })}
        </>
      ) : (
        <div className="text-white bg-blue-700">
          <>No available media</>
        </div>
      )}
    </div>
  );
};

export default Media;
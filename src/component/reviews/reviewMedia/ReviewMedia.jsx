import React from 'react';

const ReviewMedia = ({ config, text, img, video }) => {
  return (
    <div>
      {Array.isArray(config) && config.length !== 0 && (
        <>
            <div className="flex flex-wrap">
                <h2 className="w-full text-xl font-bold">{text}</h2>
                {config.map((uploadedMedia, idx) => (
                    <div
                        key={idx}
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
                    >
                        {img && <img
                            className="w-full"
                            src={uploadedMedia}
                            alt="uploaded-media"
                        />}
                        {video && <video className="w-full" controls>
                            <source src={uploadedMedia} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>}
                    </div>
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default ReviewMedia;
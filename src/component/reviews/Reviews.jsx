import React, { useState, useEffect } from 'react';
import { FaStar, FaImage, FaVideo } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const url = 'https://codeguru.isaac0yen.com';
  const [formData, setFormData] = useState({
    landlord: '',
    environment: '',
    amenities: '',
    images: [],
    videos: [],
  });
  const [reviews, setReviews] = useState([]);
  const [parsedImg, setParsedImg] = useState([]);
  const [parsedvid, setParsedvid] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/api/reviews`);
        setReviews(response.data);
        const allImages = response.data.map((review) => JSON.parse(review.images));
        setParsedImg(allImages.flat()); 
        const allVideos = response.data.map((review) => JSON.parse(review.videos));
        setParsedvid(allVideos.flat()); 
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };
    fetchReviews();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleVideoUpload = (e) => {
    setFormData({ ...formData, videos: e.target.files });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    if(token){
        try {
          const response = await axios.post(`${url}/api/reviews`, formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
          });
          console.log('Review created successfully:', response.data);
          setFormData({
            landlord: '',
            environment: '',
            amenities: '',
            images: [],
            videos: [],
          });
        } catch (error) {
          console.error('Error creating review:', error.message);
        }
    } else {
        alert("You are not logged in!!!")
        navigate("/login")
    }
  };
  const Pulsebox = () => {
    return(
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const [s, ss] = useState(false)
  setTimeout(() => {
    ss(true)
  }, 3000)
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Existing Reviews</h2>
          {s? 
            <>
            {reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <FaStar className="text-yellow-500 mr-2" />
                    <h3 className="text-lg font-bold">{review.landlord}</h3>
                  </div>
                  <p className="mb-4">{review.environment}</p>
                  <p className="mb-4">{review.amenities}</p>
                  <div className="flex space-x-4">
                    <div className="w-1/4">
                      <img src={parsedImg[index]} alt={`img-${index}`} className="rounded-md" />
                    </div>
                    <div className="w-3/4">
                      <video src={parsedvid[index]} controls className="rounded-md" />
                    </div>
                  </div>
                </div>
            ))}
            </>
              : 
            <>
              <Pulsebox />
              <p className="truncate w-[8rem] items-center">loading reviews please wait!!!</p>
            </>
          }
        </div>
        <div className="max-w-2xl mx-auto container order-2">
            <h2 className="text-3xl font-bold mb-6">Create a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="landlord" className="block font-medium text-gray-700">
                    <FaStar className="inline-block mr-2" /> Landlord
                    </label>
                    <input
                    type="text"
                    id="landlord"
                    name="landlord"
                    value={formData.landlord}
                    onChange={handleInputChange}
                    className="input-style"
                    />
                </div>
                <div>
                    <label htmlFor="environment" className="block font-medium text-gray-700">
                    <FaStar className="inline-block mr-2" /> Environment
                    </label>
                    <input
                    type="text"
                    id="environment"
                    name="environment"
                    value={formData.environment}
                    onChange={handleInputChange}
                    className="input-style"
                    />
                </div>
                <div>
                    <label htmlFor="amenities" className="block font-medium text-gray-700">
                    <FaStar className="inline-block mr-2" /> Amenities
                    </label>
                    <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    className="input-style"
                    />
                </div>
                <div>
                    <label htmlFor="images" className="block font-medium text-gray-700">
                    <FaImage className="inline-block mr-2" /> Images
                    </label>
                    <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleImageUpload}
                    className="input-style"
                    />
                </div>
                <div>
                    <label htmlFor="videos" className="block font-medium text-gray-700">
                    <FaVideo className="inline-block mr-2" /> Videos
                    </label>
                    <input
                    type="file"
                    id="videos"
                    name="videos"
                    multiple
                    onChange={handleVideoUpload}
                    className="input-style"/>
                </div>
                <button
                    type="submit"
                    className="btn-submit">
                    Submit Review
                </button>
            </form>
        </div>
    </div>
  );
};

export default ReviewForm;
// https://www.youtube.com/watch?v=NcoBAfJ6l2Q&t=461s
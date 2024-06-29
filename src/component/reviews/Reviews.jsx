import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import Media from '../media/Media';
import FormInput from '../formInput/FormInput';
import ReviewMedia from './reviewMedia/ReviewMedia';

const ReviewForm = () => {
  const url = 'https://codeguru.isaac0yen.com';
  const [formData, setFormData] = useState({
    landlord: '',
    environment: '',
    amenities: '',
    images: [],
    videos: [],
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    const uwScript = document.getElementById('uw');
    if (!loaded && !uwScript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
      script.addEventListener('load', () => setLoaded(true));
      document.body.appendChild(script)
    }
  }, [loaded])

  const processResults = (error, result) => {
    if (result.event === 'close') {
      setIsDisabled(false);
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      const previewUrl = secureUrl.replace(
        '/upload/',
        '/upload/w_400/f_auto,q_auto/'
      );

      if (result.info.resource_type === 'image') {
        // It's an image file
        setUploadedImages((prevImages) => [...prevImages, previewUrl]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [...prevFormData.images, secureUrl],
        }));
      } else if (result.info.resource_type === 'video') {
        // It's a video file
        setUploadedVideos((prevVideos) => [...prevVideos, secureUrl]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          videos: [...prevFormData.videos, secureUrl],
        }));
      }

      setIsDisabled(false);
    }
    if (error) {
      setIsDisabled(false);
    }
  };
  

  // to use your own cloud preset, comment the training cloudname and add your .env file
  // at the rood directory with the following:

  // REACT_APP_CLOUD_NAME='your-cloud-name'
  // REACT_APP_UPLOAD_PRESET='your-unsigned-cloud-preset'

  // then uncomment the line below

  // const cloudName = process.env.REACT_APP_CLOUD_NAME
  // const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  // then remove the 2 lines below
  const cloudName = 'cloudinary-training'
  const uploadPreset = 'vpy7udvq'

  const uploadWidget = () => {
    setIsDisabled(true);
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url'],
        tags: ['myphotoalbum-react'],
        clientAllowedFormats: ['image', 'video'],
        resourceType: 'auto',
      },
      processResults
    );
  };

  const [reviews, setReviews] = useState([]);
  const [s, ss] = useState(false);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/api/reviews`);
        setReviews(response.data);
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
          window.location.reload();
        } catch (error) {
          console.error('Error creating review:', error.message);
          alert("You are not logged in!!!")
          navigate("/login")
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
                    <Media config={JSON.parse(review.images)}/>
                  </div>
                  <div className="w-3/4">
                    <Media config={JSON.parse(review.videos)}/>
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
          <FormInput title="Landlord" text="landlord" value={formData.landlord} handler={handleInputChange} />
          <FormInput title="Environment" text="environment" value={formData.environment} handler={handleInputChange} />
          <FormInput title="Amenities" text="amenities" value={formData.amenities} handler={handleInputChange} />
          <div>
            <Button text={"Upload Images/Videos"} textColor={"text-white"}
              bgColor="bg-blue-500" isDisabled={isDisabled}
              handler={uploadWidget}
            />
            <ReviewMedia text={"Uploaded Images"} config={uploadedImages} img={true} />
            <ReviewMedia text={"Uploaded Videos"} config={uploadedVideos} video={true} />
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

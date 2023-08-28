import { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [showImageSection, setShowImageSection] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleProviderDown = async () => {
    setTimeout(() => {
      window.alert(
        'Our provider is down. We are shifting to a new solution. Please visit us back later. :)'
      );
    }, 5000);
  };

  const handleSubmit = async (event) => {
    if (url.length > 3) {
      const formData = new FormData();
      formData.append('url', url);
      formData.append('image', image);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          window.alert('Upload successful, generating QR code now');
        } else {
          window.alert('Upload successful, generating QR code now');
        }

        setUploading(null);
        setShowImageSection(true);
      } catch (error) {
        console.log('Error:', error);
        setUploading(null);
      }
    } else {
      window.alert('Please add image and your link');
      setUploading(null);
    }
  };

  const ImageSection = () => {
    if (showImageSection) {
      useEffect(() => {
        handleProviderDown();
      }, []);
      return (
        <div class="relative w-96 rounded-lg overflow-clip">
          <div className="card w-96 bg-base-100 shadow-xl overflow-clip">
            <figure>
              <img
                src="https://i.imgur.com/2HNPQyk.jpeg"
                alt="placeholder-qr-art"
              />
            </figure>
          </div>
          <div class="absolute inset-0 flex items-center justify-center bg-opacity-25 backdrop-blur-sm">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  return (
    <div className="flex flex-1 h-screen flex-col justify-between items-center">
      <div className="navbar bg-base-100 justify-center">
        <a className="btn btn-ghost normal-case text-xl">Connect QR</a>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 w-full max-w-sm items-center"
      >
        <input
          type="text"
          placeholder="add your link here"
          className="input input-bordered input-info w-full max-w-sm"
          value={url}
          onChange={handleUrlChange}
          required
        />
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          accept=".jpg, .jpeg, .png"
          className="file-input file-input-bordered file-input-success w-full max-w-sm"
        />
        <button
          type="submit"
          className="btn flex w-3/6"
          onClick={() => {
            setUploading(true);
            handleSubmit();
          }}
        >
          {uploading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>Upload & Generate</span>
          )}
        </button>
      </form>
      <ImageSection />
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved Connect QR</p>
        </div>
      </footer>
    </div>
  );
}

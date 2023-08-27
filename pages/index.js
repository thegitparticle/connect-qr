import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const formData = new FormData();
    formData.append('url', name);
    formData.append('image', image);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.alert('Upload successful');
      } else {
        window.alert('Upload failed');
      }

      setUploading(null);
    } catch (error) {
      console.log('Error:', error);
      setUploading(null);
    }
  };

  return (
    <div className="flex flex-1 h-screen flex-col justify-between items-center">
      <div className="navbar bg-base-100 justify-center">
        <a className="btn btn-ghost normal-case text-xl">Connect QR</a>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="your link here"
          className="input input-bordered input-info w-full max-w-xs"
          value={url}
          onChange={handleUrlChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          className="btn"
          onClick={() => {
            handleSubmit();
            setUploading(true);
          }}
        >
          {uploading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            Upload & Generate
          )}
        </button>
      </form>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved Connect QR</p>
        </div>
      </footer>
    </div>
  );
}

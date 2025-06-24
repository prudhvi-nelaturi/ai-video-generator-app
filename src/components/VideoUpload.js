import { useState } from "react";

export default function VideoUpload({ onVideoSelect }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file)); // Preview the video
      onVideoSelect(file); // Pass the file to parent component
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="border p-2 rounded w-80"
      />
      {selectedVideo && (
        <div className="mt-4">
          <video
            src={selectedVideo}
            controls
            className="w-full max-w-7xl h-auto rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

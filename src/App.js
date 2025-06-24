import { useState } from "react";
import PromptForm from "./components/PromptForm";
import ActionButtons from "./components/ActionButtons";
import LoadingSpinner from "./components/LoadingSpinner";
import VideoUpload from "./components/VideoUpload"; // Import VideoUpload component
import ProgressBar from "./components/ProgressBar"; // Import ProgressBar component

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null); // Store uploaded video file
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state for upload
  const [uploading, setUploading] = useState(false); // To track if upload is in progress
  const [uploadSuccess, setUploadSuccess] = useState(false); // To track upload success
  const [uploadMessage, setUploadMessage] = useState(""); // Success message

  const generateVideo = async (prompt) => {
    console.log("Prompt submitted:", prompt);
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4"); // Mock video
      setIsGenerating(false);
    }, 2000);
  };

  const handleRetry = () => {
    setVideoUrl("");
    setUploadedVideo(null);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadMessage("");
  };

  const handleVideoSelect = (file) => {
    setUploadedVideo(file); // Store the selected video file
  };

  const handleUpload = (platform) => {
    if (!uploadedVideo) {
      alert("Please upload a video first!");
      return;
    }
    alert(`Uploading to ${platform}...`);

    setUploading(true);
    setUploadSuccess(false);
    setUploadMessage("");
    let progress = 0;

    // Simulating upload progress
    const uploadInterval = setInterval(() => {
      progress += 10; // Increment progress
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadSuccess(true);
        setUploadMessage(`Video successfully uploaded to ${platform}!`);
        setUploading(false);
      }
    }, 500); // Simulate every 500ms
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        AI Video Generator
      </h1>
      {!videoUrl && !isGenerating && !uploadedVideo && (
        <PromptForm onSubmit={generateVideo} />
      )}
      {isGenerating && <LoadingSpinner />}

      {/* Video Upload Feature */}
      {!videoUrl && !isGenerating && !uploadedVideo && (
        <VideoUpload onVideoSelect={handleVideoSelect} />
      )}

      {videoUrl && (
        <>
          <div className="mt-6 w-full flex justify-center">
            <video
              src={videoUrl}
              controls
              className="w-full max-w-screen-xl h-auto rounded shadow-lg"
            />
          </div>
          <ActionButtons onRetry={handleRetry} videoUrl={videoUrl} />
        </>
      )}

      {uploadedVideo && (
        <>
          <div className="mt-6 w-full flex justify-center">
            <video
              src={URL.createObjectURL(uploadedVideo)}
              controls
              className="w-full max-w-screen-xl h-auto rounded shadow-lg"
            />
          </div>
          <ActionButtons
            onRetry={handleRetry}
            videoUrl={URL.createObjectURL(uploadedVideo)}
            onUpload={handleUpload}
          />
        </>
      )}

      {/* Progress Bar and Confirmation */}
      {uploading && <ProgressBar progress={uploadProgress} />}
      {uploadMessage && <p className="mt-4 text-green-600 font-bold">{uploadMessage}</p>}
    </div>
  );
}

export default App;

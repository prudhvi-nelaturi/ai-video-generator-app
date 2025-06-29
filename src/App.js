import { useState } from "react";
import axios from "axios";
import PromptForm from "./components/PromptForm";
import ActionButtons from "./components/ActionButtons";
import LoadingSpinner from "./components/LoadingSpinner";
import VideoUpload from "./components/VideoUpload";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

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
    setUploadedVideo(file);
  };

  const handleUpload = async (platform) => {
    if (!uploadedVideo) {
      alert("Please upload a video first!");
      return;
    }

    if (platform === "YouTube") {
      try {
        setUploading(true);
        setUploadProgress(0);
        setUploadMessage("");

        const formData = new FormData();
        formData.append("file", uploadedVideo);
        formData.append("title", "AI Generated Video");
        formData.append("description", "Uploaded via AI Video Uploader");
        formData.append("privacyStatus", "private");

        const response = await axios.post("http://localhost:8080/youtube/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        setUploading(false);
        setUploadSuccess(true);
        setUploadMessage(`Video successfully uploaded to YouTube! Watch here: ${response.data}`);

      } catch (error) {
        setUploading(false);
        console.error("Upload error:", error);
        setUploadMessage("Failed to upload video to YouTube.");
      }
    } else {
      // Simulated upload for other platforms
      alert(`Uploading to ${platform}... (Simulated)`);

      setUploading(true);
      setUploadSuccess(false);
      setUploadMessage("");
      let progress = 0;

      const uploadInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(uploadInterval);
          setUploadSuccess(true);
          setUploadMessage(`Video successfully uploaded to ${platform}!`);
          setUploading(false);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">AI Video Generator</h1>

      {!videoUrl && !isGenerating && !uploadedVideo && (
        <PromptForm onSubmit={generateVideo} />
      )}

      {isGenerating && <LoadingSpinner />}

      {!videoUrl && !isGenerating && !uploadedVideo && (
        <VideoUpload onVideoSelect={handleVideoSelect} />
      )}

      {videoUrl && (
        <>
          <div className="mt-6 w-full flex justify-center">
            <video src={videoUrl} controls className="w-full max-w-screen-xl h-auto rounded shadow-lg" />
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
          <ActionButtons onRetry={handleRetry} videoUrl={URL.createObjectURL(uploadedVideo)} onUpload={handleUpload} />
        </>
      )}

      {uploading && <ProgressBar progress={uploadProgress} />}
      {uploadMessage && <p className="mt-4 text-green-600 font-bold">{uploadMessage}</p>}
    </div>
  );
}

export default App;

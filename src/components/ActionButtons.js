import { useState } from 'react';

export default function ActionButtons({ onRetry, videoUrl, title, description }) {
    const [uploadStatus, setUploadStatus] = useState('');

    if (!videoUrl) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = 'generated-video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUpload = async (platform) => {
        if (platform !== 'YouTube') {
            alert(`Uploading to ${platform} (feature coming soon!)`);
            return;
        }

        try {
            setUploadStatus('Uploading to YouTube...');

            // Prepare the file for upload
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const file = new File([blob], 'generated-video.mp4', { type: 'video/mp4' });

            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title || 'AI Generated Video');
            formData.append('description', description || 'Uploaded via AI Video Uploader');
            formData.append('privacyStatus', 'private');

            const uploadResponse = await fetch('http://localhost:8080/youtube/upload', {
                method: 'POST',
                body: formData
            });

            const result = await uploadResponse.text();
            setUploadStatus(result);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('Upload failed.');
        }
    };

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
            <button
                onClick={onRetry}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Retry
            </button>
            <button
                onClick={handleDownload}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Download
            </button>
            <button
                onClick={() => handleUpload('YouTube')}
                className="bg-gray-800 text-white px-4 py-2 rounded"
            >
                Upload to YouTube
            </button>
            <button
                onClick={() => handleUpload('Instagram')}
                className="bg-pink-500 text-white px-4 py-2 rounded"
            >
                Upload to Instagram
            </button>
            <button
                onClick={() => handleUpload('TikTok')}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Upload to TikTok
            </button>

            {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </div>
    );
}

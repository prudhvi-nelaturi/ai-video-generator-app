export default function ActionButtons({ onRetry, videoUrl }) {
    if (!videoUrl) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = 'generated-video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUpload = (platform) => {
        alert(`Uploading to ${platform} (feature coming soon!)`);
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
        </div>
    );
}

import { useState } from "react";

export default function VideoUpload({ onVideoSelect }) {
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedVideoUrl(previewUrl);
            setSelectedFile(file);
            onVideoSelect(file, previewUrl); // Pass both file and preview URL to parent
        }
    };

    const handleRemove = () => {
        setSelectedVideoUrl(null);
        setSelectedFile(null);
        onVideoSelect(null, null); // Clear selection in parent as well
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="border p-2 rounded w-80"
            />

            {selectedVideoUrl && (
                <div className="mt-4 flex flex-col items-center">
                    <video
                        src={selectedVideoUrl}
                        controls
                        className="w-full max-w-7xl h-auto rounded shadow-lg"
                    />
                    <button
                        onClick={handleRemove}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Remove Video
                    </button>
                </div>
            )}
        </div>
    );
}

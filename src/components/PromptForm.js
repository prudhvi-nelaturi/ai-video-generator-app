import { useState, useEffect, useRef } from 'react';

export default function PromptForm({ onSubmit }) {
    const [prompt, setPrompt] = useState('');
    const inputRef = useRef(null);  // Reference to the input field

    useEffect(() => {
        inputRef.current.focus();  // Auto focus when component mounts
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(prompt);
        setPrompt('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
            <input
                ref={inputRef}  // Attach the input reference here
                type="text"
                placeholder="Enter your video prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="border p-2 rounded w-80"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Generate Video
            </button>
        </form>
    );
}

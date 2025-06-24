export default function ProgressBar({ progress }) {
    return (
        <div className="w-full max-w-xl h-2 bg-gray-300 rounded-full mt-4">
            <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

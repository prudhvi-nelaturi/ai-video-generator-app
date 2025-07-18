export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center mt-6">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
}

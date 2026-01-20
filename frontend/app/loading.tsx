export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin mb-6" />

      {/* Text */}
      <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent animate-pulse">
        Loading, please wait...
      </h3>
    </div>
  );
}

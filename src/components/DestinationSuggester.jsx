import React, { useState } from "react";

const scenicImages = [
  "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg", // tropical beach
  "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg", // mountain
  "https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg", // forest
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg", // desert
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"  // city skyline
];

const DestinationSuggester = () => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomDestination = async () => {
    setLoading(true);
    setError("");
    setDestination(null);

    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,subregion,flags"
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const country = data[randomIndex];

        const scenicImage =
          scenicImages[Math.floor(Math.random() * scenicImages.length)];

        setDestination({
          name: country.name.common,
          subregion: country.subregion || "Unknown Region",
          flag: country.flags.svg,
          scenic: scenicImage,
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(
            country.name.common
          )}`
        });
      } else {
        setError("No destinations found");
      }
    } catch (err) {
      setError("Failed to fetch destination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <h1 className="text-4xl font-bold mb-6">🌍 Travel Destination Suggester</h1>

      {loading && <p className="text-gray-300 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {destination && (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-md mb-6 transition-transform transform hover:scale-105">
          {/* Scenic image */}
          <img
            src={destination.scenic}
            alt="Scenic view"
            className="w-full h-48 object-cover"
          />
          {/* Flag */}
          <div className="flex justify-center bg-gray-900 p-2">
            <img
              src={destination.flag}
              alt={`${destination.name} flag`}
              className="h-12"
            />
          </div>
          {/* Info */}
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold">{destination.name}</h2>
            <p className="text-gray-400">{destination.subregion}</p>
            <a
              href={destination.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      )}

      <button
        onClick={getRandomDestination}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Suggest a Destination
      </button>
    </div>
  );
};

export default DestinationSuggester;

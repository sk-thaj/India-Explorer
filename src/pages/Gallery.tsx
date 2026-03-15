
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryImages } from "@/data/galleryImages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});

  const categories = ["All", "Temples", "Monuments", "Nature", "Beaches", "Mountains", "Palaces", "Forts", "Churches", "Gurudwaras", "Caves", "Waterfalls", "Wildlife", "Lakes", "Historical", "Spiritual"];
  
  const states = ["All", ...Array.from(new Set(galleryImages.map(img => img.location))).sort()];

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || image.category === selectedCategory;
    const matchesState = selectedState === "All" || image.location === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const handleImageLoad = (imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: false }));
  };

  const handleImageLoadStart = (imageUrl: string) => {
    setImageLoading(prev => ({ ...prev, [imageUrl]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Immerse yourself in the visual splendor of India through our curated collection of stunning photographs from all 28 states
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 w-64"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm ${selectedCategory === category ? "bg-gradient-to-r from-orange-500 to-pink-500" : ""}`}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} 
            {selectedState !== "All" && ` from ${selectedState}`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-100"
              onClick={() => setSelectedImage(image.url)}
            >
              {imageLoading[image.url] && (
                <Skeleton className="w-full h-64" />
              )}
              <img
                src={image.url}
                alt={image.title}
                className={`w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300 ${
                  imageLoading[image.url] ? 'hidden' : 'block'
                }`}
                onLoadStart={() => handleImageLoadStart(image.url)}
                onLoad={() => handleImageLoad(image.url)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <p className="text-sm opacity-90">{image.location}</p>
                <span className="inline-block bg-orange-500 text-xs px-2 py-1 rounded-full mt-1">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedState("All");
              }}
              className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Gallery;

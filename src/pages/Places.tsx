
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StateCard from "@/components/StateCard";
import PlaceDetails from "@/components/PlaceDetails";
import { indianStates } from "@/data/indianStates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";

const Places = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStates = indianStates.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedState) {
    const state = indianStates.find(s => s.name === selectedState);
    return <PlaceDetails state={state!} onBack={() => setSelectedState(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore All 28 Indian States
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the diverse beauty and rich culture of India's 28 states and 8 union territories with comprehensive information about tourist places, hotels, restaurants, and religious sites
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search states or capitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              <span>
                Showing {filteredStates.length} of {indianStates.length} states
              </span>
            </div>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>

        {filteredStates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No states found matching "{searchTerm}"</p>
            <Button
              onClick={() => setSearchTerm("")}
              className="bg-gradient-to-r from-orange-500 to-pink-500"
            >
              Show All States
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map((state) => (
              <StateCard
                key={state.name}
                state={state}
                onClick={() => setSelectedState(state.name)}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Places;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Star, Users, ShoppingBag, Utensils, Building, Phone, Globe, Church, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface State {
  name: string;
  capital: string;
  description: string;
  image: string;
  touristPlaces: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  hotels: Array<{
    name: string;
    rating: number;
    price: string;
  }>;
  restaurants: Array<{
    name: string;
    cuisine: string;
    rating: number;
  }>;
  malls: Array<{
    name: string;
    location: string;
  }>;
  religiousPlaces: Array<{
    name: string;
    type: string;
    significance: string;
  }>;
}

interface PlaceDetailsProps {
  state: State;
  onBack: () => void;
}

const PlaceDetails = ({ state, onBack }: PlaceDetailsProps) => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapPlace, setMapPlace] = useState<string>("");
  const { isAuthenticated } = useAuth();

  const handleViewMap = (placeName: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to view maps of specific places");
      return;
    }
    
    setLoading(true);
    setSelectedPlace(placeName);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setMapPlace(placeName);
      setIsMapOpen(true);
      toast.success(`Opening map for ${placeName}`);
    }, 1500);
  };

  const closeMap = () => {
    setIsMapOpen(false);
    setMapPlace("");
    setSelectedPlace(null);
  };

  // Generate Google Maps embed URL
  const getMapEmbedUrl = (placeName: string) => {
    const encodedPlace = encodeURIComponent(`${placeName}, ${state.name}, India`);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedPlace}`;
  };

  // Alternative embed URL that works without API key
  const getMapEmbedUrlFallback = (placeName: string) => {
    const encodedPlace = encodeURIComponent(`${placeName}, ${state.name}, India`);
    return `https://maps.google.com/maps?q=${encodedPlace}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const getReligiousIcon = (type: string) => {
    if (type.includes("Church")) return Church;
    if (type.includes("Mosque")) return Building;
    if (type.includes("Gurudwara")) return Users;
    if (type.includes("Temple") || type.includes("Hindu")) return Building;
    if (type.includes("Buddhist")) return Users;
    if (type.includes("Jain")) return Building;
    return Building;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navbar />
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <LoadingSpinner size="lg" text="Loading map information..." />
          </div>
        </div>
      )}

      {/* Map Modal */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                {mapPlace} - {state.name}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={closeMap}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 p-6 pt-2">
            <iframe
              src={getMapEmbedUrlFallback(mapPlace)}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${mapPlace}`}
              className="min-h-[500px]"
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to States
          </Button>
          
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <img 
              src={state.image} 
              alt={state.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{state.name}</h1>
              <p className="text-xl opacity-90 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Capital: {state.capital}
              </p>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-4xl">{state.description}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tourist-places" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tourist-places" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Tourist Places</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurants</span>
            </TabsTrigger>
            <TabsTrigger value="malls" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Malls</span>
            </TabsTrigger>
            <TabsTrigger value="religious" className="flex items-center gap-2">
              <Church className="h-4 w-4" />
              <span className="hidden sm:inline">Religious</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tourist-places" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.touristPlaces.map((place, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {place.name}
                      <Badge variant="secondary">{place.type}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{place.description}</p>
                    <Button 
                      onClick={() => handleViewMap(place.name)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      disabled={loading}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.hotels.map((hotel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {hotel.name}
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {hotel.rating}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600 mb-4">{hotel.price}</p>
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleViewMap(hotel.name)}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                        disabled={loading}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        View Location
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => toast.info("Booking feature coming soon!")}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.restaurants.map((restaurant, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {restaurant.name}
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {restaurant.rating}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="mb-4">{restaurant.cuisine}</Badge>
                    <Button 
                      onClick={() => handleViewMap(restaurant.name)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      disabled={loading}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View Location
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="malls" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.malls.map((mall, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{mall.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mall.location}
                    </p>
                    <Button 
                      onClick={() => handleViewMap(mall.name)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      disabled={loading}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View Location
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="religious" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.religiousPlaces.map((place, index) => {
                const IconComponent = getReligiousIcon(place.type);
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-orange-500" />
                          {place.name}
                        </div>
                        <Badge variant="outline">{place.type}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{place.significance}</p>
                      <Button 
                        onClick={() => handleViewMap(place.name)}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                        disabled={loading}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        View Location
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Login Prompt - Only show if not authenticated */}
        {!isAuthenticated && (
          <div className="mt-12 text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Want to explore these places?</h3>
            <p className="mb-6 opacity-90">Login to access detailed maps, booking features, and location information</p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Login / Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default PlaceDetails;


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

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

interface StateCardProps {
  state: State;
  onClick: () => void;
}

const StateCard = ({ state, onClick }: StateCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm hover:scale-105 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={state.image} 
          alt={state.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{state.name}</h3>
          <p className="text-sm opacity-90 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {state.capital}
          </p>
        </div>
      </div>
      
      <CardContent className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">{state.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tourist Places:</span>
            <span className="font-medium">{state.touristPlaces.length}+</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Hotels:</span>
            <span className="font-medium">{state.hotels.length}+</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Restaurants:</span>
            <span className="font-medium">{state.restaurants.length}+</span>
          </div>
        </div>
        
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 group"
        >
          Explore {state.name}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default StateCard;

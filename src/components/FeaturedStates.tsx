
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedStates = () => {
  const featuredStates = [
    {
      name: "Rajasthan",
      description: "Land of kings with majestic palaces and forts",
      image: "https://images.unsplash.com/photo-1599661046827-dacde815904a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Jaipur", "Udaipur", "Jaisalmer"]
    },
    {
      name: "Kerala",
      description: "God's own country with backwaters and spices",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Munnar", "Alleppey", "Kochi"]
    },
    {
      name: "Goa",
      description: "Tropical paradise with pristine beaches",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Baga Beach", "Old Goa", "Dudhsagar Falls"]
    },
    {
      name: "Himachal Pradesh",
      description: "Mountain paradise with snow-capped peaks",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Shimla", "Manali", "Dharamshala"]
    },
    {
      name: "Uttar Pradesh",
      description: "Historic heartland with iconic monuments",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Agra", "Varanasi", "Lucknow"]
    },
    {
      name: "Maharashtra",
      description: "Gateway of India with vibrant culture",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Mumbai", "Pune", "Lonavala"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Featured Indian States
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey with these popular destinations that showcase India's incredible diversity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStates.map((state, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={state.image} 
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{state.name}</h3>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{state.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {state.highlights.map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <Link to={`/places?state=${state.name}`}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 group">
                    Explore {state.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/places">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white">
              <MapPin className="mr-2 h-5 w-5" />
              View All States
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStates;

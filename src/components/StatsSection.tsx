
import { MapPin, Users, Camera, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: MapPin,
      number: "28+",
      label: "States & Territories",
      description: "Explore diverse regions"
    },
    {
      icon: Star,
      number: "1000+",
      label: "Tourist Places",
      description: "Handpicked destinations"
    },
    {
      icon: Camera,
      number: "5000+",
      label: "Beautiful Photos",
      description: "Visual inspiration"
    },
    {
      icon: Users,
      number: "10K+",
      label: "Happy Travelers",
      description: "Join the community"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover India Like Never Before
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From the snow-capped Himalayas to tropical beaches, explore India's incredible diversity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-4 group-hover:shadow-lg transition-shadow">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <h4 className="text-lg font-semibold text-orange-600 mb-1">{stat.label}</h4>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

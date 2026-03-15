
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Heart, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: MapPin,
      title: "Authentic Experiences",
      description: "We curate genuine local experiences that showcase the true spirit of India"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by travelers, for travelers, with insights from local communities"
    },
    {
      icon: Heart,
      title: "Passionate Service",
      description: "Our love for India's diverse culture drives everything we do"
    },
    {
      icon: Globe,
      title: "Sustainable Tourism",
      description: "Promoting responsible travel that benefits local communities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Connecting travelers with the incredible diversity and rich heritage of India
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              Incredible India Explorer was born from a simple belief: every corner of India has a story worth telling, 
              a culture worth experiencing, and a beauty worth discovering.
            </p>
            <p className="mb-6">
              Our platform serves as a comprehensive guide to India's 28 states and 8 union territories, 
              each offering unique landscapes, traditions, cuisines, and experiences. From the snow-capped 
              peaks of the Himalayas to the sun-kissed beaches of the south, from ancient temples to modern 
              metropolises, India's diversity is unparalleled.
            </p>
            <p className="mb-6">
              We understand that planning a trip to India can be overwhelming due to its sheer size and variety. 
              That's why we've created an intuitive platform that organizes destinations by states, making it 
              easy for travelers to discover tourist places, hotels, restaurants, shopping destinations, and 
              religious sites all in one place.
            </p>
            <p>
              Whether you're a first-time visitor or a seasoned traveler, our curated content, stunning photography, 
              and detailed information will help you create unforgettable memories across this incredible subcontinent.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or want to share your travel experiences? 
            We'd love to hear from you!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-orange-600">hello@incredibleindiaexplorer.com</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Follow Us</h3>
              <p className="text-orange-600">@IndiaExplorer</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;

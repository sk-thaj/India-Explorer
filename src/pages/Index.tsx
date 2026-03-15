
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Camera, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturedStates from "@/components/FeaturedStates";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <StatsSection />
      <FeaturedStates />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Indian Adventure Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover the incredible diversity of India, from majestic palaces to serene beaches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/places">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Explore Places
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-orange-500">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, MapPin, Users, IndianRupee, CheckCircle, Car, Wifi, Coffee, 
  Phone, Calendar, User, Printer, Zap, Lock, Tv, Shield 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { workspaces } from "@/data/workspaces"; // IMPORT THE SHARED DATA

// Helper to map amenity names to Icons
const getAmenityIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("wifi")) return Wifi;
  if (lower.includes("park")) return Car;
  if (lower.includes("cafe") || lower.includes("coffee") || lower.includes("food")) return Coffee;
  if (lower.includes("meet") || lower.includes("projector")) return Users; // Using Users as generic meeting
  if (lower.includes("print")) return Printer;
  if (lower.includes("power") || lower.includes("backup")) return Zap;
  if (lower.includes("security") || lower.includes("access")) return Shield;
  if (lower.includes("tv") || lower.includes("av")) return Tv;
  return CheckCircle; // Default icon
};

const SpaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // 2. Find the workspace from data using the ID
    const foundSpace = workspaces.find((w) => w.id === parseInt(id));
    
    if (foundSpace) {
      setSpace(foundSpace);
    } else {
      // Handle not found (optional: redirect)
      // navigate("/search");
    }
  }, [id, navigate]);

  if (!space) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Loading space details...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Image Gallery - Showing Top 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-card h-80">
                <div className="md:col-span-1 h-full">
                    <img 
                      src={space.images[0]} 
                      alt={space.name} 
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                    <img 
                      src={space.images[1] || space.images[0]} 
                      alt="Interior 1" 
                      className="w-full h-full object-cover"
                    />
                    <img 
                      src={space.images[2] || space.images[0]} 
                      alt="Interior 2" 
                      className="w-full h-full object-cover"
                    />
                </div>
              </div>

              {/* Title & Location */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                          {space.name}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-teal" />
                          <span>{space.address}</span>
                        </div>
                    </div>
                    {/* Rating Badge */}
                    <div className="bg-teal/10 text-teal px-3 py-1 rounded-full font-bold text-sm">
                        ★ {space.rating}
                    </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    {space.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <IndianRupee className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">
                      ₹{space.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">Starting Price</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <Users className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">{space.seats}</span>
                    <span className="text-xs text-muted-foreground">Total Seats</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <CheckCircle className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground capitalize">{space.type.replace("-", " ")}</span>
                    <span className="text-xs text-muted-foreground">Space Type</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <Car className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">{space.parking}+</span>
                    <span className="text-xs text-muted-foreground">Parking Spots</span>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-teal rounded-full"></span>
                  Property Details
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Operator</span>
                    <p className="font-semibold text-teal">{space.operator}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Floor</span>
                    <p className="font-semibold text-foreground">{space.floor}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Micro Market</span>
                    <p className="font-semibold text-teal">{space.location}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Availability Status</span>
                    <p className={`font-semibold ${space.status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>
                        {space.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities - Dynamic Mapping */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-teal rounded-full"></span>
                  Amenities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {space.amenities.map((amenity) => {
                    const IconComp = getAmenityIcon(amenity);
                    return (
                        <div 
                          key={amenity}
                          className="flex items-center gap-3 p-3 bg-secondary rounded-xl border border-border/50 hover:border-teal/50 transition-colors"
                        >
                          <IconComp className="w-5 h-5 text-teal" />
                          <span className="text-sm font-medium text-foreground">{amenity}</span>
                        </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-teal rounded-full"></span>
                  Location Map
                </h2>
                <div className="h-64 bg-secondary rounded-xl flex items-center justify-center border border-border overflow-hidden relative">
                  {/* Fake Map Image Background */}
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="map bg" />
                  <div className="text-center text-muted-foreground relative z-10 bg-white/80 p-4 rounded-xl backdrop-blur-sm">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-teal" />
                    <p className="font-semibold text-navy">{space.address}</p>
                    <Button variant="link" className="text-teal mt-2 h-auto p-0">View on Google Maps</Button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column – Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-card border border-border/50">
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-teal">
                      ₹{space.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Ref ID: FLICK-{space.id}0{space.id}</p>
                </div>

                <div className="space-y-3">
                  <Button variant="teal" className="w-full h-12 font-semibold text-base shadow-lg shadow-teal/20">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Tour
                  </Button>

                  <Button variant="outline" className="w-full h-12 font-semibold border-border hover:bg-secondary">
                    <Phone className="w-5 h-5 mr-2" />
                    Request Callback
                  </Button>

                  <Button variant="outline" className="w-full h-12 font-semibold border-border hover:bg-secondary">
                    <User className="w-5 h-5 mr-2" />
                    Contact {space.operator}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-teal/5 rounded-xl border border-teal/10">
                    <h4 className="text-sm font-bold text-navy mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-teal" />
                        FlickSpace Guarantee
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Best price guaranteed. No hidden booking fees. Verified listing.
                    </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SpaceDetail;
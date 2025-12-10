import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { 
  ArrowLeft, MapPin, Users, IndianRupee, CheckCircle, Car, Wifi, Coffee, 
  Phone, Calendar, User 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import office1 from "@/assets/office-1.jpg";
import office2 from "@/assets/office-2.jpg";
import office3 from "@/assets/office-3.jpg";

// Mock data - in real app this would come from API
const spaceData = {
  "1": {
    name: "CoWrks RMZ Ecoworld",
    address: "RMZ Ecoworld, Outer Ring Road, Bellandur, Bangalore 560103",
    price: 13500,
    seats: 55,
    operator: "CoWrks",
    floor: "5th Floor",
    status: "Available",
    parking: 22,
    images: [office1, office2, office3],
    amenities: ["WiFi", "Parking", "Cafe", "Reception", "Meeting Rooms", "24/7 Access"],
    details: {
      operator: "CoWrks",
      location: "Bellandur",
      floor: "5th Floor",
      status: "Available",
    }
  }
};

const SpaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const space = spaceData["1"]; // Using mock data for now

  // ⭐ FIX: Scroll to TOP when this page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img 
                  src={space.images[0]} 
                  alt={space.name} 
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Title & Location */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {space.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>{space.address}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <IndianRupee className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">
                      ₹{space.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">Per Seat</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <Users className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">{space.seats}</span>
                    <span className="text-xs text-muted-foreground">Available Seats</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <CheckCircle className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">Furnished</span>
                    <span className="text-xs text-muted-foreground">Furnishing</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-xl">
                    <Car className="w-5 h-5 text-teal mb-1" />
                    <span className="font-bold text-foreground">{space.parking}</span>
                    <span className="text-xs text-muted-foreground">Parking</span>
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
                    <p className="font-semibold text-teal">{space.details.operator}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Floor</span>
                    <p className="font-semibold text-foreground">{space.details.floor}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Location</span>
                    <p className="font-semibold text-teal">{space.details.location}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <p className="font-semibold text-teal">{space.details.status}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-teal rounded-full"></span>
                  Amenities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Wifi, label: "WiFi" },
                    { icon: Car, label: "Parking" },
                    { icon: Coffee, label: "Cafe" },
                    { icon: Phone, label: "Reception" },
                  ].map((amenity) => (
                    <div 
                      key={amenity.label}
                      className="flex flex-col items-center p-4 bg-secondary rounded-xl border border-border/50 hover:border-teal/50 transition-colors"
                    >
                      <amenity.icon className="w-6 h-6 text-teal mb-2" />
                      <span className="text-sm font-medium text-foreground">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-teal rounded-full"></span>
                  Location
                </h2>
                <div className="h-64 bg-secondary rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-teal/50" />
                    <p>Map will be displayed here</p>
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
                    <span className="text-muted-foreground">/seat</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">PDC-250</p>
                </div>

                <div className="space-y-3">
                  <Button variant="teal" className="w-full h-12 font-semibold">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Tour
                  </Button>

                  <Button variant="outline" className="w-full h-12 font-semibold border-border hover:bg-secondary">
                    <Phone className="w-4 h-4 mr-2" />
                    Request Callback
                  </Button>

                  <Button variant="outline" className="w-full h-12 font-semibold border-border hover:bg-secondary">
                    <User className="w-4 h-4 mr-2" />
                    Contact Operator
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Our broker will call you within 24 hours
                </p>

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

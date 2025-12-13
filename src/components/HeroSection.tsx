import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ChatBot from "@/components/ChatBot";
import heroBg from "@/assets/hero.png";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  const navigate = useNavigate();

  // State for filters
  const [location, setLocation] = useState("");
  const [microMarket, setMicroMarket] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");

  const microMarkets = {
    bangalore: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "MG Road"],
    mumbai: ["Bandra", "Andheri", "Powai", "Lower Parel", "BKC"],
    delhi: ["Connaught Place", "Saket", "Nehru Place", "Hauz Khas", "Dwarka"],
    hyderabad: ["Hitech City", "Gachibowli", "Jubilee Hills", "Banjara Hills", "Madhapur"],
  };

  // Helper to safely format string to slug
  const toSlug = (str) => {
    return str ? str.toLowerCase().replace(/\s+/g, "-") : "";
  };

  // Handle City Change (IMPORTANT: Reset Market when City changes)
  const handleLocationChange = (val) => {
    setLocation(val);
    setMicroMarket(""); // <--- FIX: Prevents searching for Mumbai + Koramangala
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Only append params if they exist
    if (location) params.append("location", location);
    if (microMarket) params.append("market", microMarket);
    if (type) params.append("type", type);
    if (price) params.append("price", price);
    if (seats) params.append("seats", seats);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: "center 70%",
        }}
      >
        <div className="absolute inset-0 bg-navy/35 pointer-events-none" />
      </div>

      <div className="relative z-20 container mx-auto px-4 pt-20 pb-12 w-full">
        <div className="flex flex-col items-center max-w-7xl mx-auto">
          
          <div className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              Find your perfect workspace <span className="text-teal">in seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 max-w-4xl mx-auto font-light">
              Let AI help you discover the ideal coworking space for your team, or search directly below.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-6xl items-center">
            
            <div className="w-full flex justify-center">
              <ChatBot />
            </div>

            <div className="w-full bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 mt-2">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <Search className="w-4 h-4 text-teal" />
                <h2 className="text-lg font-bold text-gray-900">Search Directly</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Location <span className="text-teal">*</span>
                  </label>
                  <Select onValueChange={handleLocationChange} value={location}>
                    <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200 text-gray-900 text-xs focus:ring-teal focus:border-teal">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-900">
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Micro Market */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Micro Market <span className="text-teal">*</span>
                  </label>
                  <Select disabled={!location} onValueChange={setMicroMarket} value={microMarket}>
                    <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200 text-gray-900 text-xs focus:ring-teal focus:border-teal">
                      <SelectValue placeholder={location ? "Area" : "Select City"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-900">
                      {location &&
                        microMarkets[location]?.map((area) => (
                          <SelectItem
                            key={area}
                            value={toSlug(area)}
                          >
                            {area}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Workspace Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Type <span className="text-teal">*</span>
                  </label>
                  <Select onValueChange={setType} value={type}>
                    <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200 text-gray-900 text-xs focus:ring-teal focus:border-teal">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-900">
                      <SelectItem value="private-office">Private Office</SelectItem>
                      <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                      <SelectItem value="hot-desk">Hot Desk</SelectItem>
                      <SelectItem value="meeting-room">Meeting Room</SelectItem>
                      <SelectItem value="virtual-office">Virtual Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Price Range <span className="text-teal">*</span>
                  </label>
                  <Select onValueChange={setPrice} value={price}>
                    <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200 text-gray-900 text-xs focus:ring-teal focus:border-teal">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-900">
                      <SelectItem value="below-10k">&lt; ₹10k</SelectItem>
                      <SelectItem value="10k-20k">₹10k - ₹20k</SelectItem>
                      <SelectItem value="20k-50k">₹20k - ₹50k</SelectItem>
                      <SelectItem value="50k-plus">₹50k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Seats <span className="text-teal">*</span>
                  </label>
                  <Select onValueChange={setSeats} value={seats}>
                    <SelectTrigger className="w-full h-9 bg-gray-50 border-gray-200 text-gray-900 text-xs focus:ring-teal focus:border-teal">
                      <SelectValue placeholder="Seats" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-900">
                      <SelectItem value="1-5">1 - 5</SelectItem>
                      <SelectItem value="6-10">6 - 10</SelectItem>
                      <SelectItem value="11-20">11 - 20</SelectItem>
                      <SelectItem value="20-plus">20+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div>
                  <Button
                    onClick={handleSearch}
                    variant="default" 
                    size="sm"
                    className="h-9 w-full rounded-xl font-bold text-xs shadow-lg bg-teal hover:bg-teal/90"
                  >
                    <Search className="w-3 h-3 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
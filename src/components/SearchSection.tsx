import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
           Search  <span className="text-teal">directly</span>
        </h2>

        <div className="bg-card rounded-2xl shadow-card p-8 md:p-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location <span className="text-teal">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full h-12 bg-background border-border">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Micromarket */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Micromarket <span className="text-teal">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full h-12 bg-background border-border">
                  <SelectValue placeholder="Select micromarket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hsr">HSR Layout</SelectItem>
                  <SelectItem value="indiranagar">Indiranagar</SelectItem>
                  <SelectItem value="whitefield">Whitefield</SelectItem>
                  <SelectItem value="koramangala">Koramangala</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price Range <span className="text-teal">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full h-12 bg-background border-border">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-10k">&lt; ₹10,000</SelectItem>
                  <SelectItem value="10k-20k">₹10,000 - ₹20,000</SelectItem>
                  <SelectItem value="20k-50k">₹20,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="above-1l">&gt; ₹1,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Building Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Building Name
              </label>
              <Select>
                <SelectTrigger className="w-full h-12 bg-background border-border">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awfis">Awfis</SelectItem>
                  <SelectItem value="wework">WeWork</SelectItem>
                  <SelectItem value="smartworks">Smartworks</SelectItem>
                  <SelectItem value="cowrks">CoWrks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* No. of Seats */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                No. of Seats <span className="text-teal">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full h-12 bg-background border-border">
                  <SelectValue placeholder="Select seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1 - 5</SelectItem>
                  <SelectItem value="6-10">6 - 10</SelectItem>
                  <SelectItem value="11-20">11 - 20</SelectItem>
                  <SelectItem value="21-50">21 - 50</SelectItem>
                  <SelectItem value="50+">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button variant="teal" size="lg" className="h-12 w-full rounded-xl font-semibold">
              <Search className="w-5 h-5 mr-2" />
              Search Workspaces
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

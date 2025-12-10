import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Home", "Spaces", "Pricing", "Contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-navy/60">
        
        {/* NAVBAR */}
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-white tracking-tight">
              Flick<span className="text-teal">Space</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                  className="text-white/90 hover:text-teal text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white/90 hover:text-white text-sm font-medium hover:bg-transparent px-4">
                Log In
              </Button>

              <Button variant="teal" size="sm" className="rounded-md font-semibold shadow-lg hover:shadow-teal/50 transition-shadow px-5">
                Book Tour
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen((s) => !s)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU (Now Seamless — No Line Above) */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-transparent",
            isMenuOpen ? "max-h-[420px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          )}
        >
          <nav className="container mx-auto px-6 flex flex-col gap-2">

            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className="px-4 py-3 text-white hover:text-teal text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-3">
              <Button variant="ghost" className="text-white hover:text-teal justify-start text-sm">
                Log In
              </Button>

              <Button variant="teal" className="w-full rounded-md">
                Book Tour
              </Button>
            </div>

          </nav>
        </div>

      </header>
    </>
  );
};

export default Header;

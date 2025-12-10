import { useState } from "react";
import ChatBot from "@/components/ChatBot";
import heroBg from "@/assets/hero-bg.jpg";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-navy/85 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-28 pb-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Hero heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Find your perfect workspace
              <br />
              <span className="text-teal">in seconds</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-light">
              Let AI help you discover the ideal coworking space for your team
            </p>
          </div>

          {/* FIX: This container holds EITHER the Button OR the ChatBot.
             This prevents the page from expanding downwards significantly when clicked.
          */}
          <div className="w-full flex justify-center min-h-[100px]">
            {!showChat ? (
              <Button
                variant="teal"
                size="lg"
                className="text-base md:text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl hover:scale-100 font-semibold animate-in fade-in zoom-in duration-300"
                onClick={() => setShowChat(true)}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Start Your Search with AI
              </Button>
            ) : (
              // The ChatBot appears exactly where the button was
              <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ChatBot onClose={() => setShowChat(false)} />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
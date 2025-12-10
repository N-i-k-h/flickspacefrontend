import { Search, Eye, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Tell our AI what you're looking for or use filters to find your ideal workspace.",
  },
  {
    icon: Eye,
    title: "View",
    description: "Browse detailed listings with photos, amenities, and pricing information.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    description: "Schedule a tour or request callback from our team to finalize your workspace.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h2 text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find your perfect workspace in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center group-hover:bg-teal transition-colors duration-300 shadow-soft">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-h3 text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

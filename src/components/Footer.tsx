import logo from "@/assets/flickspace-logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="FlickSpace" className="h-8 w-auto" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Contact Us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-primary-foreground/50 text-sm">
            © 2024 FlickSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

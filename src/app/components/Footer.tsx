import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#21362e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                <div className="w-2.5 h-5 bg-[#b8ea27] rounded-sm mr-[2px]"></div>
                <div className="w-2.5 h-5 bg-white rounded-sm"></div>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                GRITEK SOLUTION
              </h3>
            </div>
            <p className="text-white/70 mb-4 text-sm leading-relaxed">
              Transforming ideas into powerful digital solutions. We help businesses grow with cutting-edge technology and innovative strategies.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">About</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Services</Link></li>
              <li><Link to="/portfolio" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Portfolio</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Web Development</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">E-Commerce</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Mobile Apps</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Digital Marketing</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Graphic Design</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">Baben, Bardoli, Surat – Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">+91 77780 20756</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm break-all">ritikakumawat2028@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © 2025 Gritek Solution. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

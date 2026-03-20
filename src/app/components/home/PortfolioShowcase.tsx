import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { ImageWithFallback } from '../figma/ImageWithFallback';

import img1 from '../../../assets/WhatsApp Image 2026-03-20 at 2.28.57 PM.jpeg';
import img2 from '../../../assets/WhatsApp Image 2026-03-20 at 2.28.58 PM.jpeg';
import img3 from '../../../assets/WhatsApp Image 2026-03-20 at 2.28.58 PM (1).jpeg';

const portfolioProjects = [
  {
    title: 'E-Commerce Platform',
    image: img1,
    category: 'E-Commerce',
  },
  {
    title: 'Corporate Website',
    image: img2,
    category: 'Website',
  },
  {
    title: 'Healthcare Dashboard',
    image: img3,
    category: 'Web App',
  },
  {
    title: 'Social Media Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Web App',
  },
  {
    title: 'Restaurant Website',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    category: 'Website',
  },
  {
    title: 'Mobile Banking App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'Mobile App',
  },
  {
    title: 'Real Estate Platform',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    category: 'Website',
  },
];

export function PortfolioShowcase() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#b8ea27] font-semibold mb-3 text-sm uppercase tracking-wider"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#21362e] mb-4"
          >
            Showcasing Our Passion for Innovation and Quality
          </motion.h2>
        </div>

        {/* Swiper Carousel - Full page website screenshots style */}
        <div className="mb-12 relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            initialSlide={3}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 300,
              modifier: 2,
              slideShadows: true,
            }}
            className="portfolio-swiper !pb-8"
          >
            {portfolioProjects.map((project, index) => (
              <SwiperSlide key={index} className="!w-[260px] sm:!w-[380px] lg:!w-[480px]">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-2xl border-[4px] sm:border-[6px] border-white/90">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/90 via-[#21362e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-8 rounded-xl sm:rounded-2xl">
                    <div className="text-xs sm:text-sm font-semibold text-[#b8ea27] mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</div>
                    <h3 className="text-lg sm:text-2xl font-bold text-[#ffffff] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-button-prev-custom w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-[#ffffff] flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-colors shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="swiper-button-next-custom w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-[#ffffff] flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-colors shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA Buttons - All solid filled */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#21362e] text-[#b8ea27] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-[#1a2b24] font-semibold shadow-lg"
            >
              Request A Quote
            </motion.button>
          </Link>
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b8ea27] text-[#21362e] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-[#a6d420] font-semibold shadow-lg"
            >
              Check Our Portfolio
            </motion.button>
          </Link>
        </div>
      </div>

      <style>{`
        .portfolio-swiper .swiper-slide-shadow-left,
        .portfolio-swiper .swiper-slide-shadow-right {
          border-radius: 1rem;
          background: linear-gradient(to right, rgba(0,0,0,0.35), transparent);
        }
        .portfolio-swiper .swiper-slide-shadow-right {
          background: linear-gradient(to left, rgba(0,0,0,0.35), transparent);
        }
        .portfolio-swiper .swiper-slide:not(.swiper-slide-active) {
            opacity: 0.7;
            filter: blur(1.5px);
            transform-origin: center;
        }
        .portfolio-swiper .swiper-slide-active {
            opacity: 1;
            filter: blur(0px);
            z-index: 10;
        }
      `}</style>
    </section>
  );
}
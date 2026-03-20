import { motion } from 'motion/react';
import { Target, Eye, Zap, Shield, Headphones, DollarSign, Search, PenTool, Code2, CheckCircle, Rocket, Linkedin, Twitter, Github } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const whyChooseUs = [
  { icon: Zap, title: 'Fast Delivery', text: 'On-time project delivery guaranteed.' },
  { icon: Shield, title: 'Secure & Reliable', text: 'Enterprise-grade security standards.' },
  { icon: Headphones, title: '24/7 Support', text: 'Dedicated support team always available.' },
  { icon: DollarSign, title: 'Affordable Pricing', text: 'Premium quality at competitive rates.' },
];

const processSteps = [
  { step: 1, label: 'Discovery', icon: Search, color: '#21362e' },
  { step: 2, label: 'Design', icon: PenTool, color: '#b8ea27' },
  { step: 3, label: 'Development', icon: Code2, color: '#b8ea27' },
  { step: 4, label: 'Testing', icon: CheckCircle, color: '#21362e' },
  { step: 5, label: 'Launch', icon: Rocket, color: '#b8ea27' },
];

const team = [
  {
    name: 'Gautam chaudhary',
    role: 'Founder & CEO',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Ritika Kumawat',
    role: 'CO-FOUNDER ',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Meet Darji ',
    role: 'Marketing Head',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Partik Agarwal',
    role: 'Digital Marketing Head',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#f8fafc] pt-8 sm:pt-12 pb-10 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left z-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21362e]/10 border border-[#21362e]/20 text-[#21362e] text-sm font-semibold mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#b8ea27] animate-pulse"></span>
                Who We Are
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#21362e] mb-4 tracking-tight leading-tight">
                About <br />
                <span className="text-[#b8ea27]">
                  Gritek Solution
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#21362e]/80 mb-6 sm:mb-10 max-w-xl leading-relaxed">
                We are a passionate team of designers, developers, and digital strategists committed to transforming your business vision into a powerful digital reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#b8ea27] text-[#21362e] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:shadow-[0_0_20px_rgba(184,234,39,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                  Meet Our Team
                </button>
                <button onClick={() => document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#21362e] text-[#b8ea27] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-[#1a2b24] transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  Our Process
                </button>
              </div>
            </motion.div>

            {/* Right Column - Diagonal Cascade Layout */}
            <div className="relative w-full mt-10 lg:mt-0 h-[300px] sm:h-[380px] lg:h-[450px]">

              {/* Decorative rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[80%] aspect-square rounded-full border-2 border-dashed border-[#b8ea27]/30 z-0"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] aspect-square rounded-full border border-[#21362e]/10 z-0"
              />

              {/* Main large image — center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="absolute top-[10%] left-[10%] w-[65%] sm:w-[60%] h-[75%] rounded-[24px] overflow-hidden group shadow-[0_12px_40px_rgba(33,54,46,0.3)] z-20 border-4 border-white"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1000&q=80"
                  alt="Our Agency Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/60 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-4 left-4"
                >
                  <span className="inline-block bg-[#b8ea27] text-[#21362e] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">Gritek Core Team</span>
                </motion.div>
              </motion.div>

              {/* Top-right overlapping image */}
              <motion.div
                initial={{ opacity: 0, x: 60, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
                className="absolute top-[2%] right-[5%] w-[42%] sm:w-[38%] h-[40%] rounded-[20px] overflow-hidden group shadow-[0_8px_30px_rgba(33,54,46,0.25)] z-30 border-4 border-white"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#b8ea27]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Bottom-right overlapping image */}
              <motion.div
                initial={{ opacity: 0, y: 50, x: 30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7, type: "spring" }}
                className="absolute bottom-[5%] right-[2%] w-[45%] sm:w-[42%] h-[38%] rounded-[20px] overflow-hidden group shadow-[0_8px_30px_rgba(33,54,46,0.25)] z-30 border-4 border-white"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Creative Workspace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#21362e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Floating stats badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", bounce: 0.5 }}
                className="absolute bottom-[15%] left-[2%] z-40 bg-white rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(33,54,46,0.2)] border border-[#b8ea27]/20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#b8ea27] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#21362e] font-bold text-sm leading-tight">300+ Clients</p>
                  <p className="text-[#21362e]/50 text-xs">Trusted by businesses</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-10 sm:py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#21362e] mb-4">Who We Are</h2>
              <p className="text-base sm:text-lg text-[#21362e]/80 mb-4 sm:mb-6">
                Gritek Solution is a full-service IT agency based in Surat, Gujarat. We specialize in delivering end-to-end digital solutions for startups, SMEs, and enterprise businesses across India.
              </p>
              <p className="text-lg text-[#21362e]/80 mb-6">
                Founded with a vision to empower businesses through technology, we've grown from a small team to a trusted partner for over 300 businesses. Our commitment to quality, innovation, and customer satisfaction drives everything we do.
              </p>
              <p className="text-lg text-[#21362e]/80">
                We believe in building long-term relationships with our clients by delivering exceptional results that exceed expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Our Team"
                className="rounded-2xl card-shadow-hover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 sm:py-20 section-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#ffffff] p-6 sm:p-10 rounded-2xl border border-[#b8ea27]/30 card-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#b8ea27] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#ffffff]" />
              </div>
              <h3 className="text-xl font-bold text-[#21362e] mb-3">Our Mission</h3>
              <p className="text-[#21362e]/80 text-lg">
                To empower businesses with innovative digital tools that accelerate growth and create lasting impact. We strive to make technology accessible, affordable, and effective for businesses of all sizes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#ffffff] p-6 sm:p-10 rounded-2xl border border-[#b8ea27]/30 card-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#b8ea27] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#ffffff]" />
              </div>
              <h3 className="text-xl font-bold text-[#21362e] mb-3">Our Vision</h3>
              <p className="text-[#21362e]/80 text-lg">
                To be India's most trusted and innovative IT agency, known for quality, transparency, and results. We aim to set new standards in digital excellence and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] text-center mb-10"
          >
            Why Choose Gritek Solution
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#b8ea27] flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#21362e] mb-2">{item.title}</h3>
                  <p className="text-[#21362e]/80">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section id="process-section" className="py-10 sm:py-20 section-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] text-center mb-10"
          >
            Our Process
          </motion.h2>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#21362e] via-[#b8ea27] to-[#b8ea27] -translate-y-1/2"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 relative">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10 bg-[#ffffff] card-shadow"
                      style={{ borderColor: step.color, borderWidth: '3px' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <div className="text-2xl font-bold mb-2" style={{ color: step.color }}>
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[#21362e]">{step.label}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="team-section" className="py-10 sm:py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] text-center mb-10"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden card-shadow transition-smooth hover:card-shadow-hover group"
              >
                <ImageWithFallback
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#21362e] mb-2">{member.name}</h3>
                  <p className="text-[#21362e]/80 mb-4">{member.role}</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-lg border border-[#b8ea27]/30 flex items-center justify-center hover:border-[#21362e] hover:text-[#21362e] transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg border border-[#b8ea27]/30 flex items-center justify-center hover:border-[#21362e] hover:text-[#21362e] transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg border border-[#b8ea27]/30 flex items-center justify-center hover:border-[#21362e] hover:text-[#21362e] transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqs = [
  {
    question: 'How long does it take to deliver a pre-built application or website?',
    answer: 'Timelines depend on complexity. A standard website typically takes 7–14 days, while custom projects may take 3–6 weeks. We provide a detailed timeline during the initial consultation.',
  },
  {
    question: 'Do you provide the complete source code after development?',
    answer: 'Yes, upon project completion you receive full source code, all files, documentation, and deployment credentials. You have complete ownership of your project.',
  },
  {
    question: 'What\'s the difference between a pre-built and a custom development project?',
    answer: 'Pre-built templates are faster to deploy and cost-effective, ideal for standard business needs. Custom projects are built from scratch for unique business requirements, offering complete flexibility and scalability.',
  },
  {
    question: 'Do you provide maintenance and support after delivery?',
    answer: 'Yes, we offer monthly and annual maintenance packages including regular updates, security patches, bug fixes, and technical support. We ensure your digital assets stay secure and up-to-date.',
  },
  {
    question: 'What technologies do you use for development?',
    answer: 'We use modern, industry-standard technologies including React, Next.js, Node.js, Laravel, Flutter, WordPress, Shopify, and more. Technology stack is chosen based on project requirements for optimal performance.',
  },
];

export function FAQ() {
  return (
    <section className="py-12 bg-gradient-to-br from-[#ffffff] to-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#21362e] leading-tight sticky top-24">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* Right Side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-[#ffffff] rounded-xl border-l-4 border-transparent hover:border-[#21362e] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#21362e] hover:no-underline px-5 py-4 text-base hover:text-[#21362e] transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#21362e]/70 leading-relaxed px-5 pb-4 text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
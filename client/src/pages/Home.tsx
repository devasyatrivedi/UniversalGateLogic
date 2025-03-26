import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Gamepad2, Beaker, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Digital Logic <span className="text-blue-200">Virtual Lab</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 text-blue-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Explore the fascinating world of digital logic with our interactive virtual lab.
                Learn how all basic logic functions can be built using only universal gates like NAND and NOR.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link href="/experiments">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Start Experimenting <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/theory">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                    Learn Theory
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Explore Our Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Digital Logic Theory</h3>
                <p className="text-slate-600 mb-4">Learn the fundamental concepts of digital logic and how universal gates work.</p>
                <Link href="/theory">
                  <Button variant="link" className="text-blue-600 p-0">
                    View Theory <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-purple-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Beaker className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">Interactive Experiments</h3>
                <p className="text-slate-600 mb-4">Test and explore how basic gates can be implemented using only NAND or NOR gates.</p>
                <Link href="/experiments">
                  <Button variant="link" className="text-purple-600 p-0">
                    Start Experimenting <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-green-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Gamepad2 className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Logic Gate Game</h3>
                <p className="text-slate-600 mb-4">Challenge yourself to build different logic functions using only universal gates.</p>
                <Link href="/game">
                  <Button variant="link" className="text-green-600 p-0">
                    Play Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-amber-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-amber-700">Help & Support</h3>
                <p className="text-slate-600 mb-4">Get assistance, find answers to common questions, and access additional resources.</p>
                <Link href="/help">
                  <Button variant="link" className="text-amber-600 p-0">
                    Get Help <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <motion.section 
          className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6 text-indigo-700"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Master Digital Logic?
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 max-w-2xl mx-auto text-slate-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Start your journey through our interactive lab and discover how complex digital systems
              can be built from simple universal gates.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/game">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Start Building Circuits Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}

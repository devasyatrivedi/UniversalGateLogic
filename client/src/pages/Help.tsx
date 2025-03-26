import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, BookOpen, Code, Info, ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Help() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-slate-800">Help & Support</h1>
        </motion.div>
        
        {/* Contact Section */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="flex items-center text-amber-700">
                <Mail className="mr-2 h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Need personal assistance? Reach out to us directly</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-grow">
                  <p className="text-slate-700">
                    If you have any questions, feedback, or need personalized help, please don't hesitate to contact us at:
                  </p>
                  <p className="font-medium text-lg text-amber-700 mt-2">
                    <Mail className="inline-block mr-2 h-5 w-5" />
                    <a href="mailto:devasyatrivedi@hotmail.com" className="hover:underline">
                      devasyatrivedi@hotmail.com
                    </a>
                  </p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <a href="mailto:devasyatrivedi@hotmail.com" className="flex items-center">
                    Contact Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
        
        {/* FAQs Section */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 hover:bg-slate-50">
                What are universal gates?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Universal gates are logic gates that can be used to implement any Boolean function. 
                The most common universal gates are NAND and NOR gates. Using only NAND gates or only NOR gates, 
                you can build any other type of logic gate and implement any digital circuit.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4 hover:bg-slate-50">
                How do I use the interactive tester on the Experiments page?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                The interactive tester allows you to see how different inputs affect the output of logic gates.
                Simply click on the input switches to toggle between 0 and 1, and watch how the output changes
                based on the gate's logic function. This helps visualize how each gate processes inputs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 hover:bg-slate-50">
                How can I build my own circuits in the game section?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                In the Game section, you can drag and drop NAND or NOR gates from the toolbox onto the workspace.
                Connect the gates by clicking and dragging from one gate's output to another gate's input.
                Your goal is to create specific logic functions (like AND, OR, XOR) using only universal gates.
                The simulator will evaluate your circuit in real-time as you build it.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4 hover:bg-slate-50">
                What's the difference between NAND and NOR gates?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                NAND is the complement of AND (NOT-AND) - it outputs 0 only when all inputs are 1.
                NOR is the complement of OR (NOT-OR) - it outputs 1 only when all inputs are 0.
                Both are universal gates, meaning either one can be used to implement any Boolean function.
                The choice between them often depends on manufacturing considerations, circuit design goals,
                or personal preference.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-4 hover:bg-slate-50">
                Where can I learn more about digital logic?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Our Theory section provides a comprehensive introduction to digital logic concepts.
                For deeper learning, we recommend books like "Digital Design" by Morris Mano or
                "Digital Logic and Computer Design" by M. Morris Mano. There are also excellent
                online courses on platforms like Coursera, edX, and Khan Academy that cover digital
                logic and computer architecture.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>
        
        {/* Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learning Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Access textbooks, articles, and educational resources about digital logic design.
                </p>
                <Link href="/theory">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                    Explore Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-purple-700">
                  <Code className="mr-2 h-5 w-5" />
                  Circuit Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  See examples of common circuits implemented using universal gates.
                </p>
                <Link href="/experiments">
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    View Examples
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-green-700">
                  <Info className="mr-2 h-5 w-5" />
                  Project Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Learn about this project, its purpose, and how it was developed.
                </p>
                <Link href="https://github.com">
                  <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
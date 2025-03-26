import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NandImplementations from '@/components/gates/NandImplementations';
import NorImplementations from '@/components/gates/NorImplementations';
import { motion } from 'framer-motion';

export default function Experiments() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Interactive Experiments</h1>
          <p className="text-lg text-slate-600 mb-8">
            Test and observe how basic logic gates can be implemented using universal gates
          </p>
        </motion.div>
        
        {/* Experiment Introduction */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-purple-700">How to Use the Experiments</h2>
            <p className="text-slate-700 mb-4">
              These interactive experiments demonstrate how basic logic gates can be implemented using only universal gates
              (NAND or NOR). Here's how to use them:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Select either the "Using NAND Gates" or "Using NOR Gates" tab below</li>
              <li>For each gate implementation, you'll see:
                <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                  <li>Circuit diagram showing how it's built using universal gates</li>
                  <li>Truth table describing the gate's logical behavior</li>
                  <li>Interactive tester where you can toggle inputs and see the output change</li>
                </ul>
              </li>
              <li>Click on the input switches (0/1) to change their values and observe how the output changes</li>
              <li>Compare the implementations to understand the differences between NAND and NOR approaches</li>
            </ol>
          </div>
        </motion.section>
        
        {/* Gate Implementation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="nand">
            <TabsList className="border-b border-gray-200 w-full mb-6">
              <TabsTrigger 
                value="nand"
                className="py-4 px-6 font-medium data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Using NAND Gates
              </TabsTrigger>
              <TabsTrigger 
                value="nor"
                className="py-4 px-6 font-medium data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Using NOR Gates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nand">
              <NandImplementations />
            </TabsContent>

            <TabsContent value="nor">
              <NorImplementations />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Additional Information */}
        <motion.section 
          className="mt-12 bg-white rounded-lg shadow-sm p-6 border border-slate-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Understanding Universal Gates</h2>
          <div className="prose max-w-none">
            <p>
              Universal gates like NAND and NOR are fundamental building blocks in digital electronics.
              Their ability to implement any Boolean function makes them extremely versatile and important
              in circuit design.
            </p>
            <p className="mt-2">
              In practical applications, this universality means that manufacturers can standardize on a 
              single gate type, simplifying the manufacturing process and reducing costs. NAND gates are 
              particularly common in CMOS technology due to their efficient implementation.
            </p>
            <p className="mt-2">
              The experiments shown here demonstrate the theoretical foundation of universal gates.
              For more detailed understanding:
            </p>
            <ul className="mt-2">
              <li>Review the <a href="/theory" className="text-blue-600 hover:underline">Theory section</a> for more in-depth explanations</li>
              <li>Try building your own circuits in the <a href="/game" className="text-blue-600 hover:underline">Game section</a></li>
              <li>Examine the truth tables carefully to understand the logical relationships</li>
            </ul>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
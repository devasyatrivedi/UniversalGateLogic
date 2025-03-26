import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NandImplementations from '@/components/gates/NandImplementations';
import NorImplementations from '@/components/gates/NorImplementations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Implementation of Basic Gates Using Universal Gates</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="mb-4">Universal gates are logic gates that can be used to implement any Boolean function. The two types of universal gates are:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">NAND Gate</h3>
                <p>NAND gate is a combination of an AND gate followed by a NOT gate. It produces a low output only when all inputs are high.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">NOR Gate</h3>
                <p>NOR gate is a combination of an OR gate followed by a NOT gate. It produces a high output only when all inputs are low.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gate Implementation Tabs */}
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
      </main>

      <Footer />
    </div>
  );
}

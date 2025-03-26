import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

export default function Theory() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Digital Logic Theory</h1>
          <p className="text-lg text-slate-600 mb-8">
            Learn the fundamental concepts behind digital logic and universal gates
          </p>
        </motion.div>
        
        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="universal">Universal Gates</TabsTrigger>
            <TabsTrigger value="implementation">Implementations</TabsTrigger>
          </TabsList>
          
          {/* Basics Tab */}
          <TabsContent value="basics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-700">Digital Logic Basics</h2>
                  
                  <div className="prose max-w-none">
                    <p>
                      Digital logic is the foundation of computer hardware and digital electronics, using binary values (0 and 1)
                      to represent and manipulate information. In digital circuits, these binary values typically correspond to voltage
                      levels: high voltage for 1 (true) and low voltage for 0 (false).
                    </p>
                    
                    <h3>Basic Logic Gates</h3>
                    <p>
                      Logic gates are the basic building blocks of digital circuits. They implement Boolean functions,
                      performing logical operations on one or more inputs to produce a single output based on specific rules.
                      Here are the fundamental logic gates:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 my-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">AND Gate</h4>
                        <p className="text-sm">Produces a high output (1) only when all inputs are high.</p>
                        <div className="bg-white p-3 rounded mt-2 text-sm">
                          <p className="font-mono">0 AND 0 = 0</p>
                          <p className="font-mono">0 AND 1 = 0</p>
                          <p className="font-mono">1 AND 0 = 0</p>
                          <p className="font-mono">1 AND 1 = 1</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">OR Gate</h4>
                        <p className="text-sm">Produces a high output (1) when any input is high.</p>
                        <div className="bg-white p-3 rounded mt-2 text-sm">
                          <p className="font-mono">0 OR 0 = 0</p>
                          <p className="font-mono">0 OR 1 = 1</p>
                          <p className="font-mono">1 OR 0 = 1</p>
                          <p className="font-mono">1 OR 1 = 1</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">NOT Gate</h4>
                        <p className="text-sm">Inverts the input: changes 1 to 0 and 0 to 1.</p>
                        <div className="bg-white p-3 rounded mt-2 text-sm">
                          <p className="font-mono">NOT 0 = 1</p>
                          <p className="font-mono">NOT 1 = 0</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">XOR Gate</h4>
                        <p className="text-sm">Produces a high output (1) when inputs are different.</p>
                        <div className="bg-white p-3 rounded mt-2 text-sm">
                          <p className="font-mono">0 XOR 0 = 0</p>
                          <p className="font-mono">0 XOR 1 = 1</p>
                          <p className="font-mono">1 XOR 0 = 1</p>
                          <p className="font-mono">1 XOR 1 = 0</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3>Boolean Algebra</h3>
                    <p>
                      Digital logic is governed by Boolean algebra, a mathematical system dealing with binary variables and logic operations.
                      Key principles include:
                    </p>
                    <ul>
                      <li>Variables can only have two values: true(1) or false(0)</li>
                      <li>Operations include AND (conjunction), OR (disjunction), and NOT (negation)</li>
                      <li>Boolean expressions can be simplified using algebraic rules and properties</li>
                      <li>Truth tables provide a complete description of a function's behavior</li>
                    </ul>
                    
                    <h3>Combinational vs. Sequential Logic</h3>
                    <p>
                      <strong>Combinational logic</strong> circuits produce outputs based solely on the current inputs, with no memory of past states.
                      Examples include adders, multiplexers, and decoders.
                    </p>
                    <p>
                      <strong>Sequential logic</strong> circuits have memory elements and produce outputs based on both current inputs and past states.
                      Examples include flip-flops, registers, and counters.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Universal Gates Tab */}
          <TabsContent value="universal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Universal Gates</h2>
                  
                  <div className="prose max-w-none">
                    <p>
                      Universal gates are special logic gates that can be used to implement any Boolean function. This means 
                      that with enough of a single type of universal gate, you can build any digital circuit, no matter how complex.
                    </p>
                    
                    <h3>NAND Gate: The Universal Builder</h3>
                    <p>
                      The NAND gate (NOT-AND) is one of the most important universal gates. It produces a low output (0) only when all inputs are high (1).
                      The NAND operation is equivalent to an AND operation followed by a NOT operation.
                    </p>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg my-4">
                      <h4 className="font-semibold mb-2">NAND Truth Table (2 inputs)</h4>
                      <div className="bg-white p-3 rounded mt-2 text-sm">
                        <p className="font-mono">0 NAND 0 = 1</p>
                        <p className="font-mono">0 NAND 1 = 1</p>
                        <p className="font-mono">1 NAND 0 = 1</p>
                        <p className="font-mono">1 NAND 1 = 0</p>
                      </div>
                    </div>
                    
                    <p>
                      The NAND gate's universality comes from its ability to implement the three basic logic operations:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 my-4">
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">NOT using NAND</h5>
                        <p className="text-xs mt-1">Connect both inputs of a NAND gate together:</p>
                        <p className="font-mono text-xs mt-1">NOT(A) = A NAND A</p>
                      </div>
                      
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">AND using NAND</h5>
                        <p className="text-xs mt-1">NAND followed by NOT (another NAND):</p>
                        <p className="font-mono text-xs mt-1">A AND B = NOT(A NAND B)</p>
                      </div>
                      
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">OR using NAND</h5>
                        <p className="text-xs mt-1">Apply NOT to each input, then NAND:</p>
                        <p className="font-mono text-xs mt-1">A OR B = (NOT A) NAND (NOT B)</p>
                      </div>
                    </div>
                    
                    <h3>NOR Gate: Another Universal Option</h3>
                    <p>
                      The NOR gate (NOT-OR) is the other universal gate. It produces a high output (1) only when all inputs are low (0).
                      The NOR operation is equivalent to an OR operation followed by a NOT operation.
                    </p>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg my-4">
                      <h4 className="font-semibold mb-2">NOR Truth Table (2 inputs)</h4>
                      <div className="bg-white p-3 rounded mt-2 text-sm">
                        <p className="font-mono">0 NOR 0 = 1</p>
                        <p className="font-mono">0 NOR 1 = 0</p>
                        <p className="font-mono">1 NOR 0 = 0</p>
                        <p className="font-mono">1 NOR 1 = 0</p>
                      </div>
                    </div>
                    
                    <p>
                      Similar to NAND gates, NOR gates can implement the three basic logic operations:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 my-4">
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">NOT using NOR</h5>
                        <p className="text-xs mt-1">Connect both inputs of a NOR gate together:</p>
                        <p className="font-mono text-xs mt-1">NOT(A) = A NOR A</p>
                      </div>
                      
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">OR using NOR</h5>
                        <p className="text-xs mt-1">NOR followed by NOT (another NOR):</p>
                        <p className="font-mono text-xs mt-1">A OR B = NOT(A NOR B)</p>
                      </div>
                      
                      <div className="bg-indigo-50 p-3 rounded">
                        <h5 className="font-semibold text-sm">AND using NOR</h5>
                        <p className="text-xs mt-1">Apply NOT to each input, then NOR:</p>
                        <p className="font-mono text-xs mt-1">A AND B = (NOT A) NOR (NOT B)</p>
                      </div>
                    </div>
                    
                    <h3>Why Universal Gates Matter</h3>
                    <p>
                      Universal gates are crucial in digital circuit design for several reasons:
                    </p>
                    <ul>
                      <li><strong>Simplification</strong>: Circuit manufacturing becomes simpler when only one type of gate is needed.</li>
                      <li><strong>Standardization</strong>: Allows for standardized design practices and components.</li>
                      <li><strong>Efficiency</strong>: In some technologies, NAND or NOR gates are more efficient to implement than other gates.</li>
                      <li><strong>Fault tolerance</strong>: Simplifies testing and redundancy designs.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Implementations Tab */}
          <TabsContent value="implementation">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 text-green-700">Gate Implementations</h2>
                  
                  <div className="prose max-w-none">
                    <p>
                      The beauty of universal gates lies in their versatility. Using only NAND or only NOR gates, 
                      we can implement all other logic functions. Here's how each basic gate can be constructed:
                    </p>
                    
                    <h3>Using NAND Gates</h3>
                    
                    <div className="space-y-6 my-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">NOT Gate using NAND</h4>
                        <p className="text-sm mb-2">
                          The simplest implementation - connect both inputs of a NAND gate together.
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: Connect A to both NAND inputs</p>
                          <p className="font-mono mt-2">NOT(A) = A NAND A</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">AND Gate using NAND</h4>
                        <p className="text-sm mb-2">
                          An AND gate is created by passing the output of a NAND gate through a NOT gate (which is also implemented with a NAND).
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: A NAND B, followed by NOT (a second NAND with both inputs connected)</p>
                          <p className="font-mono mt-2">A AND B = NOT(A NAND B) = (A NAND B) NAND (A NAND B)</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">OR Gate using NAND</h4>
                        <p className="text-sm mb-2">
                          An OR gate requires NOTing each input and then NANDing the results (De Morgan's laws).
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: NOT A (NAND), NOT B (NAND), then NAND these results</p>
                          <p className="font-mono mt-2">A OR B = (NOT A) NAND (NOT B) = (A NAND A) NAND (B NAND B)</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">XOR Gate using NAND</h4>
                        <p className="text-sm mb-2">
                          XOR is more complex, requiring multiple NAND gates in a specific arrangement.
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: A network of 4 NAND gates</p>
                          <p className="font-mono mt-2">A XOR B = (A NAND (A NAND B)) NAND (B NAND (A NAND B))</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3>Using NOR Gates</h3>
                    
                    <div className="space-y-6 my-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">NOT Gate using NOR</h4>
                        <p className="text-sm mb-2">
                          Similar to NAND, connect both inputs of a NOR gate together.
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: Connect A to both NOR inputs</p>
                          <p className="font-mono mt-2">NOT(A) = A NOR A</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">OR Gate using NOR</h4>
                        <p className="text-sm mb-2">
                          An OR gate is created by passing the output of a NOR gate through a NOT gate (which is also implemented with a NOR).
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: A NOR B, followed by NOT (a second NOR with both inputs connected)</p>
                          <p className="font-mono mt-2">A OR B = NOT(A NOR B) = (A NOR B) NOR (A NOR B)</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">AND Gate using NOR</h4>
                        <p className="text-sm mb-2">
                          An AND gate requires NOTing each input and then NORing the results (De Morgan's laws).
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: NOT A (NOR), NOT B (NOR), then NOR these results</p>
                          <p className="font-mono mt-2">A AND B = (NOT A) NOR (NOT B) = (A NOR A) NOR (B NOR B)</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">XOR Gate using NOR</h4>
                        <p className="text-sm mb-2">
                          XOR implementation with NOR gates also requires multiple gates.
                        </p>
                        <div className="bg-white p-3 rounded text-sm">
                          <p>Implementation: A network of 5 NOR gates</p>
                          <p className="font-mono mt-2">A XOR B = ((A NOR A) NOR (B NOR B)) NOR ((A NOR B) NOR (A NOR B))</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3>Practical Applications</h3>
                    <p>
                      These implementations are more than theoretical exercises. They're used in real-world digital circuit design:
                    </p>
                    <ul>
                      <li>In integrated circuit design, manufacturers often standardize on a single gate type for efficiency</li>
                      <li>NAND gates are particularly prevalent in CMOS technology due to their efficient implementation</li>
                      <li>Understanding gate equivalence helps in circuit optimization and troubleshooting</li>
                      <li>These principles extend to complex digital systems like processors, memory, and communication circuits</li>
                    </ul>
                    
                    <p>
                      To see these implementations in action, visit our <a href="/experiments" className="text-blue-600 hover:underline">Experiments</a> section,
                      where you can interact with virtual circuits built using universal gates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
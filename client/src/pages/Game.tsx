import React, { useState, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Trash2, Play, Save, RotateCw, Plus, Info } from 'lucide-react';

// Define types for gate nodes and connections
type GateNode = {
  id: string;
  type: 'NAND' | 'NOR' | 'INPUT' | 'OUTPUT';
  x: number;
  y: number;
  inputs: string[];
  value?: 0 | 1;
  label?: string;
};

type Connection = {
  id: string;
  from: string;
  to: string;
  toInput: number;
};

export default function Game() {
  const [activeTab, setActiveTab] = useState('nand');
  const [nodes, setNodes] = useState<GateNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [targetFunction, setTargetFunction] = useState('AND');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [draggedGate, setDraggedGate] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<{fromNode: string, fromEl: HTMLElement} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Generate unique IDs
  const generateId = useCallback(() => {
    return Math.random().toString(36).substring(2, 9);
  }, []);

  // Handle adding a new gate
  const handleAddGate = (type: 'NAND' | 'NOR' | 'INPUT' | 'OUTPUT') => {
    const defaultPosition = {
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50
    };

    const newGate: GateNode = {
      id: generateId(),
      type,
      x: defaultPosition.x,
      y: defaultPosition.y,
      inputs: [],
      label: type === 'INPUT' ? 'A' : type === 'OUTPUT' ? 'OUT' : undefined
    };

    setNodes(prev => [...prev, newGate]);
  };

  // Start dragging a gate
  const startDrag = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedGate(nodeId);
  };

  // Handle dragging a gate
  const handleDrag = (e: React.MouseEvent) => {
    if (!draggedGate || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    setNodes(prev => prev.map(node => 
      node.id === draggedGate 
        ? { ...node, x, y } 
        : node
    ));
  };

  // Handle dropping a gate
  const handleDrop = () => {
    setDraggedGate(null);
  };

  // Start creating a connection
  const startConnection = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!connecting) {
      setConnecting({
        fromNode: nodeId,
        fromEl: e.currentTarget as HTMLElement
      });
    } else {
      // Complete the connection
      const toNode = nodes.find(n => n.id === nodeId);
      const fromNode = nodes.find(n => n.id === connecting.fromNode);
      
      if (toNode && fromNode && toNode.id !== fromNode.id) {
        // Ensure we're connecting from an output to an input
        if (fromNode.type !== 'OUTPUT' && toNode.type !== 'INPUT') {
          // Find next available input slot
          const inputIndex = toNode.inputs.length;
          
          const newConnection: Connection = {
            id: generateId(),
            from: connecting.fromNode,
            to: nodeId,
            toInput: inputIndex
          };
          
          setConnections(prev => [...prev, newConnection]);
          
          // Update the input slots for the target node
          setNodes(prev => prev.map(n => 
            n.id === nodeId 
              ? { ...n, inputs: [...n.inputs, connecting.fromNode] } 
              : n
          ));
        }
      }
      
      setConnecting(null);
    }
  };

  // Cancel connection
  const cancelConnection = (e: React.MouseEvent) => {
    if (connecting) {
      e.preventDefault();
      e.stopPropagation();
      setConnecting(null);
    }
  };

  // Delete a gate
  const deleteNode = (nodeId: string) => {
    // Remove connections to/from this node
    setConnections(prev => prev.filter(
      conn => conn.from !== nodeId && conn.to !== nodeId
    ));
    
    // Remove node
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    
    // Update inputs in other nodes
    setNodes(prev => prev.map(node => ({
      ...node,
      inputs: node.inputs.filter(inputId => inputId !== nodeId)
    })));
  };

  // Delete a connection
  const deleteConnection = (connectionId: string) => {
    const conn = connections.find(c => c.id === connectionId);
    
    if (conn) {
      // Remove connection
      setConnections(prev => prev.filter(c => c.id !== connectionId));
      
      // Update inputs in the target node
      setNodes(prev => prev.map(node => {
        if (node.id === conn.to) {
          return {
            ...node,
            inputs: node.inputs.filter(input => input !== conn.from)
          };
        }
        return node;
      }));
    }
  };
  
  // Run simulation (evaluate the circuit)
  const runSimulation = () => {
    setSimulationRunning(true);
    
    try {
      // Reset all values first
      let updatedNodes = nodes.map(node => ({ ...node, value: undefined }));
      
      // Set input values (0 or 1)
      updatedNodes = updatedNodes.map(node => {
        if (node.type === 'INPUT') {
          // Type assertion to handle the type correctly
          return { ...node, value: Math.round(Math.random()) as 0 | 1 };
        }
        return node;
      });
      
      // Evaluate the circuit (simplified)
      let evaluationComplete = false;
      let iterations = 0;
      const maxIterations = 100; // Prevent infinite loops
      
      while (!evaluationComplete && iterations < maxIterations) {
        evaluationComplete = true;
        iterations++;
        
        for (const node of updatedNodes) {
          if (node.type === 'INPUT') continue; // Inputs already have values
          
          // Get input values
          const inputValues = node.inputs.map(inputId => {
            const inputNode = updatedNodes.find(n => n.id === inputId);
            return inputNode?.value;
          });
          
          // Skip if any input doesn't have a value yet
          if (inputValues.some(v => v === undefined)) {
            evaluationComplete = false;
            continue;
          }
          
          // Calculate gate output
          if (node.type === 'NAND') {
            // NAND gate: Output is 0 only if all inputs are 1
            const allInputsHigh = inputValues.every(v => v === 1);
            // Type assertion to handle the type correctly
            node.value = (allInputsHigh ? 0 : 1) as 0 | 1;
          } else if (node.type === 'NOR') {
            // NOR gate: Output is 1 only if all inputs are 0
            const allInputsLow = inputValues.every(v => v === 0);
            // Type assertion to handle the type correctly
            node.value = (allInputsLow ? 1 : 0) as 0 | 1;
          } else if (node.type === 'OUTPUT') {
            // Output node just passes through its input
            // Only assign if the value is not undefined
            const inputValue = inputValues[0];
            if (inputValue !== undefined) {
              node.value = inputValue as 0 | 1;
            }
          }
        }
      }
      
      if (iterations >= maxIterations) {
        toast({
          title: "Simulation Error",
          description: "Circuit may have loops or is too complex to evaluate.",
          variant: "destructive",
        });
        setSimulationRunning(false);
        return;
      }
      
      // Update nodes with calculated values
      setNodes(updatedNodes);
      
      // Check if the circuit implements the target function
      const inputNodes = updatedNodes.filter(n => n.type === 'INPUT');
      const outputNode = updatedNodes.find(n => n.type === 'OUTPUT');
      
      if (inputNodes.length === 2 && outputNode?.value !== undefined) {
        const inputA = inputNodes[0].value;
        const inputB = inputNodes[1].value;
        const output = outputNode.value;
        
        let expectedOutput;
        if (targetFunction === 'AND') {
          expectedOutput = (inputA === 1 && inputB === 1) ? 1 : 0;
        } else if (targetFunction === 'OR') {
          expectedOutput = (inputA === 1 || inputB === 1) ? 1 : 0;
        } else if (targetFunction === 'XOR') {
          expectedOutput = (inputA !== inputB) ? 1 : 0;
        } else if (targetFunction === 'NOT') {
          expectedOutput = (inputA === 1) ? 0 : 1;
        }
        
        if (output === expectedOutput) {
          toast({
            title: "Success!",
            description: `Your circuit correctly implements the ${targetFunction} function!`,
            variant: "default",
          });
        } else {
          toast({
            title: "Not quite right",
            description: `Your circuit doesn't implement the ${targetFunction} function correctly.`,
            variant: "default",
          });
        }
      }
    } catch (error) {
      console.error('Simulation error:', error);
      toast({
        title: "Simulation Error",
        description: "Something went wrong during the simulation.",
        variant: "destructive",
      });
    }
    
    setSimulationRunning(false);
  };
  
  // Reset the circuit
  const resetCircuit = () => {
    setNodes([]);
    setConnections([]);
    setSimulationRunning(false);
  };
  
  // Save circuit (simplified - just a success toast)
  const saveCircuit = () => {
    toast({
      title: "Circuit Saved",
      description: "Your circuit has been saved successfully.",
      variant: "default",
    });
  };

  // Render gates
  const renderGate = (node: GateNode) => {
    const isDragging = draggedGate === node.id;
    
    let gateColor = "bg-gray-200";
    let textColor = "text-gray-700";
    
    switch (node.type) {
      case 'NAND':
        gateColor = "bg-blue-100";
        textColor = "text-blue-700";
        break;
      case 'NOR':
        gateColor = "bg-purple-100";
        textColor = "text-purple-700";
        break;
      case 'INPUT':
        gateColor = "bg-green-100";
        textColor = "text-green-700";
        break;
      case 'OUTPUT':
        gateColor = "bg-amber-100";
        textColor = "text-amber-700";
        break;
    }
    
    return (
      <div
        key={node.id}
        className={`absolute rounded-md p-2 ${gateColor} ${textColor} font-semibold shadow-sm 
                   ${isDragging ? 'cursor-grabbing shadow-md z-20' : 'cursor-grab z-10'}`}
        style={{ 
          left: `${node.x}px`, 
          top: `${node.y}px`,
          minWidth: '60px',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        onMouseDown={(e) => startDrag(e, node.id)}
      >
        <div className="flex items-center justify-between w-full">
          {node.type}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
        
        {node.value !== undefined && (
          <div className={`mt-1 p-1 rounded-full w-6 h-6 flex items-center justify-center 
                          ${node.value === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {node.value}
          </div>
        )}
        
        {/* Connection points */}
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
          <div
            className="w-4 h-4 rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer"
            onClick={(e) => startConnection(e, node.id)}
          />
        </div>
        
        {/* Input connection points - only for NAND/NOR/OUTPUT gates */}
        {(node.type === 'NAND' || node.type === 'NOR' || node.type === 'OUTPUT') && (
          <div className="absolute left-0 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className={`w-3 h-3 rounded-full ${
                node.inputs[0] ? 'bg-green-400' : 'bg-gray-300'
              } cursor-pointer`}
              onClick={(e) => startConnection(e, node.id)}
            />
          </div>
        )}
        
        {/* Second input for NAND/NOR gates */}
        {(node.type === 'NAND' || node.type === 'NOR') && (
          <div className="absolute left-0 bottom-1/3 transform -translate-x-1/2 translate-y-1/2">
            <div
              className={`w-3 h-3 rounded-full ${
                node.inputs[1] ? 'bg-green-400' : 'bg-gray-300'
              } cursor-pointer`}
              onClick={(e) => startConnection(e, node.id)}
            />
          </div>
        )}
      </div>
    );
  };
  
  // Render connections between gates
  const renderConnections = () => {
    return connections.map(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      if (!fromNode || !toNode) return null;
      
      // Calculate connection points
      const fromX = fromNode.x + 60; // Right side of the from node
      const fromY = fromNode.y + 20; // Center of the from node
      
      let toX = toNode.x; // Left side of the to node
      let toY = toNode.y + 20; // Default to center
      
      // Adjust for input position (top or bottom input)
      if (conn.toInput === 1 && (toNode.type === 'NAND' || toNode.type === 'NOR')) {
        toY = toNode.y + 30; // Bottom input
      } else {
        toY = toNode.y + 10; // Top input
      }
      
      // Create a path for the connection
      const path = `M ${fromX} ${fromY} C ${fromX + 30} ${fromY}, ${toX - 30} ${toY}, ${toX} ${toY}`;
      
      return (
        <g key={conn.id} className="connection">
          <path
            d={path}
            fill="none"
            stroke="#888"
            strokeWidth="2"
            className="cursor-pointer hover:stroke-red-500"
            onClick={() => deleteConnection(conn.id)}
          />
        </g>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Logic Gate Game</h1>
          <p className="text-lg text-slate-600 mb-8">
            Build digital circuits using only universal gates to implement specific functions
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left sidebar: Controls */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">Circuit Builder</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Select Gate Type</h3>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="nand">NAND</TabsTrigger>
                        <TabsTrigger value="nor">NOR</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Add Components</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAddGate(activeTab === 'nand' ? 'NAND' : 'NOR')}
                      >
                        <Plus size={16} className="mr-2" />
                        {activeTab === 'nand' ? 'NAND Gate' : 'NOR Gate'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAddGate('INPUT')}
                      >
                        <Plus size={16} className="mr-2" />
                        Input
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleAddGate('OUTPUT')}
                      >
                        <Plus size={16} className="mr-2" />
                        Output
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Target Function</h3>
                    <Select
                      value={targetFunction}
                      onValueChange={setTargetFunction}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select function" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                        <SelectItem value="XOR">XOR</SelectItem>
                        <SelectItem value="NOT">NOT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={runSimulation}
                      disabled={simulationRunning}
                    >
                      <Play size={16} className="mr-2" />
                      Run Simulation
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={resetCircuit}
                      >
                        <RotateCw size={16} className="mr-2" />
                        Reset
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={saveCircuit}
                      >
                        <Save size={16} className="mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Info size={18} className="text-blue-500" />
                    <h3 className="text-md font-medium">How to Play</h3>
                  </div>
                  
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                    <li>Choose a gate type (NAND or NOR) to work with</li>
                    <li>Add gates, inputs, and an output to the canvas</li>
                    <li>Connect gates by clicking on connection points</li>
                    <li>Select a target function to implement</li>
                    <li>Run the simulation to test your design</li>
                    <li>The goal is to implement the selected function using only NAND or only NOR gates</li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* Main canvas area */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-[600px] relative overflow-hidden">
              <CardContent className="h-full p-0">
                <div 
                  ref={canvasRef}
                  className="relative w-full h-full bg-gray-50 cursor-default"
                  onMouseMove={handleDrag}
                  onMouseUp={handleDrop}
                  onClick={cancelConnection}
                >
                  {/* SVG for connections */}
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {renderConnections()}
                    
                    {/* Temporary connection when connecting */}
                    {connecting && canvasRef.current && (
                      <path
                        d={`M ${connecting.fromEl.getBoundingClientRect().right - 
                            canvasRef.current.getBoundingClientRect().left} 
                            ${connecting.fromEl.getBoundingClientRect().top + 
                              connecting.fromEl.getBoundingClientRect().height / 2 - 
                              canvasRef.current.getBoundingClientRect().top} 
                            L ${Math.min(
                                window.innerWidth - 20, 
                                Math.max(20, 0)
                              )} 
                              ${Math.min(
                                window.innerHeight - 20, 
                                Math.max(20, 0)
                              )}`}
                        stroke="#888"
                        strokeDasharray="5,5"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                  </svg>
                  
                  {/* Render gates */}
                  {nodes.map(renderGate)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
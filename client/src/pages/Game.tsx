import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { computeGateOutput } from '@/lib/gateLogic';
import { motion } from 'framer-motion';

// Game component types
type GateNode = {
  id: string;
  type: 'NAND' | 'NOR' | 'INPUT' | 'OUTPUT';
  x: number;
  y: number;
  inputs: string[];
  value?: number;
  label?: string;
};

type Connection = {
  id: string;
  from: string;
  to: string;
  toInput: number;
};

const Game: React.FC = () => {
  const [universalGate, setUniversalGate] = useState<'NAND' | 'NOR'>('NAND');
  const [nodes, setNodes] = useState<GateNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [targetGate, setTargetGate] = useState<'AND' | 'OR' | 'NOT' | 'XOR' | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Initialize input nodes
  useEffect(() => {
    resetGame(currentLevel);
  }, [currentLevel, universalGate]);
  
  const resetGame = (level: number) => {
    // Reset the game state
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    setConnectingFrom(null);
    setGameCompleted(false);
    
    // Set the target gate based on level
    if (level === 1) {
      setTargetGate('NOT');
      // Add initial input node
      const initialNodes = [
        { id: 'input1', type: 'INPUT', x: 50, y: 150, inputs: [], value: 0, label: 'A' },
        { id: 'output1', type: 'OUTPUT', x: 550, y: 150, inputs: [], value: undefined, label: 'Y' }
      ];
      setNodes(initialNodes);
    } else if (level === 2) {
      setTargetGate('AND');
      // Add two input nodes and one output
      const initialNodes = [
        { id: 'input1', type: 'INPUT', x: 50, y: 100, inputs: [], value: 0, label: 'A' },
        { id: 'input2', type: 'INPUT', x: 50, y: 200, inputs: [], value: 0, label: 'B' },
        { id: 'output1', type: 'OUTPUT', x: 550, y: 150, inputs: [], value: undefined, label: 'Y' }
      ];
      setNodes(initialNodes);
    } else if (level === 3) {
      setTargetGate('OR');
      // Add two input nodes and one output
      const initialNodes = [
        { id: 'input1', type: 'INPUT', x: 50, y: 100, inputs: [], value: 0, label: 'A' },
        { id: 'input2', type: 'INPUT', x: 50, y: 200, inputs: [], value: 0, label: 'B' },
        { id: 'output1', type: 'OUTPUT', x: 550, y: 150, inputs: [], value: undefined, label: 'Y' }
      ];
      setNodes(initialNodes);
    } else if (level === 4) {
      setTargetGate('XOR');
      // Add two input nodes and one output
      const initialNodes = [
        { id: 'input1', type: 'INPUT', x: 50, y: 100, inputs: [], value: 0, label: 'A' },
        { id: 'input2', type: 'INPUT', x: 50, y: 200, inputs: [], value: 0, label: 'B' },
        { id: 'output1', type: 'OUTPUT', x: 550, y: 150, inputs: [], value: undefined, label: 'Y' }
      ];
      setNodes(initialNodes);
    }
  };
  
  const addGate = (x: number, y: number) => {
    const newId = `gate${nodes.filter(n => n.type !== 'INPUT' && n.type !== 'OUTPUT').length + 1}`;
    const newGate: GateNode = {
      id: newId,
      type: universalGate,
      x,
      y,
      inputs: [],
    };
    
    setNodes([...nodes, newGate]);
    setSelectedNode(newId);
  };
  
  const toggleInput = (id: string) => {
    setNodes(nodes.map(node => 
      node.id === id && node.type === 'INPUT' 
        ? { ...node, value: node.value === 0 ? 1 : 0 } 
        : node
    ));
    
    // Evaluate the circuit after toggling input
    evaluateCircuit();
  };
  
  const startConnection = (nodeId: string) => {
    setConnectingFrom(nodeId);
  };
  
  const completeConnection = (toNodeId: string, inputIndex: number = 0) => {
    if (!connectingFrom || connectingFrom === toNodeId) return;
    
    // Check if the connection already exists
    const connectionExists = connections.some(
      conn => conn.from === connectingFrom && conn.to === toNodeId && conn.toInput === inputIndex
    );
    
    if (!connectionExists) {
      const newConnection: Connection = {
        id: `conn_${connectingFrom}_to_${toNodeId}_${inputIndex}`,
        from: connectingFrom,
        to: toNodeId,
        toInput: inputIndex
      };
      
      // Update the inputs array of the target node
      setNodes(
        nodes.map(node => 
          node.id === toNodeId 
            ? { ...node, inputs: [...node.inputs, connectingFrom] } 
            : node
        )
      );
      
      setConnections([...connections, newConnection]);
      evaluateCircuit();
    }
    
    setConnectingFrom(null);
  };
  
  const selectNode = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };
  
  const moveNode = (nodeId: string, x: number, y: number) => {
    setNodes(
      nodes.map(node => 
        node.id === nodeId 
          ? { ...node, x, y } 
          : node
      )
    );
  };
  
  const deleteNode = (nodeId: string) => {
    // Don't allow deleting input or output nodes
    if (nodes.find(n => n.id === nodeId)?.type === 'INPUT' || 
        nodes.find(n => n.id === nodeId)?.type === 'OUTPUT') {
      return;
    }
    
    // Remove all connections to/from this node
    const newConnections = connections.filter(
      conn => conn.from !== nodeId && conn.to !== nodeId
    );
    
    // Remove the node from other nodes' inputs
    const newNodes = nodes
      .filter(node => node.id !== nodeId)
      .map(node => ({
        ...node,
        inputs: node.inputs.filter(input => input !== nodeId)
      }));
    
    setConnections(newConnections);
    setNodes(newNodes);
    setSelectedNode(null);
    
    evaluateCircuit();
  };
  
  const evaluateCircuit = () => {
    // Clone nodes to avoid direct state mutation
    let evaluatedNodes = [...nodes];
    let outputNode = evaluatedNodes.find(n => n.type === 'OUTPUT');
    
    // Skip evaluation if we don't have an output node yet
    if (!outputNode) return;
    
    // Create a map for faster node lookup
    const nodeMap = new Map(evaluatedNodes.map(node => [node.id, node]));
    
    // Evaluate all gates
    const evaluateNode = (nodeId: string): number => {
      const node = nodeMap.get(nodeId);
      
      if (!node) return 0;
      
      // Input nodes already have a value
      if (node.type === 'INPUT') return node.value || 0;
      
      // For gate nodes, evaluate their inputs
      if (node.type === 'NAND' || node.type === 'NOR') {
        // If a gate has no inputs, default to 0
        if (node.inputs.length === 0) return 0;
        
        // If a gate has one input, connect it to both inputs (effectively making a NOT gate)
        if (node.inputs.length === 1) {
          const inputValue = evaluateNode(node.inputs[0]);
          const output = computeGateOutput(
            node.type,
            { a: inputValue, b: inputValue }
          );
          return output;
        }
        
        // For gates with multiple inputs, take the first two
        // (simplifying for this game implementation)
        const inputA = evaluateNode(node.inputs[0]);
        const inputB = node.inputs.length > 1 ? evaluateNode(node.inputs[1]) : inputA;
        
        const output = computeGateOutput(
          node.type,
          { a: inputA, b: inputB }
        );
        
        return output;
      }
      
      // For output nodes, evaluate their first input (if any)
      if (node.type === 'OUTPUT') {
        if (node.inputs.length === 0) return 0;
        return evaluateNode(node.inputs[0]);
      }
      
      return 0;
    };
    
    // Update output node value
    const outputValue = evaluateNode('output1');
    
    // Update the nodes with evaluated values
    evaluatedNodes = evaluatedNodes.map(node => 
      node.id === 'output1' ? { ...node, value: outputValue } : node
    );
    
    setNodes(evaluatedNodes);
    
    // Check if the target function is correctly implemented
    checkCircuitCorrectness();
  };
  
  const checkCircuitCorrectness = () => {
    if (!targetGate) return;
    
    // Get input and output nodes
    const inputNodes = nodes.filter(n => n.type === 'INPUT');
    const outputNode = nodes.find(n => n.type === 'OUTPUT');
    
    if (!outputNode || inputNodes.length === 0) return;
    
    // For simplicity, we'll check against a truth table for each target gate
    let allCombinationsCorrect = true;
    
    if (targetGate === 'NOT') {
      // For NOT gate, test both input combinations
      const testCases = [
        { inputs: [0], expected: 1 },
        { inputs: [1], expected: 0 }
      ];
      
      for (const testCase of testCases) {
        // Set input values
        const tempNodes = nodes.map((node, i) => 
          node.type === 'INPUT' 
            ? { ...node, value: testCase.inputs[0] } 
            : node
        );
        
        // Run a temporary evaluation with these inputs
        let nodeMap = new Map(tempNodes.map(node => [node.id, node]));
        const evalNode = (id: string): number => {
          const node = nodeMap.get(id);
          if (!node) return 0;
          if (node.type === 'INPUT') return node.value !== undefined ? node.value : 0;
          if (node.inputs.length === 0) return 0;
          
          if (node.type === 'NAND' || node.type === 'NOR') {
            if (node.inputs.length === 1) {
              const inputValue = evalNode(node.inputs[0]);
              return computeGateOutput(node.type, { a: inputValue, b: inputValue });
            }
            
            const inputA = evalNode(node.inputs[0]);
            const inputB = node.inputs.length > 1 ? evalNode(node.inputs[1]) : inputA;
            return computeGateOutput(node.type, { a: inputA, b: inputB });
          }
          
          if (node.type === 'OUTPUT') {
            return node.inputs.length > 0 ? evalNode(node.inputs[0]) : 0;
          }
          
          return 0;
        };
        
        const actualOutput = evalNode('output1');
        
        if (actualOutput !== testCase.expected) {
          allCombinationsCorrect = false;
          break;
        }
      }
    } else if (targetGate === 'AND' || targetGate === 'OR' || targetGate === 'XOR') {
      // For 2-input gates, test all 4 combinations
      const testCases = [
        { inputs: [0, 0], expected: targetGate === 'AND' ? 0 : (targetGate === 'OR' ? 0 : 0) },
        { inputs: [0, 1], expected: targetGate === 'AND' ? 0 : (targetGate === 'OR' ? 1 : 1) },
        { inputs: [1, 0], expected: targetGate === 'AND' ? 0 : (targetGate === 'OR' ? 1 : 1) },
        { inputs: [1, 1], expected: targetGate === 'AND' ? 1 : (targetGate === 'OR' ? 1 : 0) }
      ];
      
      for (const testCase of testCases) {
        // Set input values
        const tempNodes = nodes.map((node, i) => {
          if (node.type === 'INPUT') {
            const index = inputNodes.findIndex(n => n.id === node.id);
            return { ...node, value: testCase.inputs[index] };
          }
          return node;
        });
        
        // Run a temporary evaluation with these inputs
        let nodeMap = new Map(tempNodes.map(node => [node.id, node]));
        const evalNode = (id: string): number => {
          const node = nodeMap.get(id);
          if (!node) return 0;
          if (node.type === 'INPUT') return node.value !== undefined ? node.value : 0;
          if (node.inputs.length === 0) return 0;
          
          if (node.type === 'NAND' || node.type === 'NOR') {
            if (node.inputs.length === 1) {
              const inputValue = evalNode(node.inputs[0]);
              return computeGateOutput(node.type, { a: inputValue, b: inputValue });
            }
            
            const inputA = evalNode(node.inputs[0]);
            const inputB = node.inputs.length > 1 ? evalNode(node.inputs[1]) : inputA;
            return computeGateOutput(node.type, { a: inputA, b: inputB });
          }
          
          if (node.type === 'OUTPUT') {
            return node.inputs.length > 0 ? evalNode(node.inputs[0]) : 0;
          }
          
          return 0;
        };
        
        const actualOutput = evalNode('output1');
        
        if (actualOutput !== testCase.expected) {
          allCombinationsCorrect = false;
          break;
        }
      }
    }
    
    if (allCombinationsCorrect) {
      // Level completed!
      setGameCompleted(true);
      toast({
        title: "Level Completed!",
        description: `You've successfully implemented a ${targetGate} gate using ${universalGate} gates!`,
        variant: "success"
      });
    }
  };
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // If we're not connecting and didn't click on an existing node, add a new gate
    if (!connectingFrom && !selectedNode) {
      addGate(x, y);
    }
  };
  
  const nextLevel = () => {
    const newLevel = currentLevel + 1;
    if (newLevel <= 4) {
      setCurrentLevel(newLevel);
      resetGame(newLevel);
      toast({
        title: "Level Up!",
        description: `Starting level ${newLevel}. Build a ${
          newLevel === 1 ? 'NOT' : 
          newLevel === 2 ? 'AND' : 
          newLevel === 3 ? 'OR' : 'XOR'
        } gate.`,
        variant: "default"
      });
    } else {
      toast({
        title: "Game Completed!",
        description: "Congratulations! You've completed all levels!",
        variant: "success"
      });
    }
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
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Gate Builder Game</h1>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b">
              <h2 className="text-2xl font-semibold text-purple-700">
                Build Your Own Logic Gates
              </h2>
              <p className="text-slate-600 mt-2">
                Use only {universalGate} gates to implement a {targetGate} gate function. 
                Click on the canvas to add gates, connect them, and test your design!
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div>
                  <span className="text-slate-700 font-medium mr-2">Level:</span>
                  <span className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full">
                    {currentLevel}/4
                  </span>
                </div>
                
                <div>
                  <span className="text-slate-700 font-medium mr-2">Target:</span>
                  <span className="bg-indigo-100 text-indigo-700 font-medium px-3 py-1 rounded-full">
                    {targetGate} Gate
                  </span>
                </div>
                
                <div className="ml-auto">
                  <Select
                    value={universalGate}
                    onValueChange={(value) => setUniversalGate(value as 'NAND' | 'NOR')}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Gate Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NAND">NAND Gates</SelectItem>
                      <SelectItem value="NOR">NOR Gates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4 mb-4">
                <Button
                  variant="outline"
                  onClick={() => resetGame(currentLevel)}
                >
                  Reset Level
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Instructions</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>How to Play</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="space-y-2">
                          <p><strong>Goal:</strong> Implement the target logic gate using only {universalGate} gates.</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Click on the canvas to add a new {universalGate} gate</li>
                            <li>Click on a gate and then another gate to create a connection</li>
                            <li>Click on input nodes to toggle their values (0/1)</li>
                            <li>The output should match the truth table of the target gate</li>
                            <li>Complete all levels to become a logic design master!</li>
                          </ul>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                {gameCompleted && (
                  <Button
                    variant="default"
                    className="ml-auto"
                    onClick={nextLevel}
                  >
                    Next Level
                  </Button>
                )}
              </div>
              
              <div
                ref={canvasRef}
                className="border border-slate-200 bg-slate-50 rounded-lg h-[500px] relative cursor-pointer overflow-hidden"
                onClick={handleCanvasClick}
              >
                {/* Render nodes */}
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute ${
                      node.type === 'INPUT' ? 'bg-blue-100 border-blue-400' :
                      node.type === 'OUTPUT' ? 'bg-green-100 border-green-400' :
                      node.type === 'NAND' ? 'bg-purple-100 border-purple-400' :
                      'bg-indigo-100 border-indigo-400'
                    } border-2 rounded-md p-2 select-none ${
                      selectedNode === node.id ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                    } ${
                      connectingFrom ? 'cursor-pointer' : 'cursor-move'
                    }`}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: node.type === 'INPUT' || node.type === 'OUTPUT' ? '60px' : '100px',
                      height: node.type === 'INPUT' || node.type === 'OUTPUT' ? '60px' : '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (connectingFrom) {
                        completeConnection(node.id);
                      } else {
                        selectNode(node.id);
                      }
                    }}
                  >
                    {node.type === 'INPUT' ? (
                      <div
                        className={`font-medium ${node.value === 1 ? 'text-blue-700' : 'text-slate-700'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleInput(node.id);
                        }}
                      >
                        {node.label}: {node.value}
                      </div>
                    ) : node.type === 'OUTPUT' ? (
                      <div className="font-medium text-green-700">
                        {node.label}: {node.value !== undefined ? node.value : '?'}
                      </div>
                    ) : (
                      <>
                        <div className="font-medium text-center mb-1">{node.type}</div>
                        <div className="flex justify-around w-full text-xs text-slate-600">
                          <button
                            className="hover:text-blue-600 active:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              startConnection(node.id);
                            }}
                          >
                            Connect
                          </button>
                          <button
                            className="hover:text-red-600 active:text-red-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {/* Render connections */}
                {connections.map((conn) => {
                  const fromNode = nodes.find(n => n.id === conn.from);
                  const toNode = nodes.find(n => n.id === conn.to);
                  
                  if (!fromNode || !toNode) return null;
                  
                  const fromX = fromNode.x;
                  const fromY = fromNode.y;
                  const toX = toNode.x;
                  const toY = toNode.y;
                  
                  return (
                    <svg
                      key={conn.id}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                    >
                      <line
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  );
                })}
                
                {/* Render temp connection when connecting */}
                {connectingFrom && (
                  <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                    <svg className="w-full h-full">
                      <line
                        x1={nodes.find(n => n.id === connectingFrom)?.x || 0}
                        y1={nodes.find(n => n.id === connectingFrom)?.y || 0}
                        x2={window.innerWidth / 2}
                        y2={window.innerHeight / 2}
                        stroke="#9333ea"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              {gameCompleted && (
                <motion.div
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Level Complete!</p>
                      <p className="text-sm">You've successfully implemented the {targetGate} gate function!</p>
                    </div>
                    <Button
                      variant="default"
                      onClick={nextLevel}
                    >
                      Next Level
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Game;
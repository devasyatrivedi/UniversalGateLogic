import React from 'react';
import GateImplementation from './GateImplementation';
import CircuitDiagram, { 
  NandGate, 
  Wire, 
  InputNode, 
  OutputNode 
} from './CircuitDiagram';
import { getTruthTableData } from '@/lib/gateLogic';

const NandImplementations: React.FC = () => {
  // Get truth table data for each gate
  const notTruthTable = getTruthTableData("NOT");
  const andTruthTable = getTruthTableData("AND");
  const orTruthTable = getTruthTableData("OR");
  const xorTruthTable = getTruthTableData("XOR");

  return (
    <div className="space-y-12">
      {/* NOT Gate Implementation */}
      <GateImplementation
        title="NOT Gate using NAND"
        gateType="NOT"
        universalGate="NAND"
        description="A NOT gate can be implemented using a NAND gate by connecting both inputs together. This creates the equivalent of a NOT gate since NAND(A,A) = NOT(A)."
        truthTable={notTruthTable}
        circuitComponent={
          <CircuitDiagram inputs={1}>
            {/* Input Wire */}
            <Wire left={28} top={120} width={80} />
            
            {/* NAND Gate */}
            <NandGate id="not-nand" left={108} top={90} />
            
            {/* Output Wire */}
            <Wire left={228} top={120} width={80} />
            
            {/* Input & Output Nodes */}
            <InputNode id="not-input" left={8} top={100} label="A" />
            <OutputNode id="not-output" left={308} top={100} label="~A" />
          </CircuitDiagram>
        }
      />

      {/* AND Gate Implementation */}
      <GateImplementation
        title="AND Gate using NAND"
        gateType="AND"
        universalGate="NAND"
        description="An AND gate can be implemented using two NAND gates. The first NAND gate produces the NAND of the inputs, and the second NAND gate acts as a NOT gate to invert the output of the first NAND gate."
        truthTable={andTruthTable}
        circuitComponent={
          <CircuitDiagram inputs={2}>
            {/* Input Wires */}
            <Wire left={28} top={100} width={80} />
            <Wire left={28} top={180} width={80} />
            
            {/* First NAND Gate */}
            <NandGate id="and-nand1" left={108} top={120} />
            
            {/* Middle Wire */}
            <Wire left={228} top={150} width={40} />
            
            {/* Second NAND Gate (NOT) */}
            <NandGate id="and-nand2" left={268} top={120} />
            
            {/* Output Wire */}
            <Wire left={388} top={150} width={40} />
            
            {/* Input & Output Nodes */}
            <InputNode id="and-input-a" left={8} top={80} label="A" />
            <InputNode id="and-input-b" left={8} top={160} label="B" />
            <OutputNode id="and-output" left={428} top={130} label="A∧B" />
          </CircuitDiagram>
        }
      />

      {/* OR Gate Implementation */}
      <GateImplementation
        title="OR Gate using NAND"
        gateType="OR"
        universalGate="NAND"
        description="An OR gate can be implemented using NAND gates by applying De Morgan's theorem. First, we invert both inputs using NAND gates (with both inputs tied together). Then, we feed these inverted inputs to another NAND gate, which effectively implements the OR function."
        truthTable={orTruthTable}
        circuitComponent={
          <CircuitDiagram inputs={2}>
            {/* Input Wires */}
            <Wire left={28} top={100} width={60} />
            <Wire left={28} top={180} width={60} />
            
            {/* First NAND Gate (NOT A) */}
            <NandGate id="or-nand1" left={88} top={70} />
            
            {/* Second NAND Gate (NOT B) */}
            <NandGate id="or-nand2" left={88} top={150} />
            
            {/* Connecting Wires */}
            <Wire left={208} top={100} width={60} />
            <Wire left={208} top={180} width={60} />
            
            {/* Final NAND Gate */}
            <NandGate id="or-nand3" left={268} top={110} />
            
            {/* Output Wire */}
            <Wire left={388} top={140} width={40} />
            
            {/* Input & Output Nodes */}
            <InputNode id="or-input-a" left={8} top={80} label="A" />
            <InputNode id="or-input-b" left={8} top={160} label="B" />
            <OutputNode id="or-output" left={428} top={120} label="A∨B" />
          </CircuitDiagram>
        }
      />

      {/* XOR Gate Implementation */}
      <GateImplementation
        title="XOR Gate using NAND"
        gateType="XOR"
        universalGate="NAND"
        description="An XOR gate produces a high output when the number of high inputs is odd. Using NAND gates, we can implement this by combining the outputs of different NAND configurations. This requires 4 NAND gates arranged in a specific pattern."
        truthTable={xorTruthTable}
        circuitComponent={
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-600">XOR implementation requires 4 NAND gates in a specific arrangement.</p>
            <svg className="w-full max-w-lg mx-auto" viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Input A */}
              <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
              <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
              <line x1="40" y1="60" x2="80" y2="60" stroke="#1e293b" strokeWidth="2" />
              
              {/* Input B */}
              <circle cx="30" cy="140" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
              <text x="30" y="144" textAnchor="middle" className="text-xs font-medium">B</text>
              <line x1="40" y1="140" x2="80" y2="140" stroke="#1e293b" strokeWidth="2" />
              
              {/* Vertical wires from inputs */}
              <line x1="60" y1="60" x2="60" y2="100" stroke="#1e293b" strokeWidth="2" />
              <line x1="60" y1="140" x2="60" y2="100" stroke="#1e293b" strokeWidth="2" />
              
              {/* NAND Gate 1 (A, B) */}
              <rect x="80" y="40" width="80" height="40" rx="20" stroke="#1e293b" strokeWidth="2" fill="white" />
              <circle cx="160" cy="60" r="4" fill="#1e293b" />
              <text x="120" y="64" textAnchor="middle" className="font-bold">NAND</text>
              <line x1="80" y1="60" x2="80" y2="60" stroke="#1e293b" strokeWidth="2" />
              <line x1="80" y1="60" x2="80" y2="60" stroke="#1e293b" strokeWidth="2" />
              
              {/* NAND Gate 2 (A, A NAND B) */}
              <rect x="190" y="40" width="80" height="40" rx="20" stroke="#1e293b" strokeWidth="2" fill="white" />
              <circle cx="270" cy="60" r="4" fill="#1e293b" />
              <text x="230" y="64" textAnchor="middle" className="font-bold">NAND</text>
              <line x1="160" y1="60" x2="190" y2="60" stroke="#1e293b" strokeWidth="2" />
              <line x1="40" y1="60" x2="190" y2="60" stroke="#1e293b" strokeWidth="2" />
              
              {/* NAND Gate 3 (B, A NAND B) */}
              <rect x="190" y="120" width="80" height="40" rx="20" stroke="#1e293b" strokeWidth="2" fill="white" />
              <circle cx="270" cy="140" r="4" fill="#1e293b" />
              <text x="230" y="144" textAnchor="middle" className="font-bold">NAND</text>
              <line x1="160" y1="60" x2="160" y2="140" stroke="#1e293b" strokeWidth="2" />
              <line x1="160" y1="140" x2="190" y2="140" stroke="#1e293b" strokeWidth="2" />
              <line x1="40" y1="140" x2="190" y2="140" stroke="#1e293b" strokeWidth="2" />
              
              {/* NAND Gate 4 (Output) */}
              <rect x="300" y="80" width="80" height="40" rx="20" stroke="#1e293b" strokeWidth="2" fill="white" />
              <circle cx="380" cy="100" r="4" fill="#1e293b" />
              <text x="340" y="104" textAnchor="middle" className="font-bold">NAND</text>
              <line x1="270" y1="60" x2="300" y2="100" stroke="#1e293b" strokeWidth="2" />
              <line x1="270" y1="140" x2="300" y2="100" stroke="#1e293b" strokeWidth="2" />
              
              {/* Output */}
              <line x1="380" y1="100" x2="420" y2="100" stroke="#1e293b" strokeWidth="2" />
              <circle cx="420" cy="100" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
              <text x="420" y="104" textAnchor="middle" className="text-xs font-medium">X</text>
            </svg>
            <div className="mt-6 flex justify-center gap-8">
              <div id="xor-input-a" className="flex flex-col items-center">
                <div className="w-10 h-6 rounded-full bg-red-500"></div>
                <span className="text-sm font-semibold mt-1">A</span>
              </div>
              
              <div id="xor-input-b" className="flex flex-col items-center">
                <div className="w-10 h-6 rounded-full bg-red-500"></div>
                <span className="text-sm font-semibold mt-1">B</span>
              </div>
              
              <div id="xor-output" className="flex flex-col items-center">
                <div className="w-10 h-6 rounded-full bg-red-500"></div>
                <span className="text-sm font-semibold mt-1">A⊕B</span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default NandImplementations;

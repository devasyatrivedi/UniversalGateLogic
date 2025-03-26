import React, { useState, useEffect } from 'react';
import { computeGateOutput } from '@/lib/gateLogic';

interface GateTesterProps {
  gateType: string;
  universalGate: string;
}

const GateTester: React.FC<GateTesterProps> = ({ gateType, universalGate }) => {
  const isSingleInput = gateType === "NOT";
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    // Compute the output based on the inputs and gate type
    const newOutput = computeGateOutput(gateType, universalGate, { a: inputA, b: inputB });
    setOutput(newOutput);
  }, [inputA, inputB, gateType, universalGate]);

  const toggleInputA = () => {
    setInputA(inputA === 0 ? 1 : 0);
  };

  const toggleInputB = () => {
    setInputB(inputB === 0 ? 1 : 0);
  };

  return (
    <div className="bg-slate-100 p-4 rounded-lg">
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center">
          <p className="mb-1 font-medium">Input A</p>
          <button 
            onClick={toggleInputA}
            className={`w-12 h-8 rounded-lg ${inputA === 0 ? 'bg-red-500' : 'bg-green-500'} text-white font-medium transition-colors`}
          >
            {inputA}
          </button>
        </div>
        
        {!isSingleInput && (
          <div className="text-center">
            <p className="mb-1 font-medium">Input B</p>
            <button 
              onClick={toggleInputB}
              className={`w-12 h-8 rounded-lg ${inputB === 0 ? 'bg-red-500' : 'bg-green-500'} text-white font-medium transition-colors`}
            >
              {inputB}
            </button>
          </div>
        )}
        
        <div className="text-4xl">→</div>
        
        <div className="text-center">
          <p className="mb-1 font-medium">Output</p>
          <div 
            className={`w-12 h-8 rounded-lg ${output === 0 ? 'bg-red-500' : 'bg-green-500'} text-white font-medium flex items-center justify-center transition-colors`}
          >
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateTester;

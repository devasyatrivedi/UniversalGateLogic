import React from 'react';
import CircuitDiagram from './CircuitDiagram';
import TruthTable from './TruthTable';
import GateTester from './GateTester';
import { TruthTableData } from '@/lib/gateLogic';

interface GateImplementationProps {
  title: string;
  gateType: string;
  universalGate: string;
  description: string;
  truthTable: TruthTableData;
  circuitComponent: React.ReactNode;
}

const GateImplementation: React.FC<GateImplementationProps> = ({
  title,
  gateType,
  universalGate,
  description,
  truthTable,
  circuitComponent
}) => {
  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-12">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-3">Circuit Diagram</h4>
          <div className="bg-slate-100 p-4 rounded-lg">
            {circuitComponent}
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <p>{description}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Truth Table</h4>
          <TruthTable data={truthTable} />
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Test the Gate:</h4>
            <p className="mb-3">Click the input buttons to toggle between 0 and 1 and observe how the output changes.</p>
            <GateTester gateType={gateType} universalGate={universalGate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GateImplementation;

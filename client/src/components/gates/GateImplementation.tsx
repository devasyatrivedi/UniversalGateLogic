import React from 'react';
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
      <h3 className="text-xl font-bold mb-4 text-blue-600">{title}</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-slate-700">Circuit Diagram</h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
            {circuitComponent}
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-slate-700">How it works:</h4>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 text-slate-700">Truth Table</h4>
          <TruthTable data={truthTable} />
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-slate-700">Test the Gate:</h4>
            <p className="mb-3 text-slate-600">Click the input buttons to toggle between 0 and 1 and observe how the output changes.</p>
            <GateTester gateType={gateType} universalGate={universalGate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GateImplementation;

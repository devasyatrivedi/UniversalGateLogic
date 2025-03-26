import React from 'react';

interface CircuitDiagramProps {
  inputs: number;
  children: React.ReactNode;
}

const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ inputs, children }) => {
  return (
    <div className="circuit-diagram relative border border-gray-300 rounded bg-white p-4" style={{ height: inputs === 1 ? '240px' : '320px' }}>
      {children}
    </div>
  );
};

// NAND Gate component for diagrams
export const NandGate: React.FC<{
  id: string;
  left: number;
  top: number;
  connectedTo?: string[];
}> = ({ id, left, top, connectedTo }) => {
  return (
    <div
      id={id}
      className="absolute border-2 border-slate-800 rounded-r-full bg-white flex items-center justify-center"
      style={{ left: `${left}px`, top: `${top}px`, width: '120px', height: '60px' }}
    >
      <div className="absolute right-2 w-3 h-3 rounded-full bg-slate-800"></div>
      <span className="font-bold">NAND</span>
    </div>
  );
};

// NOR Gate component for diagrams
export const NorGate: React.FC<{
  id: string;
  left: number;
  top: number;
  connectedTo?: string[];
}> = ({ id, left, top, connectedTo }) => {
  return (
    <div
      id={id}
      className="absolute border-2 border-slate-800 rounded-r-full bg-white flex items-center justify-center"
      style={{ left: `${left}px`, top: `${top}px`, width: '120px', height: '60px' }}
    >
      <div className="absolute right-2 w-3 h-3 rounded-full bg-slate-800"></div>
      <span className="font-bold">NOR</span>
    </div>
  );
};

// Wire component for diagrams
export const Wire: React.FC<{
  left: number;
  top: number;
  width: number;
  vertical?: boolean;
}> = ({ left, top, width, vertical = false }) => {
  if (vertical) {
    return (
      <div
        className="absolute bg-slate-800"
        style={{ left: `${left}px`, top: `${top}px`, width: '1px', height: `${width}px` }}
      ></div>
    );
  }
  
  return (
    <div
      className="absolute bg-slate-800"
      style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: '1px' }}
    ></div>
  );
};

// Input component for diagrams
export const InputNode: React.FC<{
  id: string;
  left: number;
  top: number;
  label: string;
}> = ({ id, left, top, label }) => {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: `${left}px`, top: `${top}px` }}>
      <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-400 flex items-center justify-center">
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};

// Output component for diagrams
export const OutputNode: React.FC<{
  id: string;
  left: number;
  top: number;
  label: string;
}> = ({ id, left, top, label }) => {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: `${left}px`, top: `${top}px` }}>
      <div className="w-8 h-8 rounded-full bg-green-100 border border-green-400 flex items-center justify-center">
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};

export default CircuitDiagram;

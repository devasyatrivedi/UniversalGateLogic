import React from 'react';

// Component for displaying pre-created gate circuit diagrams
interface GateImageProps {
  gateType: string;
  universalGate: string;
}

const GateImage: React.FC<GateImageProps> = ({ gateType, universalGate }) => {
  // Return the appropriate SVG based on the gate type and universal gate
  return (
    <div className="circuit-image-container p-4 bg-white border border-gray-200 rounded-lg flex justify-center">
      {universalGate === "NAND" ? (
        getNandImplementation(gateType)
      ) : (
        getNorImplementation(gateType)
      )}
    </div>
  );
};

// Helper function to get the NAND implementations
const getNandImplementation = (gateType: string) => {
  switch (gateType) {
    case "NOT":
      return (
        <svg width="300" height="140" viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg">
          <title>NOT Gate using NAND</title>
          {/* Input A */}
          <circle cx="30" cy="70" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="74" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="70" x2="100" y2="70" stroke="#1e293b" strokeWidth="2" />

          {/* NAND Gate */}
          <rect x="100" y="40" width="120" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="220" cy="70" r="5" fill="#1e293b" />
          <text x="160" y="75" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Loop from one input to the other */}
          <path d="M100 70 Q 80 30 100 60" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Output */}
          <line x1="220" y1="70" x2="270" y2="70" stroke="#1e293b" strokeWidth="2" />
          <circle cx="270" cy="70" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="270" y="74" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "AND":
      return (
        <svg width="420" height="200" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <title>AND Gate using NAND</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="100" y2="60" stroke="#1e293b" strokeWidth="2" />

          {/* Input B */}
          <circle cx="30" cy="140" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="144" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="140" x2="100" y2="140" stroke="#1e293b" strokeWidth="2" />

          {/* First NAND Gate */}
          <rect x="100" y="50" width="120" height="100" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="220" cy="100" r="5" fill="#1e293b" />
          <text x="160" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>

          {/* Connection between gates */}
          <line x1="220" y1="100" x2="260" y2="100" stroke="#1e293b" strokeWidth="2" />

          {/* Second NAND Gate (NOT gate) */}
          <rect x="260" y="70" width="120" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="380" cy="100" r="5" fill="#1e293b" />
          <text x="320" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Loop from one input to the other in the second NAND */}
          <path d="M260 100 Q 240 70 260 90" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Output */}
          <line x1="380" y1="100" x2="420" y2="100" stroke="#1e293b" strokeWidth="2" />
          <circle cx="420" cy="100" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="420" y="104" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "OR":
      return (
        <svg width="420" height="200" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <title>OR Gate using NAND</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="60" y2="60" stroke="#1e293b" strokeWidth="2" />
          
          {/* Input B */}
          <circle cx="30" cy="140" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="144" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="140" x2="60" y2="140" stroke="#1e293b" strokeWidth="2" />
          
          {/* First NAND Gate (NOT A) */}
          <rect x="80" y="30" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="60" r="5" fill="#1e293b" />
          <text x="130" y="65" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Loop connection for first NAND */}
          <path d="M60 60 C 70 60, 70 60, 80 60" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 60 C 70 60, 70 60, 80 50" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* Second NAND Gate (NOT B) */}
          <rect x="80" y="110" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="140" r="5" fill="#1e293b" />
          <text x="130" y="145" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Loop connection for second NAND */}
          <path d="M60 140 C 70 140, 70 140, 80 140" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 140 C 70 140, 70 140, 80 130" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* Connection to third NAND */}
          <line x1="180" y1="60" x2="240" y2="60" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="140" x2="240" y2="140" stroke="#1e293b" strokeWidth="2" />
          
          {/* Third NAND Gate (final gate) */}
          <rect x="240" y="50" width="120" height="100" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="360" cy="100" r="5" fill="#1e293b" />
          <text x="300" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Output */}
          <line x1="360" y1="100" x2="400" y2="100" stroke="#1e293b" strokeWidth="2" />
          <circle cx="400" cy="100" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="400" y="104" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "XOR":
      return (
        <svg width="480" height="240" viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
          <title>XOR Gate using NAND</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="80" y2="60" stroke="#1e293b" strokeWidth="2" />
          
          {/* Input B */}
          <circle cx="30" cy="180" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="184" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="180" x2="80" y2="180" stroke="#1e293b" strokeWidth="2" />
          
          {/* Middle NAND Gate (A NAND B) */}
          <rect x="100" y="100" width="100" height="80" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="200" cy="140" r="5" fill="#1e293b" />
          <text x="150" y="145" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Connections to middle NAND */}
          <line x1="80" y1="60" x2="100" y2="120" stroke="#1e293b" strokeWidth="2" />
          <line x1="80" y1="180" x2="100" y2="160" stroke="#1e293b" strokeWidth="2" />
          
          {/* Output of middle NAND to other NANDs */}
          <line x1="200" y1="140" x2="220" y2="140" stroke="#1e293b" strokeWidth="2" />
          <line x1="220" y1="140" x2="220" y2="80" stroke="#1e293b" strokeWidth="2" />
          <line x1="220" y1="140" x2="220" y2="200" stroke="#1e293b" strokeWidth="2" />
          <line x1="220" y1="80" x2="240" y2="80" stroke="#1e293b" strokeWidth="2" />
          <line x1="220" y1="200" x2="240" y2="200" stroke="#1e293b" strokeWidth="2" />
          
          {/* Top NAND Gate (A NAND (A NAND B)) */}
          <rect x="240" y="40" width="100" height="80" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="340" cy="80" r="5" fill="#1e293b" />
          <text x="290" y="85" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Connection from A to top NAND */}
          <line x1="80" y1="60" x2="240" y2="60" stroke="#1e293b" strokeWidth="2" />
          
          {/* Bottom NAND Gate (B NAND (A NAND B)) */}
          <rect x="240" y="160" width="100" height="80" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="340" cy="200" r="5" fill="#1e293b" />
          <text x="290" y="205" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Connection from B to bottom NAND */}
          <line x1="80" y1="180" x2="240" y2="180" stroke="#1e293b" strokeWidth="2" />
          
          {/* Output NAND Gate */}
          <rect x="360" y="100" width="100" height="80" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="460" cy="140" r="5" fill="#1e293b" />
          <text x="410" y="145" textAnchor="middle" fontSize="14" fontWeight="bold">NAND</text>
          
          {/* Connections to output NAND */}
          <line x1="340" y1="80" x2="360" y2="120" stroke="#1e293b" strokeWidth="2" />
          <line x1="340" y1="200" x2="360" y2="160" stroke="#1e293b" strokeWidth="2" />
          
          {/* Output */}
          <line x1="460" y1="140" x2="480" y2="140" stroke="#1e293b" strokeWidth="2" />
          <circle cx="480" cy="140" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="480" y="144" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    default:
      return <div>No diagram available for {gateType} gate</div>;
  }
};

// Helper function to get the NOR implementations
const getNorImplementation = (gateType: string) => {
  switch (gateType) {
    case "NOT":
      return (
        <svg width="300" height="140" viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg">
          <title>NOT Gate using NOR</title>
          {/* Input A */}
          <circle cx="30" cy="70" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="74" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="70" x2="100" y2="70" stroke="#1e293b" strokeWidth="2" />

          {/* NOR Gate */}
          <rect x="100" y="40" width="120" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="220" cy="70" r="5" fill="#1e293b" />
          <text x="160" y="75" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop from one input to the other */}
          <path d="M100 70 Q 80 30 100 60" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Output */}
          <line x1="220" y1="70" x2="270" y2="70" stroke="#1e293b" strokeWidth="2" />
          <circle cx="270" cy="70" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="270" y="74" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "OR":
      return (
        <svg width="420" height="200" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <title>OR Gate using NOR</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="100" y2="60" stroke="#1e293b" strokeWidth="2" />

          {/* Input B */}
          <circle cx="30" cy="140" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="144" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="140" x2="100" y2="140" stroke="#1e293b" strokeWidth="2" />

          {/* First NOR Gate */}
          <rect x="100" y="50" width="120" height="100" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="220" cy="100" r="5" fill="#1e293b" />
          <text x="160" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>

          {/* Connection between gates */}
          <line x1="220" y1="100" x2="260" y2="100" stroke="#1e293b" strokeWidth="2" />

          {/* Second NOR Gate (NOT gate) */}
          <rect x="260" y="70" width="120" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="380" cy="100" r="5" fill="#1e293b" />
          <text x="320" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop from one input to the other in the second NOR */}
          <path d="M260 100 Q 240 70 260 90" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Output */}
          <line x1="380" y1="100" x2="420" y2="100" stroke="#1e293b" strokeWidth="2" />
          <circle cx="420" cy="100" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="420" y="104" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "AND":
      return (
        <svg width="420" height="200" viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
          <title>AND Gate using NOR</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="60" y2="60" stroke="#1e293b" strokeWidth="2" />
          
          {/* Input B */}
          <circle cx="30" cy="140" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="144" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="140" x2="60" y2="140" stroke="#1e293b" strokeWidth="2" />
          
          {/* First NOR Gate (NOT A) */}
          <rect x="80" y="30" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="60" r="5" fill="#1e293b" />
          <text x="130" y="65" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop connection for first NOR */}
          <path d="M60 60 C 70 60, 70 60, 80 60" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 60 C 70 60, 70 60, 80 50" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* Second NOR Gate (NOT B) */}
          <rect x="80" y="110" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="140" r="5" fill="#1e293b" />
          <text x="130" y="145" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop connection for second NOR */}
          <path d="M60 140 C 70 140, 70 140, 80 140" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 140 C 70 140, 70 140, 80 130" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* Connection to third NOR */}
          <line x1="180" y1="60" x2="240" y2="60" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="140" x2="240" y2="140" stroke="#1e293b" strokeWidth="2" />
          
          {/* Third NOR Gate (final gate) */}
          <rect x="240" y="50" width="120" height="100" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="360" cy="100" r="5" fill="#1e293b" />
          <text x="300" y="105" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Output */}
          <line x1="360" y1="100" x2="400" y2="100" stroke="#1e293b" strokeWidth="2" />
          <circle cx="400" cy="100" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="400" y="104" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    case "XOR":
      return (
        <svg width="500" height="240" viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
          <title>XOR Gate using NOR</title>
          {/* Input A */}
          <circle cx="30" cy="60" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="64" textAnchor="middle" className="text-xs font-medium">A</text>
          <line x1="40" y1="60" x2="60" y2="60" stroke="#1e293b" strokeWidth="2" />
          
          {/* Input B */}
          <circle cx="30" cy="180" r="10" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
          <text x="30" y="184" textAnchor="middle" className="text-xs font-medium">B</text>
          <line x1="40" y1="180" x2="60" y2="180" stroke="#1e293b" strokeWidth="2" />
          
          {/* NOT A NOR Gate */}
          <rect x="80" y="30" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="60" r="5" fill="#1e293b" />
          <text x="130" y="65" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop connection for NOT A */}
          <path d="M60 60 C 70 60, 70 60, 80 60" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 60 C 70 60, 70 60, 80 50" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* NOT B NOR Gate */}
          <rect x="80" y="150" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="180" cy="180" r="5" fill="#1e293b" />
          <text x="130" y="185" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Loop connection for NOT B */}
          <path d="M60 180 C 70 180, 70 180, 80 180" stroke="#1e293b" strokeWidth="2" fill="none" />
          <path d="M60 180 C 70 180, 70 180, 80 170" stroke="#1e293b" strokeWidth="2" fill="none" />
          
          {/* A NOR B Gate */}
          <rect x="200" y="90" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="300" cy="120" r="5" fill="#1e293b" />
          <text x="250" y="125" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Connections to A NOR B */}
          <line x1="60" y1="60" x2="180" y2="60" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="60" x2="180" y2="100" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="100" x2="200" y2="100" stroke="#1e293b" strokeWidth="2" />
          
          <line x1="60" y1="180" x2="180" y2="180" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="180" x2="180" y2="140" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="140" x2="200" y2="140" stroke="#1e293b" strokeWidth="2" />
          
          {/* NOT A NOR NOT B Gate */}
          <rect x="320" y="40" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="420" cy="70" r="5" fill="#1e293b" />
          <text x="370" y="75" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Connections to NOT A NOR NOT B */}
          <line x1="180" y1="60" x2="320" y2="60" stroke="#1e293b" strokeWidth="2" />
          <line x1="180" y1="180" x2="270" y2="180" stroke="#1e293b" strokeWidth="2" />
          <line x1="270" y1="180" x2="270" y2="80" stroke="#1e293b" strokeWidth="2" />
          <line x1="270" y1="80" x2="320" y2="80" stroke="#1e293b" strokeWidth="2" />
          
          {/* Final NOR Gate */}
          <rect x="380" y="120" width="100" height="60" rx="10" stroke="#1e293b" strokeWidth="2" fill="white" />
          <circle cx="480" cy="150" r="5" fill="#1e293b" />
          <text x="430" y="155" textAnchor="middle" fontSize="14" fontWeight="bold">NOR</text>
          
          {/* Connections to Final Gate */}
          <line x1="300" y1="120" x2="340" y2="120" stroke="#1e293b" strokeWidth="2" />
          <line x1="340" y1="120" x2="340" y2="130" stroke="#1e293b" strokeWidth="2" />
          <line x1="340" y1="130" x2="380" y2="130" stroke="#1e293b" strokeWidth="2" />
          
          <line x1="420" y1="70" x2="450" y2="70" stroke="#1e293b" strokeWidth="2" />
          <line x1="450" y1="70" x2="450" y2="110" stroke="#1e293b" strokeWidth="2" />
          <line x1="450" y1="110" x2="450" y2="150" stroke="#1e293b" strokeWidth="2" />
          <line x1="450" y1="150" x2="380" y2="150" stroke="#1e293b" strokeWidth="2" />
          
          {/* Output */}
          <line x1="480" y1="150" x2="500" y2="150" stroke="#1e293b" strokeWidth="2" />
          <circle cx="500" cy="150" r="10" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
          <text x="500" y="154" textAnchor="middle" className="text-xs font-medium">Y</text>
        </svg>
      );
    default:
      return <div>No diagram available for {gateType} gate</div>;
  }
};

export default GateImage;
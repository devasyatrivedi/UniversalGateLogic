import React from 'react';
import GateImplementation from './GateImplementation';
import GateImage from './GateImages';
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
        circuitComponent={<GateImage gateType="NOT" universalGate="NAND" />}
      />

      {/* AND Gate Implementation */}
      <GateImplementation
        title="AND Gate using NAND"
        gateType="AND"
        universalGate="NAND"
        description="An AND gate can be implemented using two NAND gates. The first NAND gate produces the NAND of the inputs, and the second NAND gate acts as a NOT gate to invert the output of the first NAND gate."
        truthTable={andTruthTable}
        circuitComponent={<GateImage gateType="AND" universalGate="NAND" />}
      />

      {/* OR Gate Implementation */}
      <GateImplementation
        title="OR Gate using NAND"
        gateType="OR"
        universalGate="NAND"
        description="An OR gate can be implemented using NAND gates by applying De Morgan's theorem. First, we invert both inputs using NAND gates (with both inputs tied together). Then, we feed these inverted inputs to another NAND gate, which effectively implements the OR function."
        truthTable={orTruthTable}
        circuitComponent={<GateImage gateType="OR" universalGate="NAND" />}
      />

      {/* XOR Gate Implementation */}
      <GateImplementation
        title="XOR Gate using NAND"
        gateType="XOR"
        universalGate="NAND"
        description="An XOR gate produces a high output when the number of high inputs is odd. Using NAND gates, we can implement this by combining the outputs of different NAND configurations. This requires 4 NAND gates arranged in a specific pattern."
        truthTable={xorTruthTable}
        circuitComponent={<GateImage gateType="XOR" universalGate="NAND" />}
      />
    </div>
  );
};

export default NandImplementations;

import React from 'react';
import GateImplementation from './GateImplementation';
import GateImage from './GateImages';
import { getTruthTableData } from '@/lib/gateLogic';

const NorImplementations: React.FC = () => {
  // Get truth table data for each gate
  const notTruthTable = getTruthTableData("NOT");
  const andTruthTable = getTruthTableData("AND");
  const orTruthTable = getTruthTableData("OR");
  const xorTruthTable = getTruthTableData("XOR");

  return (
    <div className="space-y-12">
      {/* NOT Gate Implementation */}
      <GateImplementation
        title="NOT Gate using NOR"
        gateType="NOT"
        universalGate="NOR"
        description="A NOT gate can be implemented using a NOR gate by connecting both inputs together. This creates the equivalent of a NOT gate since NOR(A,A) = NOT(A)."
        truthTable={notTruthTable}
        circuitComponent={<GateImage gateType="NOT" universalGate="NOR" />}
      />

      {/* OR Gate Implementation */}
      <GateImplementation
        title="OR Gate using NOR"
        gateType="OR"
        universalGate="NOR"
        description="An OR gate can be implemented using two NOR gates. The first NOR gate produces the NOR of the inputs, and the second NOR gate acts as a NOT gate to invert the output of the first NOR gate."
        truthTable={orTruthTable}
        circuitComponent={<GateImage gateType="OR" universalGate="NOR" />}
      />

      {/* AND Gate Implementation */}
      <GateImplementation
        title="AND Gate using NOR"
        gateType="AND"
        universalGate="NOR"
        description="An AND gate can be implemented using NOR gates by applying De Morgan's theorem. First, we invert both inputs using NOR gates (with both inputs tied together). Then, we feed these inverted inputs to another NOR gate, which effectively implements the AND function."
        truthTable={andTruthTable}
        circuitComponent={<GateImage gateType="AND" universalGate="NOR" />}
      />

      {/* XOR Gate Implementation */}
      <GateImplementation
        title="XOR Gate using NOR"
        gateType="XOR"
        universalGate="NOR"
        description="An XOR gate produces a high output when the number of high inputs is odd. Using NOR gates, we can implement this by combining the outputs of different NOR configurations. This requires 5 NOR gates arranged in a specific pattern."
        truthTable={xorTruthTable}
        circuitComponent={<GateImage gateType="XOR" universalGate="NOR" />}
      />
    </div>
  );
};

export default NorImplementations;

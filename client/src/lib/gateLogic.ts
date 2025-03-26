export interface GateInputs {
  a: number;
  b?: number;
}

export interface TruthTableData {
  headers: string[];
  rows: number[][];
}

// NAND gate logic
const nandGate = (a: number, b: number): number => {
  return (a === 1 && b === 1) ? 0 : 1;
};

// NOR gate logic
const norGate = (a: number, b: number): number => {
  return (a === 0 && b === 0) ? 1 : 0;
};

// Compute NOT using NAND
const notUsingNand = (a: number): number => {
  return nandGate(a, a);
};

// Compute NOT using NOR
const notUsingNor = (a: number): number => {
  return norGate(a, a);
};

// Compute AND using NAND
const andUsingNand = (a: number, b: number): number => {
  // AND = NOT(NAND(A, B))
  return notUsingNand(nandGate(a, b));
};

// Compute AND using NOR
const andUsingNor = (a: number, b: number): number => {
  // AND = NOR(NOR(A, A), NOR(B, B)) = NOR(NOT A, NOT B)
  return norGate(notUsingNor(a), notUsingNor(b));
};

// Compute OR using NAND
const orUsingNand = (a: number, b: number): number => {
  // OR = NAND(NAND(A, A), NAND(B, B)) = NAND(NOT A, NOT B)
  return nandGate(notUsingNand(a), notUsingNand(b));
};

// Compute OR using NOR
const orUsingNor = (a: number, b: number): number => {
  // OR = NOT(NOR(A, B))
  return notUsingNor(norGate(a, b));
};

// Compute XOR using NAND
const xorUsingNand = (a: number, b: number): number => {
  // XOR = NAND(NAND(A, NAND(A, B)), NAND(B, NAND(A, B)))
  const nandAB = nandGate(a, b);
  return nandGate(nandGate(a, nandAB), nandGate(b, nandAB));
};

// Compute XOR using NOR
const xorUsingNor = (a: number, b: number): number => {
  // XOR = NOR(NOR(A, NOR(A, B)), NOR(B, NOR(A, B)))
  const norAB = norGate(a, b);
  return norGate(norGate(a, norAB), norGate(b, norAB));
};

// Compute gate output based on gate type and universal gate used
export const computeGateOutput = (
  gateType: string,
  universalGate: string,
  inputs: GateInputs
): number => {
  const { a, b = 0 } = inputs;

  if (universalGate === "NAND") {
    switch (gateType) {
      case "NOT":
        return notUsingNand(a);
      case "AND":
        return andUsingNand(a, b);
      case "OR":
        return orUsingNand(a, b);
      case "XOR":
        return xorUsingNand(a, b);
      default:
        return 0;
    }
  } else if (universalGate === "NOR") {
    switch (gateType) {
      case "NOT":
        return notUsingNor(a);
      case "AND":
        return andUsingNor(a, b);
      case "OR":
        return orUsingNor(a, b);
      case "XOR":
        return xorUsingNor(a, b);
      default:
        return 0;
    }
  }

  return 0;
};

// Get truth table data for a specific gate
export const getTruthTableData = (gateType: string): TruthTableData => {
  switch (gateType) {
    case "NOT":
      return {
        headers: ["Input (A)", "Output (NOT A)"],
        rows: [
          [0, 1],
          [1, 0],
        ],
      };
    case "AND":
      return {
        headers: ["Input A", "Input B", "Output (A AND B)"],
        rows: [
          [0, 0, 0],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1],
        ],
      };
    case "OR":
      return {
        headers: ["Input A", "Input B", "Output (A OR B)"],
        rows: [
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
        ],
      };
    case "XOR":
      return {
        headers: ["Input A", "Input B", "Output (A XOR B)"],
        rows: [
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0],
        ],
      };
    default:
      return {
        headers: [],
        rows: [],
      };
  }
};

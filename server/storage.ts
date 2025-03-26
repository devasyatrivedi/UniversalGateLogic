import { 
  users, 
  type User, 
  type InsertUser,
  circuits,
  type Circuit,
  type InsertCircuit,
  sessions,
  type Session,
  type InsertSession
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Circuit methods
  getCircuits(): Promise<Circuit[]>;
  getCircuit(id: number): Promise<Circuit | undefined>;
  createCircuit(circuit: InsertCircuit): Promise<Circuit>;
  
  // Session methods
  getSessions(circuitId?: number): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private circuits: Map<number, Circuit>;
  private sessions: Map<number, Session>;
  private userId: number;
  private circuitId: number;
  private sessionId: number;

  constructor() {
    this.users = new Map();
    this.circuits = new Map();
    this.sessions = new Map();
    this.userId = 1;
    this.circuitId = 1;
    this.sessionId = 1;
    
    // Add some sample circuits
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Add NAND-based circuits
    this.createCircuit({
      name: "NOT Gate using NAND",
      description: "NOT gate implementation using NAND gates",
      inputs: 1,
      gateType: "NAND",
      implementation: JSON.stringify({
        gateType: "NOT",
        inputs: [0],
        output: 1,
        gates: [{ id: 1, type: "NAND", inputs: [0, 0], output: 1 }]
      })
    });
    
    this.createCircuit({
      name: "AND Gate using NAND",
      description: "AND gate implementation using NAND gates",
      inputs: 2,
      gateType: "NAND",
      implementation: JSON.stringify({
        gateType: "AND",
        inputs: [0, 1],
        output: 1,
        gates: [
          { id: 1, type: "NAND", inputs: [0, 1], output: 2 },
          { id: 2, type: "NAND", inputs: [2, 2], output: 3 }
        ]
      })
    });
    
    // Add NOR-based circuits
    this.createCircuit({
      name: "NOT Gate using NOR",
      description: "NOT gate implementation using NOR gates",
      inputs: 1,
      gateType: "NOR",
      implementation: JSON.stringify({
        gateType: "NOT",
        inputs: [0],
        output: 1,
        gates: [{ id: 1, type: "NOR", inputs: [0, 0], output: 1 }]
      })
    });
    
    this.createCircuit({
      name: "OR Gate using NOR",
      description: "OR gate implementation using NOR gates",
      inputs: 2,
      gateType: "NOR",
      implementation: JSON.stringify({
        gateType: "OR",
        inputs: [0, 1],
        output: 1,
        gates: [
          { id: 1, type: "NOR", inputs: [0, 1], output: 2 },
          { id: 2, type: "NOR", inputs: [2, 2], output: 3 }
        ]
      })
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Circuit methods
  async getCircuits(): Promise<Circuit[]> {
    return Array.from(this.circuits.values());
  }
  
  async getCircuit(id: number): Promise<Circuit | undefined> {
    return this.circuits.get(id);
  }
  
  async createCircuit(insertCircuit: InsertCircuit): Promise<Circuit> {
    const id = this.circuitId++;
    
    // Create a properly typed circuit object
    const circuit: Circuit = { 
      id,
      name: insertCircuit.name,
      description: insertCircuit.description ?? null,
      inputs: insertCircuit.inputs ?? 2,
      gateType: insertCircuit.gateType,
      implementation: insertCircuit.implementation
    };
    
    this.circuits.set(id, circuit);
    return circuit;
  }
  
  // Session methods
  async getSessions(circuitId?: number): Promise<Session[]> {
    const allSessions = Array.from(this.sessions.values());
    if (circuitId) {
      return allSessions.filter(session => session.circuitId === circuitId);
    }
    return allSessions;
  }
  
  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.sessionId++;
    const session: Session = { ...insertSession, id };
    this.sessions.set(id, session);
    return session;
  }
}

export const storage = new MemStorage();

import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the circuit configuration table
export const circuits = pgTable("circuits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  inputs: integer("inputs").notNull().default(2),
  gateType: text("gate_type").notNull(), // 'NAND' or 'NOR'
  implementation: text("implementation").notNull(), // JSON string of the circuit configuration
});

export const insertCircuitSchema = createInsertSchema(circuits).omit({
  id: true,
});

export type InsertCircuit = z.infer<typeof insertCircuitSchema>;
export type Circuit = typeof circuits.$inferSelect;

// Define the experiment session table
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  circuitId: integer("circuit_id").notNull(),
  inputs: text("inputs").notNull(), // JSON string of input values
  output: text("output").notNull(), // JSON string of output value
  timestamp: text("timestamp").notNull(),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Define schema for gate types
export const gateTypeSchema = z.enum(["AND", "OR", "NOT", "XOR", "NAND", "NOR"]);
export type GateType = z.infer<typeof gateTypeSchema>;

// Define schema for input values
export const inputValueSchema = z.enum(["0", "1"]);
export type InputValue = z.infer<typeof inputValueSchema>;

// Define schema for circuit implementation
export const circuitImplementationSchema = z.object({
  gateType: gateTypeSchema,
  inputs: z.array(z.number()),
  output: z.number(),
  gates: z.array(z.object({
    id: z.number(),
    type: gateTypeSchema,
    inputs: z.array(z.number()),
    output: z.number(),
  })),
});

export type CircuitImplementation = z.infer<typeof circuitImplementationSchema>;

// Define user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

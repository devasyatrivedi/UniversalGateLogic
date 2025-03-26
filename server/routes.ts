import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to save a session
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  // API route to get circuit implementations
  app.get("/api/circuits", async (req, res) => {
    const circuits = await storage.getCircuits();
    res.json(circuits);
  });

  // API route to get a circuit by ID
  app.get("/api/circuits/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid circuit ID" });
    }

    const circuit = await storage.getCircuit(id);
    if (!circuit) {
      return res.status(404).json({ error: "Circuit not found" });
    }

    res.json(circuit);
  });

  const httpServer = createServer(app);

  return httpServer;
}

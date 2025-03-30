import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contact = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Message received", id: contact.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ 
          success: false, 
          message: fromZodError(error).message || "Invalid form submission" 
        });
      } else {
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

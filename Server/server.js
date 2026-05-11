import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "./supabase.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Config
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Routes
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("الرسالة المستلمة:", message);

    if (!message) {
      return res.status(400).json({ error: "الرسالة فارغة" });
    }

    // طلب المحتوى من Gemini
    const result = await model.generateContent(message);
    
    // تأكد من استخراج النص بشكل صحيح
    const response = await result.response;
    const text = response.text();

    console.log("رد الذكاء الاصطناعي:", text);
    res.json({ reply: text });

  } catch (error) {
    // هذا السطر سيطبع لك السبب الحقيقي في الـ Terminal (شاشة السيرفر السوداء)
    console.error("خطأ في السيرفر:", error);
    
    res.status(500).json({ 
      error: "حدث خطأ داخلي", 
      details: error.message 
    });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
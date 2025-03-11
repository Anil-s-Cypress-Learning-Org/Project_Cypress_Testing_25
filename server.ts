import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON data

let message: string = "Hello from Express with TypeScript!"; // Default message

// ✅ GET - Return the message
app.get("/api/message", (req, res) => {
    if (!message) message = "Hello from Express with TypeScript!"; // Reset if empty
    res.json({ message });
});

// ✅ POST - Set a new message
app.post("/api/message", (req, res) => {
    const { user } = req.body;
    message = `Hello, ${user || "Guest"}!`;
    res.json({ message });
});

// ✅ PATCH - Modify the message
app.patch("/api/message", (req, res) => {
    const { text } = req.body;
    if (text) message = text;
    res.json({ message: `Message updated to: ${message}` });
});

// ✅ DELETE - Clear the message but ensure a fallback default
app.delete("/api/message", (req, res) => {
    message = "";
    res.json({ message: "Message deleted" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
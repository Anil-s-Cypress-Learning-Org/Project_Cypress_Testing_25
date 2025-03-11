import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/api/message", (req: Request, res: Response) => {
    res.json({ message: "Hello from Express with TypeScript!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
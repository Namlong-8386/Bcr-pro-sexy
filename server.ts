import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to read data
  const readData = (fileName: string) => {
    try {
      const filePath = path.join(process.cwd(), "data", fileName);
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error(`Error reading ${fileName}:`, error);
      return { success: false, error: "Internal Server Error" };
    }
  };

  // API ROUTES (Lớp trung gian)
  app.post("/api/v1/auth/login", (req, res) => {
    const { username, password } = req.body;
    const users = readData("users.json");
    
    if (!Array.isArray(users)) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    
    if (user) {
      if (user.status === "locked") {
        return res.status(403).json({ success: false, message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên." });
      }

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        success: true, 
        data: userWithoutPassword,
        message: "Login successful"
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Tên đăng nhập hoặc mật khẩu không chính xác" 
      });
    }
  });

  app.post("/api/v1/auth/register", (req, res) => {
    const { username, password } = req.body;
    const users = readData("users.json");
    
    if (!Array.isArray(users)) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ success: false, message: "Tên đăng nhập đã tồn tại" });
    }

    const newUser = {
      username,
      password,
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      balance: 0,
      plan: "free",
      status: "active"
    };

    users.push(newUser);
    
    try {
      const filePath = path.join(process.cwd(), "data", "users.json");
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
      
      const { password: _, ...userWithoutPassword } = newUser;
      res.json({ 
        success: true, 
        data: userWithoutPassword,
        message: "Registration successful"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Could not save user" });
    }
  });

  app.get("/api/v1/user/profile", (req, res) => {
    const username = req.query.username as string;
    const users = readData("users.json");

    if (username && Array.isArray(users)) {
      const user = users.find(u => u.username === username);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return res.json({ success: true, data: userWithoutPassword });
      }
    }

    // Default or fallback
    res.json({ success: false, message: "User not found" });
  });

  app.get("/api/v1/transactions", (req, res) => {
    res.json(readData("transactions.json"));
  });

  app.post("/api/v1/auth/logout", (req, res) => {
    res.json({ success: true, message: "Logged out from middleware" });
  });

  // ADMIN ROUTES
  app.get("/api/v1/admin/users", (req, res) => {
    const users = readData("users.json");
    if (Array.isArray(users)) {
      const safeUsers = users.map(({ password, ...u }) => u);
      return res.json({ success: true, data: safeUsers });
    }
    res.status(500).json({ success: false, message: "Error reading users" });
  });

  app.post("/api/v1/admin/users/:id", (req, res) => {
    const { id } = req.params;
    const { action, amount } = req.body;
    const users = readData("users.json");

    if (!Array.isArray(users)) return res.status(500).json({ success: false, message: "Server error" });

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });

    const user = users[userIndex];
    if (user.username.toLowerCase() === 'admin' && action !== 'add_credit') {
       return res.status(403).json({ success: false, message: "Không thể khóa hoặc xóa hệ thống quản trị" });
    }

    if (action === 'delete') {
      users.splice(userIndex, 1);
    } else if (action === 'lock') {
      users[userIndex].status = 'locked';
    } else if (action === 'unlock') {
      users[userIndex].status = 'active';
    } else if (action === 'add_credit' && amount) {
      users[userIndex].balance += Number(amount);
    } else {
      return res.status(400).json({ success: false, message: "Hành động không hợp lệ" });
    }

    try {
      const filePath = path.join(process.cwd(), "data", "users.json");
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Không thể lưu dữ liệu" });
    }
  });

  // VITE MIDDLEWARE
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS_PRTCL] Intermediary API Server running on http://localhost:${PORT}`);
  });
}

startServer();

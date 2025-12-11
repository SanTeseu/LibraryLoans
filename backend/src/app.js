const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const livrosRoutes = require("./routes/livros");
const membrosRoutes = require("./routes/membros");
const funcionariosRoutes = require("./routes/funcionarios");
const emprestimosRoutes = require("./routes/emprestimos");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/livros", livrosRoutes);
app.use("/api/membros", membrosRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/emprestimos", emprestimosRoutes);

module.exports = app;

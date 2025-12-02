const express = require("express");
const app = express();

app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const funcionariosRoutes = require("./routes/funcionariosRoutes");
const membrosRoutes = require("./routes/membrosRoutes");
const livrosRoutes = require("./routes/livrosRoutes");
const emprestimosRoutes = require("./routes/emprestimosRoutes");


app.use("/api", authRoutes);
app.use("/api", funcionariosRoutes);
app.use("/api", membrosRoutes);
app.use("/api", livrosRoutes);
app.use("/api", emprestimosRoutes);

app.get("/", (req, res) => {
    res.send("API Library&Loans está funcionando!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

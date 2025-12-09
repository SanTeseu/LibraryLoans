const jwt = require("jsonwebtoken");

require("dotenv").config();

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ error: "Token não fornecido" });

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "troque_esta_chave"
    );
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

function adminOnly(req, res, next) {
  if (req.user.perfil !== "admin")
    return res.status(403).json({ error: "Apenas administradores podem realizar esta ação" });
  next();
}

module.exports = { auth, adminOnly };

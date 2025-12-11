const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const Funcionario = db.Funcionario;

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "8h";

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ 
          message: "Email e senha são obrigatórios" 
        });
      }

      const user = await Funcionario.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ 
          message: "Credenciais inválidas" 
        });
      }

      const match = await bcrypt.compare(senha, user.senha);

      if (!match) {
        return res.status(401).json({ 
          message: "Credenciais inválidas" 
        });
      }

      if (!user.ativo) {
        return res.status(403).json({ 
          message: "Funcionário inativo" 
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
          nome: user.nome
        },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES_IN }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ 
        message: "Erro interno no servidor" 
      });
    }
  },

  async me(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      return res.json({ user: req.user });
    } catch (err) {
      return res.status(500).json({ 
        message: "Erro interno" 
      });
    }
  }
};

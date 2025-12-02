const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Funcionario = require("../models");


const SECRET = "chave_jwt_super_secreta";
const SALT_ROUNDS = 10;


exports.login = async (req, res) => {
    const { email, senha } = req.body;

    
    if (!email || !senha) {
        return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    try {
        
        const funcionario = await Funcionario.findOne({ where: { email } });

        if (!funcionario) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }

        
        const senhaCorreta = await bcrypt.compare(senha, funcionario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }

        
        const token = jwt.sign(
            { 
                id: funcionario.id,
                nome: funcionario.nome,
                perfil: funcionario.perfil 
            },
            SECRET,
            { expiresIn: "2h" }
        );

        return res.json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro ao autenticar usuário." });
    }
};



exports.cadastrar = async (req, res) => {
    const { nome, email, senha, perfil } = req.body;

    
    if (!nome || !email || !senha || !perfil) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    try {
        
        const existente = await Funcionario.findOne({ where: { email } });

        if (existente) {
            return res.status(400).json({ erro: "E-mail já está em uso." });
        }

        
        const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);

    
        const novo = await Funcionario.create({
            nome,
            email,
            senha_hash: senhaCriptografada,
            perfil,
            status: true
        });

        return res.status(201).json({
            mensagem: "Funcionário criado com sucesso.",
            funcionario: { id: novo.id, nome: novo.nome, email: novo.email }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro ao criar funcionário." });
    }
};

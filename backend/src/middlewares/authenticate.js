const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ error: "Token não fornecido" });

        const [, token] = authHeader.split(" ");

        if (!token)
            return res.status(401).json({ error: "Token inválido" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        console.error("Erro no token:", err);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

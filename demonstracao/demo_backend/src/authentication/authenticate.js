import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; // Pega apenas o token

    try {
        const decoded = jwt.verify(token, 'secreta'); // Verifica o token
        req.user = decoded; // Adiciona os dados dos users ao request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

export default authenticate;

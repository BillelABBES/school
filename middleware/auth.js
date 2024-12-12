const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Accès interdit' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: 'Utilisateur non trouvé' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Accès non autorisé' });
    next();
};

module.exports = { auth, checkRole };

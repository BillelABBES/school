const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Création d'un professeur
router.post('/register/prof', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password, role: 'prof' });
        await user.save();
        res.status(201).json({ message: 'Compte professeur créé avec succès' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Création d'un étudiant
router.post('/register/student', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password, role: 'student' });
        await user.save();
        res.status(201).json({ message: 'Compte étudiant créé avec succès' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

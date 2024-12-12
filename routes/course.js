const express = require('express');
const Course = require('../models/Course');
const { auth, checkRole } = require('../middleware/auth');

const router = express.Router();

// Créer un cours (Prof uniquement)
router.post('/', auth, checkRole('prof'), async (req, res) => {
    const { title, description } = req.body;

    try {
        const course = new Course({ title, description, createdBy: req.user._id });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lire tous les cours (disponible pour tous)
router.get('/', auth, async (req, res) => {
    const courses = await Course.find().populate('createdBy', 'username');
    res.json(courses);
});

// Lire tous les cours (disponible pour tous)
router.get('/', auth, checkRole('student'), async (req, res) => {
    const courses = await Course.find().populate('createdBy', 'username');
    res.json(courses);
});



module.exports = router;

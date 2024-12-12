require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

const app = express();

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

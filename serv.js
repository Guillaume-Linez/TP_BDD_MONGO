const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const cors = require('cors');

const mongoURI = 'mongodb://localhost:27037/tp'; // Remplacez par l'URL de votre base MongoDB

app.use(cors());
app.use(express.json());

// Route pour récupérer toutes les données
app.get('/api/data/Membre', async (req, res) => {
  try {
    const startTime = process.hrtime();
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('Membre'); // Remplacez par le nom de votre collection

    const data = await collection.find({}).toArray();
    const endTime = process.hrtime(startTime); // Enregistrez le temps de fin
    const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; // Calculez la différence en millisecondes
    console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    res.status(500).send('Erreur serveur');
  } finally {
    // client.close();
  }
});
app.get('/api/data/Groupe', async (req, res) => {
    try {
      const startTime = process.hrtime();
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      const database = client.db();
      const collection = database.collection('Groupe'); // Remplacez par le nom de votre collection
  
      const data = await collection.find({}).toArray();
      const endTime = process.hrtime(startTime); // Enregistrez le temps de fin
      const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; // Calculez la différence en millisecondes
      console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
    } finally {
      // client.close();
    }
  });
  app.get('/api/data/Commande', async (req, res) => {
    try {
      const startTime = process.hrtime();
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      const database = client.db();
      const collection = database.collection('Commande'); // Remplacez par le nom de votre collection
  
      const data = await collection.find({}).toArray();
      const endTime = process.hrtime(startTime); // Enregistrez le temps de fin
      const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; // Calculez la différence en millisecondes
      console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
    } finally {
      // client.close();
    }
  });
  app.get('/api/data/Materiel', async (req, res) => {
    try {
      const startTime = process.hrtime();
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      const database = client.db();
      const collection = database.collection('Materiel'); // Remplacez par le nom de votre collection
  
      const data = await collection.find({}).toArray();
      const endTime = process.hrtime(startTime); // Enregistrez le temps de fin
      const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; // Calculez la différence en millisecondes
      console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
    } finally {
      // client.close();
    }
  });

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

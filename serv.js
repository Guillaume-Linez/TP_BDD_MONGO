const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const cors = require('cors');

const mongoURI = 'mongodb://localhost:27020/tp';

app.use(cors());
app.use(express.json());

app.get('/api/data/Membre', async (req, res) => {
  try {
    const startTime = process.hrtime();
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('Membre'); 
    const data = await collection.find({}).toArray();
    const endTime = process.hrtime(startTime); 
    const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; 
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
    const collection = database.collection('Groupe');
    const data = await collection.aggregate([{ $project: { Numéro: 1, Nom: 1, _id: 0 } }]).toArray();

    const endTime = process.hrtime(startTime);
    const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;
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
      const collection = database.collection('Materiel');
      const data = await collection.find({}).toArray();
      const endTime = process.hrtime(startTime); 
      const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; 
      console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
    } finally {
      // client.close();
    }
  });
  app.get('/api/data/User', async (req, res) => {
    try {
      const startTime = process.hrtime();
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const database = client.db();
      const collection = database.collection('User');
      const data = await collection.find({}).toArray();
      const endTime = process.hrtime(startTime);
      const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6; 
      console.log(`Temps écoulé pour la récupération des données : ${elapsedTimeInMs} ms`);
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
    } finally {
      // client.close();
    }
  });
// Route POST pour créer un nouveau membre
app.post('/api/data/Membre', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('Membre');
    const membre = req.body;
    const result = await collection.insertOne(membre);
    if (result.acknowledged === true) {
      console.log(`Nouveau membre créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result);
    } else {
      throw new Error('Échec de l\'insertion du membre');
    }
  } catch (error) {
    console.error('Erreur lors de la création du membre', error);
    res.status(500).send('Erreur serveur lors de la création du membre');
  } finally {
    await client.close();
  }
});
// Route POST pour créer un nouveau groupe
app.post('/api/data/Groupe', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('Groupe');   
    const groupe = req.body;
    const result = await collection.insertOne(groupe);
    if (result.acknowledged === true) {
      console.log(`Nouveau groupe créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result);
    } else {
      throw new Error('Échec de l\'insertion du groupe');
    }
  } catch (error) {
    console.error('Erreur lors de la création du groupe', error);
    res.status(500).send('Erreur serveur lors de la création du groupe');
  } finally {
    await client.close();
  }
});
app.post('/api/data/Materiel', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('Materiel');  
    const materiel = req.body;
    const result = await collection.insertOne(materiel);   
    if (result.acknowledged === true) {
      console.log(`Nouveau materiel créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result);
    } else {
      throw new Error('Échec de l\'insertion du materiel');
    }
  } catch (error) {
    console.error('Erreur lors de la création du materiel', error);
    res.status(500).send('Erreur serveur lors de la création du materiel');
  } finally {
    await client.close();
  }
});
app.post('/api/User', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('User');
    const { email, password } = req.body;
    const user = await collection.findOne({ email, password });
    if (user) {
      res.redirect('/creer-groupe');
    } else {
      res.status(401).send('Identifiants incorrects');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).send('Erreur serveur');
  } finally {
    await client.close();
  }
});
app.post('/api/data/User', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('User'); 
    const User = req.body;
    const result = await collection.insertOne(User);
    if (result.acknowledged === true) {
      console.log(`Nouveau User créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result);
    } else {
      throw new Error('Échec de l\'insertion du User');
    }
  } catch (error) {
    console.error('Erreur lors de la création du User', error);
    res.status(500).send('Erreur serveur lors de la création du User');
  } finally {
    await client.close();
  }
});
app.get('/api/search/clients', async (req, res) => {
  const searchTerm = req.query.q || '';
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db();
    const collection = database.collection('Membre');
    const clients = await collection.find({
      Nom: new RegExp(searchTerm, 'i')
    }).toArray();
    res.json(clients);
  } catch (error) {
    console.error('Erreur lors de la recherche des clients', error);
    res.status(500).send('Erreur serveur');
  } finally {
    //client.close();
  }
});
app.get('/api/search/activeMembers', async (req, res) => {
  const searchTerm = req.query.q || '';
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db();
    const collection = database.collection('Membre');
    const activeMembers = await collection.find({
      Nom: new RegExp(searchTerm, 'i') // Recherche insensible à la casse
    }).toArray();
    res.json(activeMembers);
  } catch (error) {
    console.error('Erreur lors de la recherche des membres actifs', error);
    res.status(500).send('Erreur serveur');
  } finally {
    //client.close();
  }
});
app.get('/api/search/materials', async (req, res) => {
  const searchTerm = req.query.q || '';
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db();
    const collection = database.collection('Materiel');
    const materials = await collection.find({
      Marque: new RegExp(searchTerm, 'i')
    }).toArray();
    res.json(materials);
  } catch (error) {
    console.error('Erreur lors de la recherche des matériaux', error);
    res.status(500).send('Erreur serveur');
  } finally {
    //client.close();
  }
});
app.get('/api/data/Commande', async (req, res) => {
  const { startDate, endDate, clientMember, activeMember, material } = req.query;
  const query = {};

  if (startDate || endDate) {
      query.Date = {};
      if (startDate) query.Date.$gte = new Date(startDate);
      if (endDate) query.Date.$lte = new Date(endDate);
  }

  if (clientMember) query.Nom_membre_client = new RegExp(clientMember, 'i');
  if (activeMember) query.Nom_membre_actif = new RegExp(activeMember, 'i');
  if (material) query['Liste_Materiel'] = { $elemMatch: { Nom: new RegExp(material, 'i') } };

  try {
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const database = client.db();
      const collection = database.collection('Commande');
      const data = await collection.find(query).toArray();
      res.json(data);
  } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      res.status(500).send('Erreur serveur');
  } finally {
      //await client.close();
  }
});
app.post('/api/login', async (req, res) => {
  const { Mail, MDP } = req.body;
  if (!Mail || !MDP) {
    return res.status(400).json({ message: 'Mail and MDP are required' });
  }

  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const users = database.collection('User');
    const user = await users.findOne({ Mail, MDP });

    if (user) {
      res.json({ success: true, message: 'Connexion réussie' });
    } else {
      res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB', error);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

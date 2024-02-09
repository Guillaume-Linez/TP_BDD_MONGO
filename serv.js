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

    // Projection pour récupérer uniquement les champs Numéro et Nom
    // const projection = { Numéro: 1, Nom: 1 };

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

/*
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
*/
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
  app.get('/api/data/User', async (req, res) => {
    try {
      const startTime = process.hrtime();
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
  
      const database = client.db();
      const collection = database.collection('User'); // Remplacez par le nom de votre collection
  
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
// Route POST pour créer un nouveau membre
app.post('/api/data/Membre', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('Membre');
    
    // Créez un nouveau membre avec les données reçues dans le corps de la requête (req.body)
    const membre = req.body;
    const result = await collection.insertOne(membre);
    
    // Vérifiez si l'insertion a réussi
    if (result.acknowledged === true) {
      console.log(`Nouveau membre créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result); // Envoie une réponse avec le document créé
    } else {
      throw new Error('Échec de l\'insertion du membre');
    }
  } catch (error) {
    console.error('Erreur lors de la création du membre', error);
    res.status(500).send('Erreur serveur lors de la création du membre');
  } finally {
    // Assurez-vous de fermer la connexion à la base de données une fois que vous avez terminé
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
    
    // Créez un nouveau groupe avec les données reçues dans le corps de la requête (req.body)
    const groupe = req.body;
    const result = await collection.insertOne(groupe);
    
    // Vérifiez si l'insertion a réussi
    if (result.acknowledged === true) {
      console.log(`Nouveau groupe créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result); // Envoie une réponse avec le document créé
    } else {
      throw new Error('Échec de l\'insertion du groupe');
    }
  } catch (error) {
    console.error('Erreur lors de la création du groupe', error);
    res.status(500).send('Erreur serveur lors de la création du groupe');
  } finally {
    // Assurez-vous de fermer la connexion à la base de données une fois que vous avez terminé
    await client.close();
  }
});
app.post('/api/data/Materiel', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('Materiel');
    
    // Créez un nouveau materiel avec les données reçues dans le corps de la requête (req.body)
    const materiel = req.body;
    const result = await collection.insertOne(materiel);
    
    // Vérifiez si l'insertion a réussi
    if (result.acknowledged === true) {
      console.log(`Nouveau materiel créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result); // Envoie une réponse avec le document créé
    } else {
      throw new Error('Échec de l\'insertion du materiel');
    }
  } catch (error) {
    console.error('Erreur lors de la création du materiel', error);
    res.status(500).send('Erreur serveur lors de la création du materiel');
  } finally {
    // Assurez-vous de fermer la connexion à la base de données une fois que vous avez terminé
    await client.close();
  }
});
app.post('/api/User', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('User');

    // Récupérez le courriel et le mot de passe de la requête
    const { email, password } = req.body;

    // Recherchez l'utilisateur dans la base de données
    const user = await collection.findOne({ email, password });

    if (user) {
      // Si l'utilisateur est trouvé, redirigez vers la page créer groupe
      res.redirect('/creer-groupe');
    } else {
      // Si les identifiants sont incorrects, renvoyez un message d'erreur
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
    
    // Créez un nouveau User avec les données reçues dans le corps de la requête (req.body)
    const User = req.body;
    const result = await collection.insertOne(User);
    
    // Vérifiez si l'insertion a réussi
    if (result.acknowledged === true) {
      console.log(`Nouveau User créé avec l'ID: ${result.insertedId}`);
      res.status(201).json(result); // Envoie une réponse avec le document créé
    } else {
      throw new Error('Échec de l\'insertion du User');
    }
  } catch (error) {
    console.error('Erreur lors de la création du User', error);
    res.status(500).send('Erreur serveur lors de la création du User');
  } finally {
    // Assurez-vous de fermer la connexion à la base de données une fois que vous avez terminé
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
      Nom: new RegExp(searchTerm, 'i')// Recherche insensible à la casse
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
      Marque: new RegExp(searchTerm, 'i') // Recherche insensible à la casse
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



app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

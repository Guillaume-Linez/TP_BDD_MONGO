<template>
    <div>
      <h1>Créer un nouveau groupe</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nom">Nom du groupe:</label>
          <input type="text" id="nom" v-model="groupe.nom" required>
        </div>
        <div>
          <label for="ville">Ville:</label>
          <input type="text" id="ville" v-model="groupe.ville" required>
        </div>
        <div>
          <label for="codePostal">Code Postal:</label>
          <input type="text" id="codePostal" v-model="groupe.codePostal" required>
        </div>
        <!-- Ajoutez d'autres champs ici selon votre schéma de groupe -->
        <button type="submit">Créer Groupe</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const groupe = ref({
        nom: '',
        ville: '',
        codePostal: ''
        // Ajoutez d'autres propriétés ici selon votre schéma de groupe
      });
  
      const submitForm = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/data/Groupe', groupe.value);
          alert('Groupe créé avec succès avec ID: ' + response.data.insertedId);
          // Réinitialisez le formulaire ou redirigez l'utilisateur
          groupe.value = { nom: '', ville: '', codePostal: '' };
        } catch (error) {
          console.error('Il y a eu une erreur lors de la création du groupe', error);
          alert('Erreur lors de la création du groupe');
        }
      };
  
      return {
        groupe,
        submitForm
      };
    }
  };
  </script>
  
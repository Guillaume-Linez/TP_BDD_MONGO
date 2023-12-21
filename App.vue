<template>
    <div>
      <h1>Créer un nouveau membre</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nom">Nom:</label>
          <input type="text" id="nom" v-model="membre.nom" required>
        </div>
        <div>
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" v-model="membre.prenom" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="membre.email" required>
        </div>
        <!-- Ajoutez d'autres champs ici selon votre schéma de membre -->
        <button type="submit">Créer Membre</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const membre = ref({
        nom: '',
        prenom: '',
        email: ''
        // Ajoutez d'autres propriétés ici selon votre schéma de membre
      });
  
      const submitForm = async () => {
        try {
          await axios.post('http://localhost:3000/api/data/Membre', membre.value);
          alert('Membre créé avec succès!');
          // Réinitialisez le formulaire ou redirigez l'utilisateur
          membre.value = { nom: '', prenom: '', email: '' };
        } catch (error) {
          console.error('Il y a eu une erreur lors de la création du membre', error);
          alert('Erreur lors de la création du membre');
        }
      };
  
      return {
        membre,
        submitForm
      };
    }
  };
  </script>
  
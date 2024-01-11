<template>
    <div>
      <h1>Créer un nouveau membre</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="Nom">Nom:</label>
          <input type="text" id="Nom" v-model="membre.Nom" required>
        </div>
        <div>
          <label for="Prenom">Prénom:</label>
          <input type="text" id="Prenom" v-model="membre.Prenom" required>
        </div>
        <div>
          <label for="Email">Email:</label>
          <input type="email" id="Email" v-model="membre.Email" required>
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
        Nom: '',
        Prenom: '',
        Email: ''
        // Ajoutez d'autres propriétés ici selon votre schéma de membre
      });

      const submitForm = async () => {
        try {
          await axios.post('http://localhost:3000/api/data/Membre', membre.value);
          alert('Membre créé avec succès!');
          // Réinitialisez le formulaire ou redirigez l'utilisateur
          membre.value = { Nom: '', Prenom: '', Email: '' };
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
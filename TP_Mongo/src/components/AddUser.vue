<template>
    <div>
      <h1>Créer un compte</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="Nom">Nom:</label>
          <input type="text" id="Nom" v-model="user.Nom" required>
        </div>
        <div>
          <label for="Prenom">Prenom:</label>
          <input type="text" id="Prenom" v-model="user.Prenom" required>
        </div>
        <div>
          <label for="Mail">Mail:</label>
          <input type="email" id="Mail" v-model="user.Mail" required>
        </div>
        <div>
          <label for="Mot de passe">Mot de passe:</label>
          <input type="text" id="mdp" v-model="user.MDP" required>
        </div>
        <div>
          <label for="Type">Rôle :</label>
          <select id="Role" v-model="user.Role" required>
            <option v-for="item in RoleList" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <!-- Ajoutez d'autres champs ici selon votre schéma de user -->
        <button type="submit">Ajouter un utilisateur</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const user = ref({
        Nom: '',
        Prenom: '',
        Mail: '',
        MDP: '',
        Role:''
        // Ajoutez d'autres propriétés ici selon votre schéma de user
      });
  
      const submitForm = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/data/User', user.value);
          alert('user créé avec succès avec ID: ' + response.data.insertedId);
          // Réinitialisez le formulaire ou redirigez l'utilisateur
          user.value = { Nom: '', Prenom: '', Mail: '',MDP:'',Role:'' };
        } catch (error) {
          console.error('Il y a eu une erreur lors de la création du user', error);
          alert('Erreur lors de la création du user');
        }
      };
  
      return {
        RoleList: ['Admin', 'Moderateur', 'Utilisateur', 'Visiteur'],
        user,
        submitForm
      };
    }
  };
  </script>
  
<template>
  <div>
    <h1>Bienvenue sur la page web !</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="user">Mail:</label>
        <input type="text" id="Mail" v-model="user.Mail" required>
      </div>
      <div>
        <label for="mot de passe">MDP:</label>
        <input type="password" id="MDP" v-model="user.MDP" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const user = ref({
      Mail: '',
      MDP: ''
    });

    const submitForm = async () => {
      try { 
        const response = await axios.post('http://localhost:3000/api/login', user.value);
        alert('Connexion réussie');
        this.$router.push('/ajouter-materiel'); // Redirige vers la page d'accueil après la connexion
      } catch (error) {
        console.error('Erreur lors de la tentative de connexion', error);
        alert('Identifiants incorrects ou erreur serveur');
      }
    };

    return {
      user,
      submitForm,
      isAuth:false,
    };
  }
};
</script>

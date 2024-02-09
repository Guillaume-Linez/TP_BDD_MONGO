<template>
<div>
    <button @click="deleteCookie">disconnect</button>
    <button @click="setCookie">connect</button>
</div>
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
import Cookies from 'js-cookie';
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {

    let isConnected = false

    const user = ref({
      Mail: '',
      MDP: ''
    });

    const deleteCookie = () => {
      Cookies.remove('connect');
      location.reload();
    }

    const setCookie = () => {
        Cookies.set("connect", 'value');
        isConnected = true
        console.log("connect", isConnected)
        location.reload();
    }

    const submitForm = async () => {
      try { 
        const response = await axios.post('http://localhost:3000/api/login', user.value);
        alert('Connexion réussie');
        const cookie =  Cookies.set("connect", 'value');
        this.isConnected = true
        this.$router.push('/ajouter-materiel'); // Redirige vers la page d'accueil après la connexion
      } catch (error) {
        console.error('Erreur lors de la tentative de connexion', error);
        alert('Identifiants incorrects ou erreur serveur');
      }
    };

    return {
      user,
      submitForm,
      deleteCookie,
      setCookie,
      isConnected
    };
  },
  data: function(){
    return{
    //   isConnected:false
    }
  }
};
</script>
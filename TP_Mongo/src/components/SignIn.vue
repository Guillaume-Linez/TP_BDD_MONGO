<template>
  <div>
    <button @click="deleteCookie">Déconnexion</button>
    <button @click="setCookie">Connexion</button>
  </div>
  <div>
    <h1>Bienvenue sur la page web !</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="Mail">Mail:</label>
        <input type="text" id="Mail" v-model="user.Mail" required>
      </div>
      <div>
        <label for="MDP">MDP:</label>
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
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isConnected = ref(false);
    const user = ref({
      Mail: '',
      MDP: ''
    });

    const deleteCookie = () => {
      Cookies.remove('connect');
      isConnected.value = false;
      location.reload();
    };

    const setCookie = () => {
      Cookies.set("connect", 'value');
      isConnected.value = true; 
      console.log("connect", isConnected.value);
      location.reload();
    };

    const submitForm = async () => {
      try { 
        const response = await axios.post('http://localhost:3000/api/login', user.value);
        if (response.data.success) {
          Cookies.set("connect", 'value');
          isConnected.value = true;
          router.push('/ajouter-materiel');
        } else {
          alert('Identifiants incorrects ou erreur serveur');
        }
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
  }
};
</script>

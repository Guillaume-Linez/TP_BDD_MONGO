<template>
    <div>
      <h1>Ajouter du matériel</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="marque">marque du matériel:</label>
          <input type="text" id="Marque" v-model="materiel.Marque" required>
        </div>
        <div>
          <label for="numéro de série">numéro de série:</label>
          <input type="text" id="Numéro de série" v-model="materiel.Numéro_serie" required>
        </div>
        <div>
          <label for="Modèle">modèle:</label>
          <input type="text" id="Modèle" v-model="materiel.Modèle" required>
        </div>
        <div>
          <label for="groupe-select">Choisissez un groupe:</label>
          <select id="groupe-select" v-model="selectedGroupe">
            <option value="" disabled>Sélectionnez un groupe</option>
            <option v-for="groupe in groupes" :key="groupe._id" :value="groupe._id">
              {{ groupe.Nom }}
            </option>
          </select>
        </div>
        <div>
          <label for="Type">Type :</label>
          <select id="Type" v-model="materiel.Type" required>
            <option v-for="item in modeleList" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
          <label for="Prix">prix:</label>
          <input type="text" id="Prix" v-model="materiel.Prix" required>
        </div>
        <!-- Ajoutez d'autres champs ici selon votre schéma de materiel -->
        <button type="submit">Ajouter du matériel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const groupes = ref([]);
      const selectedGroupe = ref('');
      const materiel = ref({
        Numéro_serie: '',
        Marque: '',
        Modèle: '',
        Type: '',
        Prix:''
        // Ajoutez d'autres propriétés ici selon votre schéma de materiel
      });

      const fetchGroupes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/data/Groupe');
          groupes.value = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des groupes:', error);
        }
      };

      // Appelée lors du montage du composant
      onMounted(fetchGroupes);
  
      const submitForm = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/data/Materiel', materiel.value);
          alert('materiel créé avec succès avec ID: ' + response.data.insertedId);
          // Réinitialisez le formulaire ou redirigez l'utilisateur
          materiel.value = { Numéro_serie: '', Marque: '', Modèle: '',Type:'',Prix:'' };
        } catch (error) {
          console.error('Il y a eu une erreur lors de la création du materiel', error);
          alert('Erreur lors de la création du materiel');
        }
      };
  
      return {
        groupes,
        selectedGroupe,
        modeleList: ['écran', 'clavier', 'souris', 'tour', 'laptop', 'enceintes'],
        materiel,
        submitForm
      };
    }
  };
  </script>
  
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CreateMembreForm from '../src/components/CreateMemberForm.vue';
import CreateGroupeForm from '../src/components/CreateGroupeForm.vue';
import AddMaterialForm from '../src/components/AddMaterial.vue';
// Importez d'autres composants que vous souhaitez utiliser comme pages

const routes = [
  {
    path: '/creer-membre',
    name: 'CreateMembre',
    component: CreateMembreForm
  },
  {
    path: '/creer-groupe',
    name: 'CreateGroupe',
    component: CreateGroupeForm
  },
  {
    path: '/ajouter-materiel',
    name: 'AddMaterial',
    component: AddMaterialForm
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes
});

export default router;

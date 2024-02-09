<template>
  <div>
    <h2>Recherche de Commandes</h2>
    <form @submit.prevent="searchOrders">
      <input type="date" v-model="search.startDate" placeholder="Date de début" />
      <input type="date" v-model="search.endDate" placeholder="Date de fin" />

      <input list="client-list" v-model="search.clientMember" placeholder="Membre client" />
      <datalist id="client-list">
        <option v-for="client in clients" :value="client.nom" :key="client._id"/>
      </datalist>

      <input list="active-list" v-model="search.activeMember" placeholder="Membre actif" />
      <datalist id="active-list">
        <option v-for="active in activeMembers" :value="active.nom" :key="active._id"/>
      </datalist>

      <input list="material-list" v-model="search.material" placeholder="Matériel" />
      <datalist id="material-list">
        <option v-for="material in materials" :value="material.nom" :key="material._id"/>
      </datalist>

      <button type="submit">Rechercher</button>
    </form>
    <ul v-if="orders.length">
      <li v-for="order in orders" :key="order._id">
        {{ order.Nom_membre_client }} - {{ order.Nom_membre_actif }} -
        <ul>
          <li v-for="(material, index) in order.Liste_Materiel" :key="index">{{ material }}</li>
        </ul>
        - {{ new Date(order.Date).toLocaleDateString() }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        startDate: '',
        endDate: '',
        clientMember: '',
        activeMember: '',
        material: ''
      },
      orders: [],
      clients: [],
      activeMembers: [],
      materials: []
    };
  },
  methods: {
    async fetchClients(query) {
        try {
            const response = await fetch(`/api/search/clients?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.clients = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des clients: ", error);
            // Gérer l'erreur dans l'interface utilisateur
        }
    },
    async fetchActiveMembers(query) {
        try {
            const response = await fetch(`/api/search/activeMembers?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.activeMembers = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des membres actifs: ", error);
            // Gérer l'erreur dans l'interface utilisateur
        }
    },
    async fetchMaterials(query) {
        try {
            const response = await fetch(`/api/search/materials?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.materials = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des matériaux: ", error);
            // Gérer l'erreur dans l'interface utilisateur
        }
    },
    async searchOrders() {
      try {
        let baseUrl = 'http://localhost:3000';
        let queryUrl = `${baseUrl}/api/data/Commande?`;
        const params = new URLSearchParams();

        if (this.search.startDate) params.append('startDate', this.search.startDate);
        if (this.search.endDate) params.append('endDate', this.search.endDate);
        if (this.search.clientMember) params.append('clientMember', this.search.clientMember);
        if (this.search.activeMember) params.append('activeMember', this.search.activeMember);
        if (this.search.material) params.append('material', this.search.material);

        queryUrl += params.toString();

        const response = await fetch(queryUrl);
        if (!response.ok) throw new Error(`Erreur de réseau: ${response.statusText}`);
        const orders = await response.json();

        this.orders = orders.map(order => ({
          ...order,
          Liste_Materiel: Array.isArray(order.Liste_Materiel) ? order.Liste_Materiel : []
        }));
      } catch (error) {
        console.error("Erreur lors de la recherche des commandes: ", error);
      }
    }
  }
};
</script>

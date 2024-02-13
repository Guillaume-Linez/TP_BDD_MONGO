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
 <div class="grid-container" v-if="orders.length">
      <div class="grid-item" v-for="order in orders" :key="order._id">
        <div class="card">
          <h3>{{ order.Nom_membre_client }} - {{ order.Nom_membre_actif }}</h3>
          <p>Date: {{ new Date(order.Date).toLocaleDateString() }}</p>
          <p>Matériels:</p>
          <ul>
            <li v-for="(material, index) in order.Liste_Materiel" :key="index">{{ material }}</li>
          </ul>
          <p>Total: {{ order.Prix_total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 16px;
}
.grid-item {
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 10px; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
  padding: 20px; 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

.grid-item:hover {
  transform: translateY(-5px); 
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15); 
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

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
    parseMaterialList(listStr) {
    try {
      const tuples = listStr.slice(1, -1).split('), (');
      return tuples.map(tuple => {
        const parts = tuple.replace(/'/g, '').split(', ');
        return {
          code: parts[0],
          marque: parts[1],
          modele: parts[2],
          type: parts[3],
          prix: parseFloat(parts[4]),
          groupe: parts[5]
        };
      });
    } catch (error) {
      console.error("Erreur lors de l'analyse de la liste du matériel: ", error);
      return [];
    }
  },
  materialIsIncluded(materials, searchMaterial) {
    return materials.some(material => 
      material.marque.toLowerCase() === searchMaterial.toLowerCase()
    );
  },

    async fetchClients(query) {
        try {
            const response = await fetch(`/api/search/clients?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.clients = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des clients: ", error);
        }
    },
    async fetchActiveMembers(query) {
        try {
            const response = await fetch(`/api/search/activeMembers?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.activeMembers = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des membres actifs: ", error);
        }
    },
    async fetchMaterials(query) {
        try {
            const response = await fetch(`/api/search/materials?q=${query}`);
            if (!response.ok) throw new Error('Erreur de réseau');
            this.materials = await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des matériaux: ", error);
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

    queryUrl += params.toString();

    const response = await fetch(queryUrl);
    if (!response.ok) throw new Error(`Erreur de réseau: ${response.statusText}`);
    let orders = await response.json();

    // Parsez la Liste_Materiel pour chaque commande
    orders = orders.map(order => ({
      ...order,
      Liste_Materiel: this.parseMaterialList(order.Liste_Materiel)
    }));

    // Si un matériel de recherche est spécifié, filtrez les commandes
    if (this.search.material.trim()) {
      orders = orders.filter(order => 
        this.materialIsIncluded(order.Liste_Materiel, this.search.material)
      );
    }

    this.orders = orders;
  } catch (error) {
    console.error("Erreur lors de la recherche des commandes: ", error);
  }
}

  }
};
</script>

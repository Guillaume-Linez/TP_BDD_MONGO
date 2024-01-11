<template>
  <div id="app">
    <!-- Header de l'application -->
    <header>
      <h1>Mon Application Vue</h1>
      <nav>
        <!-- Liens de navigation -->
        <router-link to="/creer-membre">Créer Membre</router-link> |
        <router-link to="/creer-groupe">Créer Groupe</router-link>
        <router-link to="/ajouter-materiel">Ajouter Matériel</router-link>
        <!-- Ajoutez d'autres liens de navigation au besoin -->
      </nav>
    </header>

    <!-- Contenu de la page chargé dynamiquement en fonction de la route -->
    <main>
      <router-view/>
    </main>

    <!-- Footer de l'application -->
    <footer>
      <p>&copy; 2023 Mon Application Vue</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
  // Pas de logique spécifique dans ce composant puisque c'est le layout principal
};
</script>

<style>
/* Style global de l'application */
#app {
  text-align: center;
}

header {
  background-color: #f5f5f5;
  padding: 10px 0;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  color: #42b983;
}

main {
  margin: 20px 0;
}

footer {
  background-color: #f5f5f5;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>

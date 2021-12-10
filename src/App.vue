<template>
  <div id="nav" v-if="this.$route.path == '/' || this.$route.path == '/Registro'">
    <router-link to="/">Login</router-link> |
    <router-link to="/Registro">Registrarse</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.box1{
  width:30%;
  margin:0 auto;
}
</style>

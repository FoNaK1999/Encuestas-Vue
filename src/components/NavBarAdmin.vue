<template>
<div class="NavBarAdmin">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <router-link class="nav-link active" to="/Admin">Inicio</router-link>
                </li>
                <li class="nav-item">
                    
                </li>
                <li class="nav-item dropdown" v-if="this.$route.path == '/Admin/Pacientes' || this.$route.path == `/Admin/Profesionales` || this.$route.path == '/Admin' || this.$route.path.includes('/Admin/VerPreguntas')">
                <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Opciones
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown" >
                    <li><router-link class="dropdown-item" to="/Admin/CrearEncuesta" v-if="this.$route.path == '/Admin'">Crear Encuesta</router-link></li>
                    <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalPro" v-if="this.$route.path == '/Admin/Profesionales'">Invitar Profesional</button></li>
                    <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalPreg" v-if="this.$route.path.includes('/Admin/VerPreguntas')">Crear Pregunta</button></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><router-link class="dropdown-item" to="/Admin/Profesionales" v-if="this.$route.path == '/Admin' || this.$route.path == '/Admin/Pacientes'">Profesionales</router-link></li>
                    <li><router-link class="dropdown-item" to="/Admin/Pacientes" v-if="this.$route.path == '/Admin' || this.$route.path == '/Admin/Profesionales'">Pacientes</router-link></li>
                </ul>
                </li>
            </ul>
            <form class="d-flex">
                <button class="btn btn-danger" type="button" @click="Logout()">Logout</button>
            </form>
            </div>
        </div>
        </nav>
</div>
</template>

<script>
export default {
  name: 'NavBarAdmin',
  methods:{
      Logout(){
        localStorage.clear();
        window.location.href = '/';
        //this.$router.replace({ path: '/' })
      }
  }
}
</script>

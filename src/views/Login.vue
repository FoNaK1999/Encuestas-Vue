<template>
  <div class="Login">
    <div class="box1">
    <form v-on:submit.prevent="IniciarSesion">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
        <input type="email" class="form-control" v-model="usuario.correo" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
        <input type="password" class="form-control" v-model="usuario.password" id="exampleInputPassword1" placeholder="Contraseña" required>
      </div>
      <button type="submit" class="btn btn-primary">Inicio Sesion</button>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      usuario:{}
    }
  },
  methods:{
    IniciarSesion(){
      let datosEnviar = {
        correo:this.usuario.correo,
        password:this.usuario.password
      }
      fetch('http://localhost:3000/IngresarUsuario/login',{
        method:"POST",
        body:JSON.stringify(datosEnviar),
        headers:{
          'Content-type':'application/json'
        }
      })
      .then(respuesta=>respuesta.json())
      .then(datosRespuesta=>{
        //alert('datos usuario:  ' + datosRespuesta.nombre + " | " + datosRespuesta.rol);
        //console.log('TOKEN:  ' + JSON.stringify(datosRespuesta.token));
        if(datosRespuesta.status == '1'){

          localStorage.token = datosRespuesta.token;
          
          switch(datosRespuesta.rol){
            case 1:
              window.location.href = '/Admin';
              break;
            case 2:
              window.location.href = '/Profesional';
              break;
            case 3:
              window.location.href = '/Pacientes';
            break;
            default:
              window.location.href = '/';
          }
          
        }else if(datosRespuesta == '2'){
          alert('Correo y/o usuario incorrectos');
        }else if(datosRespuesta == '3'){
          alert('Falló el inicio de sesion');
        }else if(datosRespuesta == '4'){
          alert('Falta la contraseña');
        }else if(datosRespuesta == '5'){
          alert('Correo invalido');
        }
      })
    },
  }
}
</script>

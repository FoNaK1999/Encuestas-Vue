<template>
  <div class="Registro">
    <form v-on:submit.prevent="agregarUsuario">
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Nombre </label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="usuario.nombre" id="exampleInputName" name="nombre" required>
        </div>
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Correo electronico </label>
          <input type="email" placeholder="Correo" class="form-control" v-model="usuario.correo" id="exampleInputEmail1" aria-describedby="emailHelp" name="correo" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña </label>
          <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.password1" id="exampleInputPassword1" name="pass" required>
        </div>
        <div class="mb-3">
              <label for="exampleInputPassword2" class="form-label">Repite la contraseña </label>
          <input type="password" placeholder="Repita la contraseña" class="form-control" v-model="usuario.password2" id="exampleInputPassword2" name="pass2" required>
        </div>
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </form>
  </div>
</template>

<style>
  .Registro{
    width:30%;
    margin:0 auto;
  }

</style>

<script>
export default {
  data(){
    return{
        usuario:{}
    }
  },
  methods:{
    agregarUsuario(){

      let datosEnviar={
        nombre:this.usuario.nombre,
        correo:this.usuario.correo,
        password1:this.usuario.password1,
        password2:this.usuario.password2
      }

      fetch('https://sys-encuestas-api.herokuapp.com/IngresarUsuario',{
          method:"POST",
          body:JSON.stringify(datosEnviar),
          headers:{
            'Content-Type': 'application/json'
          }
      })
      .then(respuesta=>respuesta.json())
      .then(datosRespuesta=>{

        switch(datosRespuesta.status){
            case 'Ok':
              alert(datosRespuesta.msg);
              window.location.href = '/';
            break;
            case 'Empty':
              alert(datosRespuesta.msg);
            break;
            case 'EmailInvalid':
              alert(datosRespuesta.msg);
            break;
            case 'UserExist':
              alert(datosRespuesta.msg);
            break;
            case 'PassDist':
              alert(datosRespuesta.msg);
            break;
        }


      })

    }
  }
}
</script>
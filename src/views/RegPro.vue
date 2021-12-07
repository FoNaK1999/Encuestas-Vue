<template>
  <div class="RegPro">
    <form v-on:submit.prevent="agregarUsuario">
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Nombre </label>
          <input type="text" class="form-control" v-model="usuario.nombre" placeholder="Nombre" id="exampleInputName" name="nombre" required>
        </div>
        <div class="mb-3"> 
        <label for="exampleInputEmail1" class="form-label">Correo electronico </label>
          <input type="email" class="form-control" v-model="usuario.correo" placeholder="Correo Electronico" id="exampleInputEmail1" aria-describedby="emailHelp" name="correo" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña </label>
          <input type="password" class="form-control" v-model="usuario.password1" placeholder="Contraseña" id="exampleInputPassword1" name="pass" required>
        </div>
        <div class="mb-3">
              <label for="exampleInputPassword2" class="form-label">Repite la contraseña </label>
          <input type="password" class="form-control" v-model="usuario.password2" placeholder="Repite la contraseña" id="exampleInputPassword2" name="pass2" required>
        </div>
      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<style>
  .RegPro{
    width:30%;
    margin:5% auto;
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

      fetch('https://sys-encuestas-api.herokuapp.com/IngresarUsuario/IngresarProfesional',{
          method:"POST",
          body:JSON.stringify(datosEnviar),
          headers:{
            'Content-Type': 'application/json'
          }
      })
      .then(respuesta=>respuesta.json())
      .then(datosRespuesta=>{
          if(datosRespuesta == 'Profesional Ingresado'){
            alert('Profesional Ingresado');
            window.location.href = '/';
          }else if(datosRespuesta == 'Existe el Profesional'){
            alert('Existe el Profesional');
          }else if(datosRespuesta == 'Las claves no son iguales'){
            alert('Las claves no son iguales');
          }else if(datosRespuesta == 'Faltan datos'){
            alert('Faltan datos');
          }
      })

    }
  }
}
</script>
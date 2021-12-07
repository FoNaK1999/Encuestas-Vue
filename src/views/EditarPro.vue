<template>
    <!--NavBar-->
    <div>
        <NavBarAdmin />
    </div>
    <div class="EditarPro">
        <form v-on:submit.prevent="ActualizarProfesional">
            <div v-for="data in Datos" :key = "data.id_usu">
                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input type="text" v-model="data.nombre_usu" class="form-control" placeholder="Nombre de la persona" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Correo</label>
                    <input type="email" v-model="data.correo_usu" class="form-control" placeholder="Correo" id="exampleInputPassword1">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-success">Guardar Cambios</button>
                </div>
                <router-link class="btn btn-danger" to="/Admin/Profesionales">Volver</router-link>
            </div>
        </form>
    </div>
</template>

<style>
  .EditarPro{
    width:30%;
    margin:0 auto;
  }
</style>

<script>
import NavBarAdmin from '@/components/NavBarAdmin.vue'


export default {
  name:'EditarPro',
  components:{
    NavBarAdmin
  },    
  data(){
      return{
        Datos:[],
      }
  },
  created(){
      this.PoblarCampos();
      this.ValidarAdmin();

  },
  methods:{
    ValidarAdmin(){
          let datosToken = {
            token:localStorage.getItem('token'),
          }

          fetch('http://localhost:3000/Admin' , {
            method:"POST",
            body:JSON.stringify(datosToken),
            headers:{
              'Content-Type': 'application/json'
            }
        })
          .then(respuesta=>respuesta.json())
          .then((datosRespuesta)=>{
            console.log(datosRespuesta)
            if(datosRespuesta.status == 'error2'){
              alert(datosRespuesta.msg);
              history.back();
            }
          })
          .catch(console.log)
    },
    PoblarCampos(){
        let id = this.$route.params.id;

        let datosEnviar = {
          token:localStorage.getItem('token'),
          id
        }
        
        fetch('http://localhost:3000/Admin/Profesionales/EditarGETPro' , {
          method:"POST",
          body:JSON.stringify(datosEnviar),
          headers:{
            'Content-Type': 'application/json'
          }
      })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

          this.Datos = [];
          if(typeof datosRespuesta[0].success === 'undefined'){
            this.Datos = datosRespuesta;
          }
        })
        .catch(console.log)
    },
    ActualizarProfesional(){
        let id = this.$route.params.id;

        let datosEnviar2 = {
          token:localStorage.getItem('token'),
          id,
          nombre:this.Datos[0].nombre_usu,
          correo:this.Datos[0].correo_usu
        }

        fetch('http://localhost:3000/Admin/Profesionales/EditarPro' , {
          method:"POST",
          body:JSON.stringify(datosEnviar2),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

            if(datosRespuesta.status == 'Ok'){
                alert(datosRespuesta.msg);
                window.location.href = '/Admin/Profesionales';
            }else if(datosRespuesta.status == 'Empty'){
                alert(datosRespuesta.msg);
            }else{
                alert(datosRespuesta.msg);
            }                   

        })
        .catch(console.log)
    }
  }
}
</script>
<template>
    <!--NavBar-->
    <div>
        <NavBarAdmin />
    </div>
    <router-view/>
    <!--Fin NavBar-->
    <div class="Pacientes">
      <table class="table">
        <thead>
          <tr>
            <!--<th scope="col">#</th>-->
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="pacientes in Pacientes" :key = "pacientes.id_usu">
          <tr>
            <!--<th scope="row">{{pacientes.id_usu}}</th>-->
            <td>{{pacientes.nombre_usu}}</td>
            <td>{{pacientes.correo_usu}}</td>
            <td v-if="pacientes.estado_usu == 1">Activo</td>
            <td v-if="pacientes.estado_usu == 2">Deshabilitado</td>
            <td><button class="btn btn-primary" @click="EditarPaciente(pacientes.id_usu)" >Editar</button> <button v-if="pacientes.estado_usu == 1" class="btn btn-danger" @click="EliminarPaciente(pacientes.id_usu)" >Eliminar</button> <button v-if="pacientes.estado_usu == 2" class="btn btn-warning" @click="ActivarPaciente(pacientes.id_usu)" >Restablecer</button></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import NavBarAdmin from '@/components/NavBarAdmin.vue'


export default {
  name:'Pacientes',
  components:{
    NavBarAdmin
  },
    data(){
      return{
        Pacientes:[]
      }
    },
    created:function(){
        this.ObtenerPacientes();
        this.ValidarAdmin();
    },
    methods:{
      ValidarAdmin(){
          let datosToken = {
            token:localStorage.getItem('token'),
          }

          fetch('https://sys-encuestas-api.herokuapp.com/Admin' , {
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
      ObtenerPacientes(){
        let datosToken = {
          token:localStorage.getItem('token'),
        }

        fetch('https://sys-encuestas-api.herokuapp.com/Admin/Pacientes' , {
          method:"POST",
          body:JSON.stringify(datosToken),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

          this.Pacientes = [];
          if(typeof datosRespuesta[0].success === 'undefined'){
            this.Pacientes = datosRespuesta;
          }
        })
        .catch(console.log)
        },
        EditarPaciente(id){
            this.$router.push({
            name: "EditarPac",
            params:{
                id
            }
            });
        },
        EliminarPaciente(id){
            let datos = {
                token:localStorage.getItem('token'),
                id
            }
            fetch('https://sys-encuestas-api.herokuapp.com/Admin/Pacientes/EliminarPac' , {
            method:"POST",
            body:JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
            })
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{

                if(datosRespuesta.status == 'Ok'){
                    this.ObtenerPacientes();
                    alert(datosRespuesta.msg);
                }else{
                    alert(datosRespuesta.msg);
                }
            })
            .catch(console.log)
        },
        ActivarPaciente(id){
            let datos = {
                token:localStorage.getItem('token'),
                id
            }

            fetch('https://sys-encuestas-api.herokuapp.com/Admin/Pacientes/ActivarPac' , {
            method:"POST",
            body:JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
            })
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{

                if(datosRespuesta.status == 'Ok'){
                    this.ObtenerPacientes();
                    console.log(this.$route.path)
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

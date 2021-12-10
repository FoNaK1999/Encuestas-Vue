<template>
  <div class="Admin">  
        <!--NavBar-->
        <div>
          <NavBarAdmin />
        </div>
      <router-view/>
      <!--Fin NavBar-->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="encuesta in Encuestas" :key = "encuesta.id_enc">
          <tr>
            <th scope="row">{{encuesta.id_enc}}</th>
            <td>{{encuesta.titulo_enc}}</td>
            <td>{{encuesta.estado_enc}}</td>
            <td><button class="btn btn-success" @click="VerPreguntas(encuesta.id_enc)">Ver Preguntas</button></td>
          </tr>
        </tbody>
      </table>
  </div>

<!-- Modal -->
<div ref="el" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form v-on:submit.prevent="CrearEncuesta">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Titulo</span>
            <input type="text" class="form-control" v-model="CEncuesta.titulo" aria-label="Sizing example input" placeholder="Ingrese un titulo para la encuesta" aria-describedby="inputGroup-sizing-default">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="CrearEncuesta()" class="btn btn-success">Guardar</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
  
</div>
<!--Fin Modal-->
</template>

<script>
import NavBarAdmin from '@/components/NavBarAdmin.vue'


export default {
  name:'Admin',
  components:{
    NavBarAdmin
  },
  data(){
      return{
        Encuestas:[],
        CEncuesta:[]
      }
    },
    created:function(){
      this.ValidarAdmin();
      this.consultarEncuestas();
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
          if(datosRespuesta.status == 'error2'){
            alert(datosRespuesta.msg);
            history.back();
          }
        })
        .catch(console.log)
        

      },
      consultarEncuestas(){

        let datosToken = {
          token:localStorage.getItem('token'),
          
        }

        fetch('https://sys-encuestas-api.herokuapp.com/Admin/CargarEncuestas' , {
          method:"POST",
          body:JSON.stringify(datosToken),
          headers:{
            'Content-Type': 'application/json'
          }
      })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

          this.Encuestas = [];
          if(typeof datosRespuesta[0].success === 'undefined'){
            this.Encuestas = datosRespuesta;
          }
        })
        .catch(console.log)
      },
      CrearEncuesta(){

        let datosEncuesta = {
          titulo:this.CEncuesta.titulo,
          token:localStorage.getItem('token'),
        }

        fetch('https://sys-encuestas-api.herokuapp.com/Admin/CrearEncuesta',{
          method:"POST",
          body:JSON.stringify(datosEncuesta),
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
          const {msg} = datosRespuesta;
          this.consultarEncuestas();
          alert(msg);

        })
        .catch(console.log)
      },
      VerPreguntas(idenc){
        this.$router.push({
          name: "VerPreguntas",
          params:{
            idenc: idenc,
          }
        });
      }
    }
}

</script>



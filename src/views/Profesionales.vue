<template>
    <!--NavBar-->
    <div>
        <NavBarAdmin />
    </div>
    <router-view/>
    <!--Fin NavBar-->
    <div class="Profesionales">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="profesional in Profesionales" :key = "profesional.id_usu">
          <tr>
            <th scope="row">{{profesional.id_usu}}</th>
            <td>{{profesional.nombre_usu}}</td>
            <td>{{profesional.correo_usu}}</td>
            <td v-if="profesional.estado_usu == 1">Activo</td>
            <td v-if="profesional.estado_usu == 2">Deshabilitado</td>
            <td><button class="btn btn-primary" @click="EditarProfesional(profesional.id_usu)" >Editar</button> <button v-if="profesional.estado_usu == 1" class="btn btn-danger" @click="EliminarProfesional(profesional.id_usu)" >Eliminar</button> <button v-if="profesional.estado_usu == 2" class="btn btn-warning" @click="ActivarProfesional(profesional.id_usu)" >Restablecer</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalPro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form v-on:submit.prevent="InvitarProfesional">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Correo Profesional</span>
                    <input type="email" v-model="Profesional.correo" ref="inputModal" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="InvitarProfesional()">Enviar</button>
            <button type="button" class="btn btn-danger" ref="btnCerrarModal" data-bs-dismiss="modal">Cerrar</button>
        </div>
        </div>
    </div>
    </div>

</template>

<script>
import NavBarAdmin from '@/components/NavBarAdmin.vue'


export default {
  name:'Profesionales',
  components:{
    NavBarAdmin
  },
  data(){
      return{
          Profesionales:[],
          Profesional:[]
      }
  },
  created:function(){
    this.ObtenerProfesionales();
    this.ValidarAdmin();
    setInterval(() => {this.ObtenerProfesionales()}, 5000) 

    
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
    ObtenerProfesionales(){
      
        let datosToken = {
          token:localStorage.getItem('token'),
        }

        fetch('http://localhost:3000/Admin/Profesionales' , {
          method:"POST",
          body:JSON.stringify(datosToken),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

          this.Profesionales = [];
          if(typeof datosRespuesta[0].success === 'undefined'){
            this.Profesionales = datosRespuesta;
          }
        })
        .catch(console.log)
    },
    EditarProfesional(id){
        this.$router.push({
        name: "EditarPro",
        params:{
            id
        }
        });
    },
    InvitarProfesional(){
        let datosEncuesta = {
          token:localStorage.getItem('token'),
          correo:this.Profesional.correo
        }

        fetch('http://localhost:3000/Admin/Profesionales/InvitarPro',{
          method:"POST",
          body:JSON.stringify(datosEncuesta),
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
          const {msg} = datosRespuesta;
          const cerrar = this.$refs.btnCerrarModal;
          this.Profesional.correo = '';
          cerrar.click();
          alert(msg);

        })
        .catch(console.log)
    },
    EliminarProfesional(id){
        let datosEnviar = {
          token:localStorage.getItem('token'),
          id
        }

        fetch('http://localhost:3000/Admin/Profesionales/EliminarPro' , {
          method:"POST",
          body:JSON.stringify(datosEnviar),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
          if(datosRespuesta.status == 'Ok'){
            alert(datosRespuesta.msg);
          }else if(datosRespuesta.status == 'Empty'){
            alert(datosRespuesta.msg);
          }else{
            alert(datosRespuesta.msg);
          }
          
        })
        .catch(console.log)
    },
    ActivarProfesional(id){
        let datosEnviar = {
          token:localStorage.getItem('token'),
          id
        }

        fetch('http://localhost:3000/Admin/Profesionales/ActivarPro' , {
          method:"POST",
          body:JSON.stringify(datosEnviar),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
          if(datosRespuesta.status == 'Ok'){
            alert(datosRespuesta.msg);
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
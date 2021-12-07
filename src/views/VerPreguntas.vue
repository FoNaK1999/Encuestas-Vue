<template>
    <!--NavBar-->
    <div>
        <NavBarAdmin />
    </div>
    <!--Fin NavBar-->
    <div class="Pacientes">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Encabezado</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="pregunta in Preguntas" :key = "pregunta.id_preg">
          <tr>
            <th scope="row">{{pregunta.id_preg}}</th>
            <td>{{pregunta.encabezado_preg}}</td>
            <td v-if="pregunta.estado_preg == 1">Activo</td>
            <td v-if="pregunta.estado_preg == 2">Deshabilitado</td>
            <td><button class="btn btn-primary" @click="EditarPaciente(pregunta.id_preg)" >Editar</button> <button v-if="pregunta.estado_preg == 1" class="btn btn-danger" @click="EliminarPaciente(pregunta.id_usu)" >Eliminar</button> <button v-if="pregunta.estado_usu == 2" class="btn btn-warning" @click="ActivarPaciente(pregunta.id_usu)" >Restablecer</button></td>
          </tr>
        </tbody>
      </table>
    </div>

<!-- Modal -->
<div class="modal fade" id="exampleModalPreg" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Pregunta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{alternativas}}
        <form>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Encabezado</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <button class="btn btn-success text-black" type="button" @click="AgregarAlternativa()">Agregar Alternativa</button>
            <ul v-for="(alter,index) in alternativas" :key = "alter.id">
                <li>
                    <input v-model = "alter.text" type="text" class="form-control" :placeholder="`Alternativa ${index}`" >
                </li>
                <button type="button" class="btn btn-danger" @click="EliminarAlternativa(counter)">Eliminar</button> 
            </ul>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success">Guardar</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBarAdmin from '@/components/NavBarAdmin.vue'

export default {
    name:'VerPreguntas',
    components:{
        NavBarAdmin
    },
    data(){
        return{
            Preguntas:[],
            alternativas:[{id:0, text:""}],
            counter:1
        }
    },
    created(){
        this.RecibirParametro()
    },
    methods:{
        RecibirParametro(){
            let idenc = this.$route.params.idenc;
            console.log(idenc);
        },
        AgregarAlternativa(){
            this.alternativas.push({
                id:this.alternativas.length,
                text: ""
            });
            this.counter += 1;
        },
        EliminarAlternativa(id){
            console.log('ID alternativa: '+id);
            //this.alternativas.indexOf(id);
            this.alternativas.splice(id,1);
        },
    }
}
</script>
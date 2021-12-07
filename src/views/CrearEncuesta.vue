<template>
        <!--NavBar-->
        <div>
          <NavBarAdmin />
        </div>
      <router-view/>
    <div class="CrearEncuesta">
        <form v-on:submit.prevent="CrearEncuesta">
        <div class="titulo">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Titulo</span>
                <input type="text" class="form-control" v-model="titulo.title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <button class="btn btn-primary" type="button" @click="AgregarPregunta(count)">Agregar Pregunta</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Preguntas</th>
                    <th scope="col">Alternativas</th>
                    <th scope="col">Opciones Alternativas</th>
                </tr>
            </thead>
            <tbody>
                <!--Preguntas-->
                <tr v-for="(preg) in preguntas" :key = "preg.id">
                    <input type="text" ref="idpreg" v-model="preg.id" style="display:none">
                    <td scope="row">
                        <div class="input-group">
                            <input type="text" class="form-control" :placeholder="`Pregunta`" v-model = "preg.text">
                            <button type="button" class="btn btn-danger" @click="EliminarPregunta(preg.id)">Eliminar Pregunta</button>
                        </div>
                    </td>
                    <!--Alternativas-->
                    <td>
                        <ul class="lista" v-for="(alter,index) in preg.alternativas" :key = "alter.id">
                            <li>
                                <div class="input-group">
                                    <input v-model = "alter.text" type="text" class="form-control" :placeholder="`Alternativa ${index + 1}`" >
                                    <button type="button" class="btn btn-danger" @click="EliminarAlternativa(preg,index)">Eliminar</button>
                                </div>
                            </li>
                            
                        </ul> 
                    </td>
                    <!--Opciones Alternativa-->
                    <td>
                        <button class="btn btn-primary text-black" type="button" @click="AgregarAlternativa(preg)">Agregar</button>  
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="submit" class="btn btn-success" value="Guardar">
        </form>
    </div>
</template>

<style>
    .titulo{
        width:30%;
        margin:2% auto;
    }
    .lista li{
        list-style: none;
    }
</style>

<script>

import NavBarAdmin from '@/components/NavBarAdmin.vue'

export default {
    name:'CrearEncuesta',
    components:{
        NavBarAdmin
    },
    data(){
        return{
            preguntas:[{id:0,text:"",alternativas:[{id:0, text:""}]}],
            titulo:[],
            count:1,
            count2:1,
        }
    },
    methods:{
        AgregarPregunta(){
            this.preguntas.push({
                id:this.count,
                text:"",
                alternativas:[
                    {
                        id:this.count2,
                        text:""
                    }
                ]
            })
            this.count += 1;
            this.count2 += 1;
        },
        AgregarAlternativa(preg){
            preg.alternativas.push({
                id:this.count2,
                text: ""
            });
            this.count2 += 1;
        },
        EliminarAlternativa(preg,idalt){
            //console.log(preg)
            //console.log(idalt);
            preg.alternativas.splice(idalt,1);
        },
        EliminarPregunta(id){
            this.preguntas.splice(id,1);
            //this.alternativas.splice(id,1);
        },
        CrearEncuesta(){

        let datosEnviar2 = {
          token:localStorage.getItem('token'),
          preg:this.preguntas,
          titulo:this.titulo.title

        }

        fetch('http://localhost:3000/Admin/CrearEncuesta2' , {
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
                window.location.href = '/Admin/Pacientes';
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





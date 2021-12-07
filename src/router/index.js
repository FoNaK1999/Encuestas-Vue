import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import CrearEncuesta from '../views/CrearEncuesta.vue'
import VerPreguntas from '../views/VerPreguntas'
import Pacientes from '../views/Pacientes.vue'
import EditarPac from '../views/EditarPac.vue'
import Profesionales from '../views/Profesionales.vue'
import EditarPro from '../views/EditarPro.vue'
import RegPro from '../views/RegPro.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Registro',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/Admin',
    name: 'Admin',
    component:Admin
  },
  /*{
    path:'/CargarEncuesta',
    name:'CargarEncuesta',
    component:CargarEncuestas
  },*/
  {
    path:'/Admin/CrearEncuesta',
    name:'CrearEncuesta',
    component:CrearEncuesta
  },
  {
    path:'/Admin/VerPreguntas/:idenc',
    name:'VerPreguntas',
    component:VerPreguntas
  },
  {
    path:'/Admin/Pacientes',
    name:'Pacientes',
    component:Pacientes
  },
  {
    path:'/Admin/Pacientes/EditarPac/:id',
    name:'EditarPac',
    component:EditarPac
  },
  {
    path:'/Admin/Profesionales',
    name:'Profesionales',
    component:Profesionales
  },
  {
    path:'/Admin/Profesionales/EditarPro/:id',
    name:'EditarPro',
    component:EditarPro
  },
  {
    path:'/Profesional/RegPro',
    name:'RegPro',
    component:RegPro
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

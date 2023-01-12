import { createWebHistory, createRouter } from "vue-router";
import homeLogin from "@/views/homeLogin.vue";
import  indexUsers from "../views/users/indexUsers.vue";
import createUsers from "../views/users/createUsers.vue";
import updateUsers from '../views/users/updateUsers.vue';

const routes = [
  {
    path: "/",
    name: "homeLogin",
    component: homeLogin,
  },
  {
    path: "/users",
    name: "Users",
    component: indexUsers,
  },
  {
    path: "/crear-users",
    name: "crearUsers",
    component: createUsers,
  },
  {
    path: "/update-users/:id",
    name: "updateUsers",
    component: updateUsers,
  },
  // customer
  {
    path:"/customer",
    name: "indexCustomer",
    component: () => import('../views/customer/indexCustomer.vue')
  },
  {
    path:"/create/customer",
    name: "createCustomer",
    component: () => import('../views/customer/createCustomer.vue')
  },
  {
    path:"/update/customer/:id",
    name: "updateCustomer",
    component: () => import('../views/customer/updateCustomer.vue')
  },
  // movies
  {
    path:"/movies",
    name: "indexMovie",
    component: () => import('../views/movie/indexMovie.vue')
  },
  {
    path:"/movies/create",
    name: "createMovie",
    component: () => import('../views/movie/createMovie.vue')
  },
  {
    path:"/movies/update/:id",
    name: "updateMovie",
    component: () => import('../views/movie/updateMovie.vue')
  },
  // Renta
  {
    path:"/alquile/create",
    name: "createRent",
    component: () => import('../views/rent/createRent.vue')
  },
  {
    path:"/alquile",
    name: "indexRent",
    component: () => import('../views/rent/indexRent.vue')
  },
  {
    path:"/rent/update/:id",
    name: "updateRent",
    component: () => import('../views/rent/updateRent.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
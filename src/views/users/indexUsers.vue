<template>
  <section class="users">
      <div class="container">
          <div class="row" v-show="isAdmin">
              <div class="col-12">
                  <div class="add-user">
                      <router-link to="/crear-users" class="add-user">Agregar nuevo</router-link>
                  </div>
              </div>
              <div class="col-12">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Nombre de usuario</th>
                              <th scope="col">Email</th>
                              <th scope="col">Rol</th>
                              <th scope="col-2"></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="user in result" v-bind:key="user.id">
                              <td scope="col" class="user-date">
                                {{ user.name }}
                                <input type="hidden" name="id" class="id-user">
                              </td>
                              <td scope="col">{{ user.user_name }}</td>
                              <td>{{ user.email }}</td>
                              <td>{{ user.roles[0].name }}</td>
                              <th scope="col-2">
                                <router-link  :to="{path: `/update-users/${user.id}`}" class="update-user">Editar</router-link>
                              </th>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div class="row is-not-admin" v-show="!isAdmin">
            <div class="col-12">
              <div class="card">
                <div class="card-header alert alert-danger">
                  <h2>No tienes permiso para este módulo</h2>
                </div>
                <div class="card-body">
                  <p>
                    Con tu rol, solo tienes permiso al CRUD de clientes, peliculas y alquiler.<br>
                    Por favor regresa a una de estas áreas.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
  </section>
</template>
<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'usersRead',
  data(){
    return{
        result: null,
        isAdmin:false
    }
  },
  async created(){
      var user = localStorage.getItem('id');
      axios.get("http://127.0.0.1:8000/api/logged?id=" + user).then((result) => {
          this.result = result.data;
          result = result.data.data[0].rol[0].name;
          if(result == 'admin'){
              this.isAdmin = true;
              axios.get("http://127.0.0.1:8000/api/read/user").then((result) => {
                this.result = result.data;
              });
          }
      });
  },
};

</script>
<style>
  .users{
    height: 100vh;
    position: relative;
  }
  .is-not-admin{
    position: absolute;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .add-user{
      background: #007bff;
      color: white;
      cursor: pointer;
      width: fit-content;
      padding: 5px 20px;
      margin-bottom: 2rem;
  }
  .add-user a:hover{
      color: white;
      text-decoration: none;
  }
  td{
    text-align: left;
  }
  .update-user{
    background: #28a745;
    color: white;
    padding: 3px 12px;
    cursor: pointer;
    border: none;
  }
  .update-user:hover{
    color: white;
    text-decoration: none;
  }
</style>
<template>
  <div id="nav" v-if="islogin ? true : false">
    <router-link to="/users" v-if="admin ? true : false" class="users-link">Usuarios</router-link> <span v-show="admin">| </span>
    <router-link to="/customer">Clientes</router-link> |
    <router-link to="/movies">Peliculas</router-link> |
    <router-link to="/alquile">Alquile</router-link> |
    <span class="logout" v-on:click="logout">cerrar sesión</span>
  </div>
  <router-view />
</template>
<script>
  import axios from "axios";
  export default{
    data(){
      return{
          result: null,
          islogin:false,
          admin: false,
          user: 0
      }
    },
    created(){
        this.user = localStorage.getItem('id');
    },
    methods:{
      logout(){
          localStorage.clear();
          setTimeout(function(){
              window.location.href = '/';
          }, 500);
      }
    },
    watch:{
      user(){
        if(this.user == null){
          this.islogin = false;
        }else{
          axios.get("http://127.0.0.1:8000/api/logged?id=" + this.user).then((result) => {
              this.result = result.data;
              result = result.data.data[0].rol[0].name;
              this.islogin = true;
              if(result == 'admin'){
                  this.admin = true;
              }
          });
        }
      }
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logout{
  color: #007bff;
  cursor: pointer;
}
.logout:hover{
  color: #0056b3;
  text-decoration: underline;
}
</style>

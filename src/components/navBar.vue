<template>
    <div id="nav" v-show="islogin">
        <router-link to="/users" v-show="admin" class="users-link">Usuarios</router-link> <span v-show="admin">| </span>
        <router-link to="/customer">Clientes</router-link> |
        <router-link to="/movies">Peliculas</router-link> |
        <router-link to="/alquile">Alquile</router-link> |
        <span class="logout">cerrar sesión</span>
    </div>
</template>
<script>
    import $ from 'jquery';
    import axios from "axios";
    export default{
        data(){
            return{
                result: null,
                islogin:false,
                admin: false
            }
        },
        created(){
            
            var user = localStorage.getItem('id');
            if(user == 0){
                this.islogin = false;
                console.log('se deslogueo' + this.islogin);
            }else{
                axios.get("http://127.0.0.1:8000/api/logged?id=" + user).then((result) => {
                    this.result = result.data;
                    result = result.data.data[0].rol[0].name;
                    this.islogin = true;
                    if(result == 'admin'){
                        this.admin = true;
                    }
                });
            }
        },
        mounted: function(){
            $('.logout').on('click', function(){
                localStorage.setItem('id', 0);
                setTimeout(function(){
                    window.location.href = '/';
                }, 2000);
            });
        }
    }
</script>
<style>
    #app{
        margin-top: 0;
    }
    .logout{
        color: #007bff;
        cursor: pointer;
    }
    .logout:hover{
        text-decoration: underline;
        color: #0056b3;
    }
</style>
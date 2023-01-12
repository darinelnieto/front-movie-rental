<template>
    <section class="form-create-user">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario para crear un usuario</h1>
                    <form id="form-register-user" method="post">
                        <div class="form-group">
                            <input type="text" name="name" id="name" class="form-control" placeholder="Nombre completo">
                        </div>
                        <div class="form-group">
                            <input type="text" name="user_name" id="user-name" class="form-control" placeholder="Nombre de usuario">
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" id="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña">
                        </div>
                        <div class="form-group">
                            <label class="label-rol ml-5 mr-5" v-for="item in role" v-bind:key="item.id">
                                <input type="radio" name="role_id" class="role-id form-control" v-bind:value="item.id"> {{ item.name }}
                            </label>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary summit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import axios from "axios";
 
export default {
    name: 'createUser',
    props: {
        create: String
    },
    data: () => ({
        role: null
    }),
    // get role with axios
    async created(){
        axios.get("http://127.0.0.1:8000/api/read/role").then((role) => {
            this.role = role.data;
        });
    },
    // jquery
    mounted: function() {
        $('#form-register-user').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/create/user',
                method:'post',
                data:{
                    name:$('#name').val(),
                    user_name:$('#user-name').val(),
                    email:$('#email').val(),
                    password:$('#password').val(),
                    role_id:$('input:radio[name=role_id]:checked').val()
                }
            });
            setTimeout(function(){
                window.location.href = '/users';
            }, 2000);
            e.preventDefault();
        });
    } 
  
};
</script>
<template>
    <section class="form-create-user">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario para crear un usuario</h1>
                    <input type="hidden" value=""> 
                    <form id="form-update-user" method="post">
                        <div class="form-group">
                            <input type="hidden" name="id" v-model="id" class="id-user">
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" name="user_name" id="user-name" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" id="email" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña" autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label class="label-rol form-control"  v-for="item in role" v-bind:key="item.id">
                                <input type="radio" name="role_id" v-bind:class="item.name" v-bind:value="item.id"> {{ item.name }}
                            </label>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-sm btn-primary summit-btn ml-2 mr-2">Actualizar</button>
                            <button class="btn btn-sm btn-danger delet ml-2 mr-2">Eliminar</button>
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
    name: 'updateUser',
    props: {
        create: String
    },
    data(){
        return{
            role: null,
            id: this.$route.params.id
        }
    },
    // get role with axios
    async created(){
        axios.get("http://127.0.0.1:8000/api/read/role").then((role) => {
            this.role = role.data;
        });
    },
    // jquery
    mounted: function() {
        $(document).ready(function(){
            var user = $('.id-user').val();
            var api = `http://127.0.0.1:8000/api/user?id=${user}`;
            $.ajax({
                type:'GET',
                url:api
            }).done(function(data){
                var Json = data.data;
                var item;
                for(item of Json){
                   $('#name').val(item[0].name);
                   $('#user-name').val(item[0].user_name);
                   $('#email').val(item[0].email);
                   $('.'+item[0].rol[0].name).attr("checked",true);
                }
            });
        });
        // update
        $('#form-update-user').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/update/user',
                method:'post',
                data:{
                    id: $('.id-user').val(),
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
        $('.delet').on('click', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/delete/user',
                method:'post',
                data:{
                    id: $('.id-user').val()
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
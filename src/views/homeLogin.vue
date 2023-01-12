<template>
    <section class="mt-5">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-12 col-md-6">
                    <div class="content-login">
                        <h1 class="mb-3">Ingrear</h1>
                        <div class="message-error"></div>
                        <form @submit.prevent="login">
                            <div class="form-group text-left">
                                <label>Email</label>
                                <input type="email" v-model="email" class="form-control">
                            </div>
                            <div class="form-group text-left">
                                <label>Contraseña</label>
                                <input type="password" v-model="password" class="form-control">
                            </div>
                            <div class="form-grou">
                                <button type="submit" class="btn btn-sm btn-primary login">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import axios from "axios";
    import $ from 'jquery';

    export default{
        'name': 'homeLogin',
        data(){
            return{
                'email': '',
                'password': '',
                islogin:false
            }
        },
        methods:{
            async login(){
                var user = {
                    email: this.email,
                    password:this.password
                };
                await axios.post('http://127.0.0.1:8000/api/login', user)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.user[0].name);
                    localStorage.setItem('id', response.data.user[0].id);
                    localStorage.setItem('rol', response.data.user[0].rol[0].name);
                    this.$router.push('/movies');
                })
                .catch(error => {
                    var data = error.response.data;
                    var M = $('.message-error');
                    M.html('<div class="alert alert-danger">'+data+'</div>');
                    setTimeout(function(){
                        M.html('');
                    }, 5000);
                });
            }
        }
    }
</script>

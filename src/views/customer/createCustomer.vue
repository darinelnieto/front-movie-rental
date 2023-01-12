<template>
    <section class="form-customer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario para creación de clientes</h1>
                    <form method="post" id="create-customer">
                        <div class="form-group">
                            <input type="text" name="name" id="name" class="form-control" placeholder="Nombre">
                        </div>
                        <div class="form-group">
                            <input type="text" name="surname" id="surname" class="form-control" placeholder="Apellidos">
                        </div>
                        <div class="form-group">
                            <input type="number" name="identification_number" class="form-control" id="identification" placeholder="Identificación">
                        </div>
                        <div class="form-group">
                            <textarea name="description" id="description" class="form-control" cols="30" rows="5" placeholder="Descripción..."></textarea>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-sm btn-primary create">Crear</button>
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
        $('#create-customer').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
                $.ajax({
                url:'http://127.0.0.1:8000/api/create/customer',
                method:'post',
                data:{
                    name:$('#name').val(),
                    surname:$('#surname').val(),
                    identification_number:$('#identification').val(),
                    description:$('#description').val()
                }
            });
            setTimeout(function(){
                window.location.href = '/customer';
            }, 2000);
            e.preventDefault();
        });
    } 
  
};
</script>
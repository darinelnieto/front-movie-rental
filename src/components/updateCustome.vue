<template>
    <section class="form-customer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario para creación de clientes</h1>
                    <form method="post" id="update-customer">
                        <div class="form-group">
                            <input type="hidden" name="id" v-model="id" class="id-customer">
                            <input type="text" name="name" id="name" placeholder="Nombre" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" name="surname" id="surname" placeholder="Apellidos" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="number" name="identification_number" id="identification" class="form-control" placeholder="Identificación">
                        </div>
                        <div class="form-group">
                            <textarea name="description" id="description" cols="30" rows="5" class="form-control" placeholder="Descripción..."></textarea>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-sm btn-primary create ml-2 mr-2">Guardar</button>
                            <button class="btn btn-sm btn-danger delete ml-2 mr-2">Eliminar</button>
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
 
export default {
    name: 'updateUser',
    props: {
        create: String
    },
    data(){
        return{
            customer: null,
            id: this.$route.params.id
        }
    },
    // jquery
    mounted: function() {
        $(document).ready(function(){
            // get 
            var id_customer = $('.id-customer').val();
            $.ajax({
                type:'GET',
                url:`http://127.0.0.1:8000/api/customer?id=${id_customer}`,
                data:{id:id_customer}
            }).done(function(res){
                $('#name').val(res.name);
                $('#surname').val(res.surname);
                $('#identification').val(res.identification_number);
                $('#description').val(res.description);
            });
        });
        // update
        $('#update-customer').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/update/customer',
                method:'post',
                data:{
                    id: $('.id-customer').val(),
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
        $('.delete').on('click', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/delete/customer',
                method:'post',
                data:{
                    id: $('.id-customer').val()
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
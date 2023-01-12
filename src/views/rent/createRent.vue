<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario para registrar alquiler</h1>
                    <form id="create-new-rent" method="post">
                        <div class="form-group">
                            <select name="customer_id" id="customer" class="form-control">
                                <option value="">Selecciona el cliente</option>
                                <option v-for="item in result.customer" v-bind:key="item.id" v-bind:value="item.id">
                                    {{ item.name }} {{ item.surname }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select name="movie_id" id="movie" class="form-control">
                                <option value="">Selecciona la película</option>
                                <option v-for="movi in result.movie" v-bind:key="movi.id" v-bind:value="movi.id">
                                    {{ movi.title }}
                                </option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col text-left">
                                <label for="start_date">Fecha de inicio</label>
                                <input type="date" name="start_date" id="start-date" class="form-control">
                            </div>
                            <div class="col text-left">
                                <label for="end_date">Fecha de finalización</label>
                                <input type="date" name="end_date" id="end-date" class="form-control">
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <textarea name="description" class="form-control" id="description" cols="30" rows="5" placeholder="Descripción"></textarea>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-sm btn-primary">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import $ from 'jquery';

export default {
    name: 'createRent',
    props: {
        create: String
    },
    data(){
        return{
            result: null
        }
    },
    async created(){
      axios.get("http://127.0.0.1:8000/api/movie/customer").then((result) => {
          this.result = result.data;
      });
    },
    mounted: function(){
        $('#create-new-rent').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/create/rent',
                method:'post',
                data:{
                    start_date: $('#start-date').val(),
                    end_date: $('#end-date').val(),
                    description: $('#description').val(),
                    movie_id: $('#movie').val(),
                    customer_id: $('#customer').val()
                }
            });
            setTimeout(function(){
                window.location.href = '/alquile';
            }, 2000);
            e.preventDefault();
        });
    }
}
</script>
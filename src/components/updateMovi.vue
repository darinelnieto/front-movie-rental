<template>
<section>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Formulario de edición de peliculas</h1>
                <form method="post" id="form-update-movie">
                    <input type="hidden" name="id" class="id-movie" v-model="id">
                    <div class="form-group">
                        <input type="text" name="title" id="title" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="number" name="stock" id="stock" class="form-control" placeholder="Unidades">
                    </div>
                    <div class="form-group">
                        <select name="categorie_id" class="form-control" id="category">
                            <option value="">Selecciona una categoría</option>
                            <option v-for="cat in result.categories" v-bind:key="cat.id" v-bind:value="cat.id">{{ cat.category_name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="year_id" class="form-control" id="year">
                            <option value="">Selecciona el año de la película</option>
                            <option v-for="item in result.years" v-bind:key="item.id" v-bind:value="item.id">{{ item.year }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="Description" id="description" cols="20" rows="5" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-sm btn-primary update ml-2 mr-2">Actualizar</button>
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
import axios from "axios";

export default {
    name: 'updateMovi',
    props: {
        create: String
    },
    data(){
        return{
            result: null,
            id: this.$route.params.id
        }
    },
    async created(){
        axios.get("http://127.0.0.1:8000/api/year/category").then((result) => {
          this.result = result.data;
        });
    },
    // jquery
    mounted: function() {
        $(document).ready(function(){
            var movie = $('.id-movie').val();
            var api = `http://127.0.0.1:8000/api/get/movie?id=${movie}`;
            $.ajax({
                type:'GET',
                url:api
            }).done(function(data){
                var Json = data.data;
                var item;
                for(item of Json){
                    $('#title').val(item[0].title);
                    $('#stock').val(item[0].stock);
                    $('#category').val(item[0].categories[0].id);
                    $('#year').val(item[0].years[0].id);
                    $('#description').val(item[0].description);
                }
            });
        });
        // update
        $('#form-update-movie').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/update/movie',
                method:'post',
                data:{
                    id:$('.id-movie').val(),
                    title:$('#title').val(),
                    description:$('#description').val(),
                    stock:$('#stock').val(),
                    categorie_id:$('#category').val(),
                    year_id:$('#year').val(),
                }
            });
            setTimeout(function(){
                window.location.href = '/movies';
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
                url:'http://127.0.0.1:8000/api/delete/movie',
                method:'post',
                data:{
                    id: $('.id-movie').val()
                }
            });
            setTimeout(function(){
                window.location.href = '/movies';
            }, 2000);
            e.preventDefault();
        });
    } 
}
</script>
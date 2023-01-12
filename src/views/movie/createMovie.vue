<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Formulario de registro de película</h1>
                    <form id="form-create-movie" method="post">
                        <div class="form-group">
                            <input type="text" name="title" id="title" class="form-control" placeholder="Título">
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
                            <button class="btn btn-sm btn-primary registrar">Registrar</button>
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
    name: 'indexMovie',
    props: {
        create: String
    },
    data(){
        return{
            result: null
        }
    },
    async created(){
      axios.get("http://127.0.0.1:8000/api/year/category").then((result) => {
          this.result = result.data;
      });
  },
  // jquery
  mounted: function(){
    $('#form-create-movie').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/movie/create',
                method:'post',
                data:{
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
  }
};
</script>
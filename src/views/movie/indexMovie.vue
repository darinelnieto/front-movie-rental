<template>
    <section class="movies">
        <div class="container">
            <div class="row">
                <div class="col-12 text-left mb-4">
                    <router-link to="/movies/create" class="btn btn-sm btn-primary">Agregar película</router-link>
                </div>
                <div class="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>título</th>
                                <th>Categoría</th>
                                <th>Descripión</th>
                                <th>año</th>
                                <th>Unidade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="movie in movies" v-bind:key="movie.id">
                                <td>{{ movie.title }}</td>
                                <td>{{ movie.categories[0].category_name }}</td>
                                <td>{{ movie.description }}</td>
                                <td>{{ movie.years[0].year }}</td>
                                <td>{{ movie.stock }}</td>
                                <td>
                                    <router-link  :to="{path: `/movies/update/${movie.id}`}" class="btn btn-sm btn-primary">Editar</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

export default {
    name: 'indexMovie',
    props: {
        create: String
    },
    data(){
        return{
            movies: null
        }
    },
    async created(){
      axios.get("http://127.0.0.1:8000/api/show/movies").then((movies) => {
          this.movies = movies.data;
          console.log(movies);
      });
  },
};
</script>
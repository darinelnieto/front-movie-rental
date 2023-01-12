<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12 text-left mb-4">
                    <router-link to="/alquile/create" class="btn btn-sm btn-primary">Nuevo alquiler</router-link>
                </div>
                <div class="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Pelicula</th>
                                <th>Descripción</th>
                                <th>fecha de inicio</th>
                                <th>Fecha de finalización</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rent in rents" v-bind:key="rent.id">
                                <td>{{ rent.customers[0].name }} {{ rent.customers[0].surname }}</td>
                                <td>{{ rent.movies[0].title }}</td>
                                <td>{{ rent.description }}</td>
                                <td>{{ rent.start_date }}</td>
                                <td>{{ rent.end_date }}</td>
                                <td>
                                    <router-link  :to="{path: `/rent/update/${rent.id}`}" class="btn btn-sm btn-primary">Editar</router-link>
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
            rents: null
        }
    },
    async created(){
      axios.get("http://127.0.0.1:8000/api/show/rents").then((rents) => {
          this.rents = rents.data;
          console.log(rents);
      });
  },
}
</script>
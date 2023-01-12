<template>
    <section class="content-customer">
        <div class="container">
            <div class="row">
                <div class="col-12 text-left mb-4">
                    <router-link to="/create/customer" class="btn btn-sm btn-primary">Agregar nuevo</router-link>
                </div>
                <div class="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Identificación</th>
                                <th>Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in result" v-bind:key="customer.id">
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.surname }}</td>
                                <td>{{ customer.identification_number }}</td>
                                <td>{{ customer.description }}</td>
                                <td>
                                    <router-link  :to="{path: `/update/customer/${customer.id}`}" class="btn btn-sm btn-success">Editar</router-link>
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
  name: 'indexCustomer',
  data(){
        return{
            result: null,
            id: this.$route.params.id
        }
    },
  // get users with axios
  async created(){
      axios.get("http://127.0.0.1:8000/api/show/customer").then((result) => {
          this.result = result.data;
      });
  },
};
</script>
<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Editar renta</h1>
                    <form method="post" id="form-update-rent">
                        <input type="hidden" name="id" class="id" v-model="id">
                        <div class="custemer-data text-left">
                            <p><strong>Cliente:</strong> {{ result.customer[0].name }} {{ result.customer[0].surname }} </p>
                            <p><strong>Película:</strong> {{ result.movie[0].title }} </p>
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
                            <button class="btn btn-sm btn-primary">Guardar</button>
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
        axios.get("http://127.0.0.1:8000/api/movie/customer").then((result) => {
          this.result = result.data;
        });
    },
    // jquery
    mounted: function() {
        $(document).ready(function(){
            var rent = $('.id').val();
            var api = `http://127.0.0.1:8000/api/get/rent?id=${rent}`;
            $.ajax({
                type:'GET',
                url:api
            }).done(function(data){
                var Json = data.data;
                var item;
                for(item of Json){
                    $('#start-date').val(item[0].start_date);
                    $('#end-date').val(item[0].end_date);
                    $('#description').val(item[0].description);
                }
            });
        });
        // update
        $('#form-update-rent').on('submit', function(e){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url:'http://127.0.0.1:8000/api/update/rent',
                method:'post',
                data:{
                    id:$('.id').val(),
                    start_date: $('#start-date').val(),
                    end_date: $('#end-date').val(),
                    description: $('#description').val()
                }
            });
            setTimeout(function(){
                window.location.href = '/alquile';
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
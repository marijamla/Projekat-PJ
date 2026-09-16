<script setup lang="ts">
import type { HotelModel } from '@/models/hotel.model';
import { HotelService } from '@/services/hotel.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '@/components/Navigation.vue';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as string)
const hotel = ref<HotelModel>()

HotelService.getHotelById(id)
    .then(rsp => hotel.value = rsp)
    .then(() => console.log('Hotel lon/lat:', hotel.value?.lon, hotel.value?.lat))
    .catch(() => router.push({ path: '/' }))

function hotelImg() {
    if (!hotel.value) return
    return `https://picsum.photos/seed/${hotel.value.id}/600/400`
}
</script>

<template>
    <Navigation />
    <div class="container mx-auto mt-4" v-if="hotel">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/"> Početna </RouterLink>
                </li>
                <li class="breadcrumb-item">
                    Detalji
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ hotel.tags.name }}
                </li>
            </ol>
        </nav>

        <div class="row mb-3">
            <div class="col-6">
                <img :src="hotelImg()" :alt="hotel.tags.name" class="card-img-top rounded shadow-sm">
            </div>
            <div class="col-6">
                <div class="card shadow-sm">
                    <h1 class="card-header h4">
                        {{ hotel.tags.name }}
                    </h1>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            OSM ID: <strong>{{ hotel.id }}</strong>
                        </li>
                        <li class="list-group-item">
                            Grad: <strong>{{ hotel.tags['addr:city'] || 'Srbija' }}</strong>
                        </li>
                        <li class="list-group-item" v-if="hotel.tags['addr:street']">
                            Adresa: <strong>{{ hotel.tags['addr:street'] }} {{ hotel.tags['addr:housenumber'] || '' }}</strong>
                        </li>
                        <li class="list-group-item" v-if="hotel.tags.stars">
                            Zvezdice: <strong>{{ hotel.tags.stars }} ★</strong>
                        </li>
                        <li class="list-group-item" v-if="hotel.tags.website">
                            Veb-sajt: <a :href="hotel.tags.website" target="_blank">{{ hotel.tags.website }}</a>
                        </li>
                        <li class="list-group-item">
                            <RouterLink class="btn btn-success w-100" :to="`/hotel/${hotel.id}/book`">
                                <i class="fa-solid fa-calendar-check"></i> Rezerviši smeštaj
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <iframe 
                v-if="hotel && hotel.lat" 
                class="mx-auto rounded shadow-sm" 
                height="400"
                :src="`https://www.google.com/maps?output=embed&q=${hotel.lat},${hotel.lon}`" 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade" 
                id="gmaps">
            </iframe>
        </div>
    </div>
</template>
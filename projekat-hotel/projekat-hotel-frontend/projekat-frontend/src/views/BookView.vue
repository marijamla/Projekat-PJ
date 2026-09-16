<script setup lang="ts">
import type { HotelPartnerModel } from '@/models/hotel-partner.model';
import type { HotelModel } from '@/models/hotel.model';
import { ReservationService } from '@/services/reservation.service';
import { HotelService } from '@/services/hotel.service';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';


const route = useRoute()
const router = useRouter()

const reservation = reactive({
    osmHotelId: 0,
    hotelId: 1,
    allInclusive: true,
    checkIn: '',
    checkOut: ''
})

const id = Number.parseInt(route.params.id as string)
const hotel = ref<HotelModel>()

HotelService.getHotelById(id)
    .then(data => {
        hotel.value = data
        reservation.osmHotelId = data.id
    })
    .catch(() => router.push({ path: '/' }))

const partners = ref<HotelPartnerModel[]>()
HotelService.getAllHotels()
    .then(rsp => {
        partners.value = rsp.data
        if (rsp.data.length > 0) {
            reservation.hotelId = rsp.data[0].hotelId
        }
    })
    .catch(() => {
        AuthService.clearAuth()
        router.push({
            path: '/login',
            query: { go: route.path }
        })
    })

function book() {
    if (reservation.checkIn >= reservation.checkOut) {
        alert('Datum odjave mora biti nakon datuma prijave!');
        return;
    }

    ReservationService.createReservation(reservation)
        .then(() => router.push({ path: '/reservations' }))
        .catch(() => {
            AuthService.clearAuth()
            router.push({
                path: '/login',
                query: { go: route.path }
            })
        })
}
</script>

<template>
    <Navigation />
    <div class="book mt-4" v-if="hotel">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/"> Početna </RouterLink>
                </li>
                <li class="breadcrumb-item">
                    {{ hotel.tags.name }}
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/hotel/${hotel.id}`">Detalji</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Rezervacija
                </li>
            </ol>
        </nav>

        <h1 class="h3"> Rezervacija smeštaja za: {{ hotel.tags.name }} </h1>

        <img :src="`https://picsum.photos/seed/${hotel.id}/800/300`" class="img-fluid rounded mb-3">
        
        <div class="form-group mb-3">
            <label for="hotelName"> Naziv hotela: </label>
            <input type="text" class="form-control" id="hotelName" v-model="hotel.tags.name" disabled>
        </div>

        <div class="form-group mb-3">
            <label for="city">Grad / Lokacija: </label>
            <input type="text" class="form-control" id="city" :value="hotel.tags['addr:city'] || 'Srbija'" disabled>
        </div>

        <div class="form-group mb-3">
            <label for="checkIn">Datum prijave (Check-in):</label>
            <input type="date" class="form-control" id="checkIn" v-model="reservation.checkIn" required>
        </div>

        <div class="form-group mb-3">
            <label for="checkOut">Datum odjave (Check-out):</label>
            <input type="date" class="form-control" id="checkOut" v-model="reservation.checkOut" required>
        </div>

        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="allInclusive" v-model="reservation.allInclusive">
            <label class="form-check-label" for="allInclusive">
                All-Inclusive usluga (pun pansion)
            </label>
        </div>

        <button class="btn btn-primary" @click="book">
            <i class="fa-solid fa-floppy-disk"></i>&nbsp; Potvrdi rezervaciju
        </button>
    </div>
</template>

<style>
.book {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
</style>
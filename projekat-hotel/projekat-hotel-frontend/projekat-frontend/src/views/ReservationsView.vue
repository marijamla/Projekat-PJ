<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import type { ReservationModel } from '@/models/reservation.model';
import { ReservationService } from '@/services/reservation.service';
import { ref } from 'vue';

const reservations = ref<ReservationModel[]>()

ReservationService.getAllReservations().then(rsp => {
  reservations.value = rsp.data
})

function remove(res: ReservationModel) {
  if (confirm(`Da li ste sigurni da želite da otkažete rezervaciju #${res.reservationId}?`)) {
    ReservationService.deleteReservation(res.reservationId)
      .then(() => {
        reservations.value = reservations.value?.filter(r => r.reservationId !== res.reservationId)
      })
  }
}
</script>

<template>
  <Navigation />
  <div class="container mt-4" v-if="reservations">
    <h1 class="h3 mb-3"> REZERVACIJE SMEŠTAJA </h1>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col" class="td-100">
            <i class="fa-solid fa-hashtag"></i> BROJ REZERVACIJE
          </th>
          <th scope="col" class="td-300">
            <i class="fa-solid fa-hotel"></i> HOTEL
          </th>
          <th scope="col">
            <i class="fa-solid fa-utensils"></i> USLUGA
          </th>
          <th scope="col">
            <i class="fa-solid fa-calendar"></i> REZERVISANO DANA
          </th>
          <th scope="col">
            <i class="fa-solid fa-triangle-exclamation"></i> AKCIJE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="res in reservations" :key="res.reservationId">
          <th scope="row">#{{ res.reservationId }}</th>
          <td>{{ res.hotelName || 'Individualni smeštaj' }}</td>
          <td>{{ res.allInclusive ? 'All-Inclusive' : 'Standard' }}</td>
          <td>{{ new Date(res.createdAt).toLocaleString('sr') }}</td>
          <td>
            <div>
              <RouterLink class="btn btn-primary me-2" :to="'/code/' + res.reservationId" title="QR Kod">
                <i class="fa-solid fa-qrcode"></i>
              </RouterLink>
              <button type="button" class="btn btn-danger" @click="remove(res)" title="Otkaži">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
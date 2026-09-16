<script setup lang="ts">
import type { HotelModel } from '@/models/hotel.model'
import { HotelService } from '@/services/hotel.service'
import { onMounted, ref, computed } from 'vue'
import Navigation from '@/components/Navigation.vue';

const input = ref<string>('')
const allHotels = ref<HotelModel[]>([])
const currentPage = ref(0)
const pageSize = 12

function retrieveData() {
  HotelService.getSerbianHotels()
    .then(rsp => {
      allHotels.value = rsp.data.filter((h: any) => h.tags && h.tags.name)
    })
    .catch(err => console.error(err))
}

const filteredHotels = computed(() => {
  if (!input.value) return allHotels.value
  const query = input.value.toLowerCase()
  return allHotels.value.filter(h => 
    h.tags.name?.toLowerCase().includes(query) ||
    h.tags['addr:city']?.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => Math.ceil(filteredHotels.value.length / pageSize) || 1)

const paginatedHotels = computed(() => {
  const start = currentPage.value * pageSize
  return filteredHotels.value.slice(start, start + pageSize)
})

function first() { currentPage.value = 0 }
function prev() { if (currentPage.value > 0) currentPage.value-- }
function next() { if (currentPage.value < totalPages.value - 1) currentPage.value++ }
function last() { currentPage.value = totalPages.value - 1 }

onMounted(() => retrieveData());
</script>

<template>
  <Navigation />
  <div id="home" class="container mt-4">
    <div class="input-group mb-3">
      <span class="input-group-text" id="search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input 
        type="text" 
        class="form-control" 
        aria-describedby="search" 
        v-model="input" 
        placeholder="Pretraži hotele po nazivu ili gradu...">
    </div>

    <div v-if="allHotels.length > 0">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <button type="button" class="page-link" @click="first">Prva</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <button type="button" class="page-link" @click="prev">Prethodna</button>
          </li>
          <li class="page-item active">
            <button type="button" class="page-link">{{ currentPage + 1 }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
            <button type="button" class="page-link" @click="next">Sledeća</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
            <button type="button" class="page-link" @click="last">Poslednja</button>
          </li>
        </ul>
      </nav>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col"><i class="fa-solid fa-hotel"></i> NAZIV HOTELA</th>
            <th scope="col"><i class="fa-solid fa-location-dot"></i> GRAD / LOKACIJA</th>
            <th scope="col"><i class="fa-solid fa-star"></i> KATEGORIJA</th>
            <th scope="col"><i class="fa-solid fa-triangle-exclamation"></i> AKCIJE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel in paginatedHotels" :key="hotel.id">
            <th scope="row">{{ hotel.tags.name }}</th>
            <td>{{ hotel.tags['addr:city'] || hotel.tags['addr:street'] || 'Srbija' }}</td>
            <td>{{ hotel.tags.stars ? hotel.tags.stars + ' ★' : 'Hotel' }}</td>
            <td>
              <div class="btn-group">
                <RouterLink class="btn btn-primary" :to="`/hotel/` + hotel.id" title="Detalji">
                  <i class="fa-solid fa-circle-info"></i>
                </RouterLink>
                <RouterLink class="btn btn-success" :to="`/hotel/${hotel.id}/book`">
                  <i class="fa-solid fa-calendar-check"></i> Rezerviši
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <span>Prikazano {{ paginatedHotels.length }} od ukupno {{ filteredHotels.length }} hotela na {{ totalPages }} stranica.</span>
    </div>
  </div>
</template>
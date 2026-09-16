<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3';
import { useRoute } from 'vue-router';
import Navigation from '@/components/Navigation.vue';

const route = useRoute()
const id = Number.parseInt(route.params.id as string)
</script>

<template>
  <Navigation />
    <div class="mx-auto text-center m-5">
        <h3>QR KOD</h3>
        <QRCodeVue3
          :width="200"
          :height="200"
          value="'RVA://' + id"
          :dotsOptions="{
            type: 'dots',
            color: '#008cff',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#008cff' },
                { offset: 1, color: '#008cff' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          myclass="my-qur"
          imgclass="img-qr"
        />
    </div>
</template>
<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
 
 
const email = ref<string>();
const password = ref<string>();
const repeat = ref<string>();
const router = useRouter();
 
async function doRegister() {
    if (email.value == undefined || email.value == '') {
        alert('Polje ne sme biti prazno!')
        return
    }
    if (password.value == undefined || password.value == '') {
        alert('Polje ne sme biti prazno!')
        return
    }
    if (repeat.value == undefined || repeat.value == '') {
        alert('Polje ne sme biti prazno!')
        return
    }
    if (repeat.value != password.value) {
        alert('Lozinke se ne podudaraju!')
        return
    }
 
    try {
        const rsp = await MainService.register(email.value, password.value)
        router.push({
            path: '/login'
        })
    } catch (e) {
 
    }
}
</script>
 
<template>
    <Navigation />
    <div class="custom-form">
        <h1 class="h3"> Registracija </h1>
        <form v-on:submit.prevent="doRegister">
            <div class="mb-3">
                <label for="email" class="form-label">Email adresa</label>
                <input type="email" class="form-control" id="email" aria-describedby="help" v-model="email">
                <div id="help" class="form-text">Vasa lozinka je bezbedna.</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lozinka</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="repeat" class="form-label">Ponovite lozinku</label>
                <input type="password" class="form-control" id="repeat" v-model="repeat">
            </div>
 
            <div class="btn-group mb-3">
                <button type="submit" class="btn btn-primary">
                    Registruj se
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/login">
                    Imate nalog? Prijavite se
                </RouterLink>
            </div>
        </form>
    </div>
</template>
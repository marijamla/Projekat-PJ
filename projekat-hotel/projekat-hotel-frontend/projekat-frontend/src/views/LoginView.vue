<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const email = ref<string>()
const password = ref<string>()

const router = useRouter()
const route = useRoute()

function doLogin() {
    if (email.value == undefined || email.value == '') {
        alert('Email ne sme da bude prazan')
        return
    }

    if (password.value == undefined || password.value == '') {
        alert('Lozinka ne sme da bude prazna')
        return
    }

    MainService.login(email.value, password.value)
        .then(rsp => {
            AuthService.saveAuth(rsp.data)
            const go = (route.query.go) ? route.query.go as string : '/'
            router.push({
                path: go
            })
        })
        .catch(e => alert(e.response.data.message))
}
</script>

<template>
    <Navigation />
    <div class="custom-form">
        <h1> Prijava: </h1>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email adresa: </label>
                <input type="email" class="form-control" id="email" aria-describedby="help" v-model="email">
                <div id="help" class="form-text">Ovaj nalog jos uvek ne postoji. Registrujte se.</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lozinka: </label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">
                Prijavi se
            </button>
            <RouterLink class="btn btn-outline-secondary" to="/register">
                Registruj se
            </RouterLink>
        </form>
    </div>
</template>
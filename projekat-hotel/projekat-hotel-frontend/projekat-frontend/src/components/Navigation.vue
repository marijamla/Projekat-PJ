<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'vue-router';
import NavbarLink from './NavbarLink.vue';
import { ref } from 'vue';

const router = useRouter()

const isMenuOpen = ref(false)

function logout() {
    AuthService.clearAuth()
    router.push({
        path: '/login'
    })
}

// Zatvaranje menija kada se klikne na link u navigaciji (za mobilne uređaje)
function closeMenu() {
    isMenuOpen.value = false
}
</script>

<template>
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fa-solid fa-hotel"></i> Hoteli Srbija </a>
            
            <button class="navbar-toggler" type="button" @click="isMenuOpen = !isMenuOpen">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto" v-if="AuthService.hasAuth()" @click="closeMenu">
                        <NavbarLink to="/" name="Početna" />
                        <NavbarLink to="/reservations" name="Moje Rezervacije" />
                        <NavbarLink to="/about" name="O nama" />
                        <li>
                            <button class="nav-link btn btn-link" type="button" @click="logout"> Odjavi se </button>
                        </li>
                    </ul>
                    <ul class="navbar-nav me-auto" v-else @click="closeMenu">
                        <NavbarLink to="/" name="Početna" />
                        <NavbarLink to="/about" name="O nama" />
                        <NavbarLink to="/login" name="Prijava" />
                        <NavbarLink to="/register" name="Registracija" />
                    </ul>
            </div>
            <div class="navbar-text text-light" v-if="AuthService.hasAuth()">
                <i class="fa-solid fa-user"></i> {{ AuthService.getUserEmail() }}
            </div>
        </div>
    </nav>
</template>
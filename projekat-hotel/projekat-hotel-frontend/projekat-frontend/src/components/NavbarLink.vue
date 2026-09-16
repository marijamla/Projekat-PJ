<script setup lang="ts">

export interface NavbarLinkProps {
    to: string;
    name: string;
}

const { to, name } = defineProps<NavbarLinkProps>()
</script>

<template>
    <li class="nav-item">
        <RouterLink class="nav-link active" :to="to"> {{ name }}</RouterLink>
    </li>
</template>
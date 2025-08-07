<script setup lang="ts">
import { SidebarProvider } from '../ui/sidebar';
import AppSidebar from './sidebar/AppSidebar.vue';
import AppTopbar from './topbar/AppTopbar.vue';


</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main>
            <AppTopbar />
            <slot />
        </main>
    </SidebarProvider>
</template>
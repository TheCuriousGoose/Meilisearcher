<script setup lang="ts">
import { SidebarProvider } from '../ui/sidebar';
import AppSidebar from './sidebar/AppSidebar.vue';
import AppSidebarTrigger from './sidebar/AppSidebarTrigger.vue';


</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main>
            <AppSidebarTrigger />
            <slot />
        </main>
    </SidebarProvider>
</template>
<script setup lang="ts">
import { SidebarProvider } from '../ui/sidebar';
import AppSidebar from './sidebar/AppSidebar.vue';
import AppTopbar from './topbar/AppTopbar.vue';


</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-full">
            <AppTopbar />
            <div class="px-4 w-full">
                <slot />
            </div>
        </main>
    </SidebarProvider>
</template>
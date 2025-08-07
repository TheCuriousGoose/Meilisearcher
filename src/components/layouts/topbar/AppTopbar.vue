<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-2">
            <AppSidebarTrigger />
            <div data-orientation="vertical" role="none" class="shrink-0 bg-border w-px mr-2 h-4"></div>
            <AppBreadcrumb />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppSidebarTrigger from '@/components/layouts/sidebar/AppSidebarTrigger.vue';
import AppBreadcrumb from '@/components/layouts/AppBreadcrumb.vue';
</script>
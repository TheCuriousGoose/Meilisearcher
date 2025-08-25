<template>
    <GuestLayout>

    </GuestLayout>
</template>

<script setup lang="ts">
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';

useBreadcrumb({
    title: 'Show configuration',
    breadcrumbs: [
        {
            name: 'Show configuration',
            path: '/configs/:slug'
        }
    ]
});
</script>
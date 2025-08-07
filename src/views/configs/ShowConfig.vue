<template>
    <GuestLayout>
        <h1>Hi</h1>
    </GuestLayout>
</template>

<script setup lang="ts">
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';

useBreadcrumb({
    title: 'Show Configuration',
    breadcrumbs: [
        {
            name: 'Show Configuration',
            path: '/configs/show',
        }
    ]
});
</script>
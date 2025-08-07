<template>
    <GuestLayout>

    </GuestLayout>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';

useBreadcrumb({
    title: 'Create New Configuration',
    icon: Plus,
    breadcrumbs: [
        {
            name: 'Create New Configuration',
            path: '/configs/create',
            icon: Plus
        }
    ]
});
</script>
<template>
  <GuestLayout>

  </GuestLayout>
</template>

<script setup lang="ts">
import { LayoutDashboard } from 'lucide-vue-next';
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';


useBreadcrumb({
  title: 'Dashboard',
  icon: LayoutDashboard
});
</script>

<template>
    <Button variant="ghost" @click="toggleSidebar">
        <PanelLeftClose v-if="state == 'expanded'" />
        <PanelLeft v-else />
        <span>Toggle sidebar</span>
    </Button>
</template>

<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-vue-next';
const { toggleSidebar, state } = useSidebar();

</script>
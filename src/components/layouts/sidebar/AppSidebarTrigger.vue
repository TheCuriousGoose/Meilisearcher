<template>
    <Button variant="ghost" @click="toggleSidebar" size="icon" >
        <PanelLeft v-if="state == 'expanded'" class="w-5" />
        <PanelLeftClose v-else class="w-5" />
    </Button>
</template>

<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-vue-next';
const { toggleSidebar, state } = useSidebar();

</script>
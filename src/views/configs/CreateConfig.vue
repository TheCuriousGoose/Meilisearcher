<template>
    <GuestLayout>
        <Card class="w-full">
            <CardHeader>
                <CardTitle>Create New Configuration</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                
            </CardContent>
        </Card>
    </GuestLayout>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
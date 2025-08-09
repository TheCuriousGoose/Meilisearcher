<template>
    <Breadcrumb>
        <BreadcrumbList>
            <template v-for="(crumb, index) in computedBreadcrumbs" :key="`${crumb.path}-${index}`">
                <BreadcrumbSeparator v-if="index !== 0" />
                <BreadcrumbItem>
                    <BreadcrumbLink v-if="index < computedBreadcrumbs.length - 1" as-child>
                        <RouterLink :to="crumb.path" :aria-label="`Navigate to ${crumb.name}`"
                            class="flex items-center hover:text-foreground/80 transition-colors">
                            <component v-if="crumb.icon" :is="crumb.icon" class="h-4 w-4 mr-1 shrink-0" :aria-hidden="true" />
                            <span class="truncate">{{ crumb.name }}</span>
                        </RouterLink>
                    </BreadcrumbLink>
                    <BreadcrumbPage v-else class="flex items-center">
                        <component v-if="crumb.icon" :is="crumb.icon" class="h-4 w-4 mr-1 shrink-0" :aria-hidden="true" />
                        <span class="truncate" :title="crumb.name">{{ crumb.name }}</span>
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </template>
        </BreadcrumbList>
    </Breadcrumb>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import { Home } from 'lucide-vue-next';
import type { BreadcrumbData, PageBreadcrumb } from '@/types/Breadcrumbs';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const pageBreadcrumb = inject<PageBreadcrumb | Ref<PageBreadcrumb>>('pageBreadcrumb', {
    title: 'Home',
    breadcrumbs: []
});

const breadcrumbData = computed((): PageBreadcrumb => {
    if (pageBreadcrumb && typeof pageBreadcrumb === 'object' && 'value' in pageBreadcrumb) {
        return pageBreadcrumb.value;
    }
    return pageBreadcrumb as PageBreadcrumb;
});

const computedBreadcrumbs = computed((): BreadcrumbData[] => {
    const data = breadcrumbData.value;
    const homeCrumb: BreadcrumbData = {
        name: 'Home',
        path: '/',
        icon: Home
    };
    if (!data || !data.breadcrumbs || data.breadcrumbs.length === 0) {
        return [homeCrumb];
    }
    return [homeCrumb, ...data.breadcrumbs];
});
</script>

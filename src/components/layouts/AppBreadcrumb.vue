<template>
    <Breadcrumb>
        <BreadcrumbList>
            <!-- Home breadcrumb -->
            <BreadcrumbItem>
                <BreadcrumbLink as-child>
                    <RouterLink to="/" :aria-label="homeLabel">
                        <Home class="h-4 w-4" />
                        <span class="sr-only">{{ homeLabel }}</span>
                    </RouterLink>
                </BreadcrumbLink>
            </BreadcrumbItem>

            <!-- Dynamic breadcrumbs -->
            <template v-for="(crumb, index) in breadcrumbs" :key="`${crumb.path}-${index}`">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <!-- Clickable breadcrumb (not current page) -->
                    <BreadcrumbLink v-if="index < breadcrumbs.length - 1" as-child>
                        <RouterLink :to="crumb.path" :aria-label="`Navigate to ${crumb.name}`"
                            class="flex items-center hover:text-foreground/80 transition-colors">
                            <component v-if="crumb.icon" :is="crumb.icon" class="h-4 w-4 mr-1 shrink-0"
                                :aria-hidden="true" />
                            <span class="truncate">{{ crumb.name }}</span>
                        </RouterLink>
                    </BreadcrumbLink>

                    <!-- Current page breadcrumb -->
                    <BreadcrumbPage v-else class="flex items-center">
                        <component v-if="crumb.icon" :is="crumb.icon" class="h-4 w-4 mr-1 shrink-0"
                            :aria-hidden="true" />
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

const pageBreadcrumb = inject<PageBreadcrumb | Ref<PageBreadcrumb>>('pageBreadcrumb', { title: 'Home' });

const breadcrumbData = computed((): PageBreadcrumb => {
    if (pageBreadcrumb && typeof pageBreadcrumb === 'object' && 'value' in pageBreadcrumb) {
        return pageBreadcrumb.value;
    }
    return pageBreadcrumb as PageBreadcrumb;
});

const breadcrumbs = computed((): BreadcrumbData[] => {
    const data = breadcrumbData.value;
    if (!data || !data.breadcrumbs || data.breadcrumbs.length === 0) {
        return [];
    }
    return data.breadcrumbs;
});

const homeLabel = computed(() => 'Home');
</script>

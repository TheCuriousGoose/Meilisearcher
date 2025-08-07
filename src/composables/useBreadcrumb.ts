import { provide, type Ref, ref } from 'vue';
import type { PageBreadcrumb } from '@/types/Breadcrumbs';

export function useBreadcrumb(breadcrumb: PageBreadcrumb) {
  provide('pageBreadcrumb', breadcrumb);
}

export function useReactiveBreadcrumb(initialBreadcrumb: PageBreadcrumb): Ref<PageBreadcrumb> {
  const breadcrumb = ref(initialBreadcrumb);
  provide('pageBreadcrumb', breadcrumb);
  return breadcrumb;
}

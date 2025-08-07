import type { Component } from 'vue';

interface BreadcrumbData {
  name: string
  path: string
  icon?: Component
  meta?: Record<string, any>
}

interface PageBreadcrumb {
  title: string
  icon?: Component
  path?: string
  breadcrumbs?: BreadcrumbData[]
}

interface BreadcrumbMeta {
  name?: string
  icon?: Component
}

interface Props {
  homeLabel?: string
  maxLength?: number
  showIcons?: boolean
}

export { BreadcrumbData, PageBreadcrumb, BreadcrumbMeta, Props };
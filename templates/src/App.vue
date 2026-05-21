<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import navItems from './services/navMenu'

const route = useRoute()
const router = useRouter()

const sidebarVisible = ref(window.innerWidth >= 768)

const grouped = computed(() => {
  return navItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})
})

function isActive(path) {
  return route.path.startsWith(path)
}

function handleResize() {
  sidebarVisible.value = window.innerWidth >= 768
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <div class="flex h-screen overflow-hidden surface-ground">
    <!-- Sidebar -->
    <aside
      class="flex flex-column surface-0 border-right-1 border-200 transition-all transition-duration-300"
      :style="{ width: sidebarVisible ? '220px' : '56px', minWidth: sidebarVisible ? '220px' : '56px', overflow: 'hidden' }"
    >
      <!-- Logo -->
      <div class="flex align-items-center gap-2 px-3 border-bottom-1 border-200" style="height: 56px; flex-shrink: 0">
        <div
          class="flex align-items-center justify-content-center border-round-lg"
          style="width: 28px; height: 28px; background: #185FA5; flex-shrink: 0"
        >
          <i class="pi pi-building text-white" style="font-size: 13px" />
        </div>
        <span v-if="sidebarVisible" class="font-medium text-sm text-900 white-space-nowrap">OpenSchool</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-2 px-2 overflow-hidden">
        <template v-for="(items, group) in grouped" :key="group">
          <p
            v-if="sidebarVisible"
            class="text-xs font-medium text-400 px-2 mt-2 mb-1 white-space-nowrap"
            style="letter-spacing: 0.06em"
          >
            {{ group }}
          </p>
          <div
            v-for="item in items"
            :key="item.route"
            class="flex align-items-center gap-2 px-2 py-2 border-round cursor-pointer transition-colors transition-duration-150 white-space-nowrap"
            :class="isActive(item.route)
              ? 'text-primary-700 font-medium'
              : 'text-600 hover:surface-100'"
            :style="isActive(item.route) ? 'background: #E6F1FB' : ''"
            @click="router.push(item.route)"
          >
            <i :class="item.icon" style="font-size: 16px; flex-shrink: 0" />
            <span v-if="sidebarVisible" class="text-sm">{{ item.label }}</span>
          </div>
        </template>
      </nav>
    </aside>

    <!-- Main -->
    <div class="flex flex-column flex-1 overflow-hidden">
      <!-- Topbar -->
      <div
        class="flex align-items-center gap-3 px-4 surface-0 border-bottom-1 border-200"
        style="height: 56px; flex-shrink: 0"
      >
        <Button
          :icon="sidebarVisible ? 'pi pi-bars' : 'pi pi-bars'"
          text
          severity="secondary"
          size="small"
          @click="sidebarVisible = !sidebarVisible"
        />
        <span class="font-medium text-sm text-900 flex-1">{{ route.meta?.title ?? 'Dashboard' }}</span>
        <div class="flex align-items-center gap-2">
          <span class="p-overlay-badge">
            <Button icon="pi pi-bell" text severity="secondary" size="small" />
            <Badge value="3" severity="danger" />
          </span>
          <Avatar label="AD" shape="circle" size="normal" style="background: #E6F1FB; color: #185FA5; font-size: 11px" />
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-3">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
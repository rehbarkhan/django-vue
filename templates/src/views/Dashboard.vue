<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'

const stats = ref([
  { label: 'Total students', value: '1,284', sub: '+12 this month', icon: 'pi pi-users', color: '#E6F1FB', iconColor: '#185FA5' },
  { label: 'Attendance today', value: '94%', sub: '+2% vs yesterday', icon: 'pi pi-user-check', color: '#EAF3DE', iconColor: '#3B6D11' },
  { label: 'Fee collected', value: '₹2.4L', sub: '76% of target', icon: 'pi pi-receipt', color: '#FAEEDA', iconColor: '#854F0B' },
  { label: 'Active classes', value: '38', sub: 'Across 6 sections', icon: 'pi pi-book', color: '#FAECE7', iconColor: '#993C1D' },
])

const activities = ref([
  { text: 'Riya Sharma enrolled in Class 7B', time: '2 min ago', color: '#185FA5' },
  { text: 'Fee ₹8,500 received from Arjun Das', time: '18 min ago', color: '#3B6D11' },
  { text: 'Attendance marked for Class 10A', time: '1 hr ago', color: '#854F0B' },
  { text: 'Mr. Sinha teacher account created', time: '3 hrs ago', color: '#185FA5' },
])

const students = ref([
  { name: 'Riya Sharma', initials: 'RS', cls: 'Class 7B', badge: 'New', severity: 'success' },
  { name: 'Arjun Das', initials: 'AD', cls: 'Class 10A', badge: 'Fee due', severity: 'warn' },
  { name: 'Priya Mondal', initials: 'PM', cls: 'Class 9C', badge: 'Absent', severity: 'danger' },
  { name: 'Sourav Khan', initials: 'SK', cls: 'Class 8A', badge: 'New', severity: 'success' },
])
</script>

<template>
    <div class="grid mb-3">
      <div v-for="stat in stats" :key="stat.label" class="col-12 md:col-6 lg:col-3">
        <Card class="shadow-none border-1 border-200">
          <template #content>
            <div class="flex align-items-center justify-content-between mb-2">
              <span class="text-xs text-500">{{ stat.label }}</span>
              <div
                class="flex align-items-center justify-content-center border-round-lg"
                :style="{ width: '32px', height: '32px', background: stat.color }"
              >
                <i :class="stat.icon" :style="{ color: stat.iconColor, fontSize: '15px' }" />
              </div>
            </div>
            <div class="text-2xl font-medium text-900 mb-1">{{ stat.value }}</div>
            <div class="text-xs text-500">{{ stat.sub }}</div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Bottom grid -->
    <div class="grid">
      <!-- Activity -->
      <div class="col-12 md:col-6">
        <Card class="shadow-none border-1 border-200 h-full">
          <template #title>
            <div class="flex align-items-center justify-content-between">
              <span class="text-sm font-medium">Recent activity</span>
              <span class="text-xs text-primary cursor-pointer">View all</span>
            </div>
          </template>
          <template #content>
            <div
              v-for="(a, i) in activities"
              :key="i"
              class="flex align-items-start gap-2 py-2"
              :class="{ 'border-bottom-1 border-200': i < activities.length - 1 }"
            >
              <div
                class="border-circle mt-1 flex-shrink-0"
                :style="{ width: '7px', height: '7px', background: a.color }"
              />
              <div>
                <div class="text-sm text-600">{{ a.text }}</div>
                <div class="text-xs text-400 mt-1">{{ a.time }}</div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Recent students -->
      <div class="col-12 md:col-6">
        <Card class="shadow-none border-1 border-200 h-full">
          <template #title>
            <div class="flex align-items-center justify-content-between">
              <span class="text-sm font-medium">Recent students</span>
              <span class="text-xs text-primary cursor-pointer">View all</span>
            </div>
          </template>
          <template #content>
            <div
              v-for="(s, i) in students"
              :key="i"
              class="flex align-items-center gap-2 py-2"
              :class="{ 'border-bottom-1 border-200': i < students.length - 1 }"
            >
              <Avatar :label="s.initials" shape="circle" size="small" style="background: #E6F1FB; color: #185FA5; font-size: 10px" />
              <div class="flex-1">
                <div class="text-sm font-medium text-900">{{ s.name }}</div>
                <div class="text-xs text-400">{{ s.cls }}</div>
              </div>
              <Tag :value="s.badge" :severity="s.severity" />
            </div>
          </template>
        </Card>
      </div>
    </div>
</template>
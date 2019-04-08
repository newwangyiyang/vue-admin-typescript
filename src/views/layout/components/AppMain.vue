<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import MyVue from '@/MyVue'
@Component
export default class AppMain extends MyVue {}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
}
</style>

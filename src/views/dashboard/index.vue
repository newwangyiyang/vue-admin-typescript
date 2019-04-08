<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      name:{{ name }}
    </div>
    <div class="dashboard-text">
      roles:<span
        v-for="role in roles"
        :key="role"
      >{{ role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class';
import MyVue from '@/MyVue'
@Component
export default class Dashboard extends MyVue {
  @Getter readonly name!: string
  @Getter readonly roles!: string[]
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

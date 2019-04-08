<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :collapse="collapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'
import { Getter } from 'vuex-class'
import { SlidebarState } from '@/interface/storeIF'
import { RouteConfig } from 'vue-router';
import MyVue from '@/MyVue'
@Component({
  components: {
    SidebarItem
  }
})
export default class SideBar extends MyVue {
  @Prop({ default: false }) private collapse!: boolean

  @Getter readonly sidebar!: SlidebarState
  @Getter readonly routers!: RouteConfig[]

  get routes() {
    return this.routers
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss">
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-scrollbar__bar {
  &.is-vertical {
    right: 0px;
  }

  &.is-horizontal {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>

<template>
  <a
    v-if="isExternalLink(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
import MyVue from '@/MyVue'
@Component
export default class Link extends MyVue {
  @Prop({ required: true }) private to!: string;

  private isExternalLink(routePath: string) {
    return isExternal(routePath)
  }
}
</script>

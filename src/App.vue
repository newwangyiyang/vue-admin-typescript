<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
<style lang="scss">
//定义全局输入错误提示信息
.error_msg {
    display: block;
    color: #e74c3c;
    font-size: 12px;
    line-height: 16px;
}
.success_msg {
    display: block;
    color: #2ecc71;
    font-size: 12px;
    line-height: 16px;
}
</style>


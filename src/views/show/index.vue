<template>
    <div>
        <p>固定页面: ----{{name}}</p>
    </div>
</template>

<script lang="ts">
import MyVue from '@/MyVue'
import { Component } from 'vue-property-decorator'
@Component
export default class Show extends MyVue {
    private name = '王一扬'
}
</script>

<style scoped>

</style>
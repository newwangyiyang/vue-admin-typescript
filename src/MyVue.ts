import { Component, Vue } from 'vue-property-decorator'

// 全局过滤器注册
import * as filters from '@/filter/index'
// 全局指令 吸顶
import VueSticky from 'vue-sticky'
// 参数校验 vee-validate
import {ErrorBag, FieldFlagsBag, Validator} from 'vee-validate'
@Component({
    // 定义全局filters
    filters: {
        toThousandFilter: filters.toThousandFilter, /* 金钱三位一逗号 */
        fourSpace: filters.fourSpace, /* 银行卡四位一空格 */
        telFormat: filters.telFormat, /* 电话号码过滤，188****7983 */
        cardFormat: filters.cardFormat, /* 身份证号格式化 前四位 后四位 中间变为星号 ---例如：3408*******5656 */
        timeFormat: filters.timeFormat, /* 时间格式化 yyyy-MM-dd hh:mm:ss */
    },
    // 定义全局指令 v-sticky="{ zIndex: NUMBER, stickyTop: NUMBER, disabled: [true|false]}"
    directives: {
        'sticky': VueSticky,
    },
})
export default class MyVue extends Vue {
    $validator!: Validator // 声明参数校验的类型
    errors!: ErrorBag
    fields!: FieldFlagsBag
    $openPremission!: boolean
}
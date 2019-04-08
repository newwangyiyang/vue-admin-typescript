import { Validator } from 'vee-validate';


const dictionary = {
    en: {
        messages: {
            //在此处添加自定义的中文错误提示信息
            required: (field) => `${field}不能为空`,
            email: (field) => `请输入正确的${field}格式`,
            between: (field, data) => `${field}必须在${data[0]}~${data[1]}之间`,
            confirmed: (field, data) => `${field}必须与${data[0]}相匹配`,
            max: (field, data) => `${field}最大长度不能超过${data[0]}`,
            min: (field, data) => `${field}最小长度不能小于${data[0]}`,
            digits: (field, data) => `${field}必须为数字，且长度必须等于${data[0]}`,
            min_value: (field, data) => `${field}数值不能小于${data[0]}`,
            max_value: (field, data) => `${field}数值不能大于${data[0]}`,
            not_in: (field, data) => `${field}不能为${data.join(',')}`
        }
    }
}
Validator.localize(dictionary)
 
 
// 非中文字符校验
Validator.extend('noCN', {
    messages: {
        zh_CN: field => field + '不能包含中文字符'
    },
    validate: value => {
        return !/[\u4e00-\u9fa5]/.test(value)
    }
})
 
// 不能包含空格校验
Validator.extend('noSpace', {
    messages: {
        zh_CN: field => field + '不能包含空格'
    },
    validate: value => {
        return /^\S*$/.test(value)
    }
})

//自定义验证规则
Validator.extend('phone', {
    getMessage: field => `${field}错误`,
    validate: value => /^1\d{10}$/.test(value)
})



//接收v-validate中传递的参数   例如: v-validate="'required|numBetween:10,100'"
//                                                                  min, max
Validator.extend('numBetween', {
    getMessage: field => `${field}错误，请重新输入`,
    validate: (value, {min, max}={}) => value >= min && value <=max
}, {
    paramNames: ['min', 'max']
})
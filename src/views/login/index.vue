<template>
  <div class="login-container">
    <el-form
      class="login-form"
      auto-complete="on"
      label-position="left"
      data-vv-scope="login"
    >
      <h3 class="title">
        管理平台登录
      </h3>
      <el-form-item>
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          data-vv-as="用户名"
          auto-complete="on"
          placeholder="用户名"
          v-validate="'required'"
        />
      </el-form-item>
      <span class="error_msg">{{ errors.first('login.username') }}</span>
      <el-form-item>
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="密码"
          data-vv-as="密码"
          v-validate="'required'"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <span class="error_msg">{{ errors.first('login.password') }}</span>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from '@/utils/validate'
import { Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Action } from 'vuex-class'
import MyVue from '@/MyVue'
import { UserLogin } from '@/interface/paramsIF';


@Component
export default class Login extends MyVue {
  private loginForm: UserLogin = {
    username: '',
    password: ''
  }
  private loading = false
  private pwdType = 'password'
  private redirect: string | undefined = undefined

  @Action readonly login!: Function

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && route.query.redirect as string
  }

  private showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = ''
    } else {
      this.pwdType = 'password'
    }
  }

  private handleLogin() {
    this.$validator.validateAll('login').then((res: boolean) => {
      if(res) {
        this.loading = true
        this.login(this.loginForm).then(() => {
          this.loading = false
          this.$router.push({ path: this.redirect || '/' })
        }).catch(() => {
          this.loading = false
        })
      }
    })
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      color: $lightGray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 0;
    margin-top: 22px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

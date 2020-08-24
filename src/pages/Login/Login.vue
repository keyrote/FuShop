<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">甫得留游</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{computeTime? `已发送(${computeTime}s)`: '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册甫得留游帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd? 'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'show':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow-left-bold"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
export default {
  data () {
    return {
      loginWay: true,
      phone: '',
      computeTime: 0,
      showPwd: false,
      pwd: '',
      code: '',
      name: '',
      captcha: '',
      alertText: '',
      showAlert: false
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getCode () {
      if (!this.computeTime) {
        this.computeTime = 30
        this.intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) { clearInterval(this.intervalId) }
        }, 1000)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this.showText(result.msg)
        }
        if (this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      }
    },
    showText (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    async login () {
      let result
      // 表单验证
      if (this.loginWay) { // 短信登陆
        const {rightPhone, phone, code} = this
        if (!rightPhone) {
          this.showText('请输入正确手机号')
        } else if (!(/^\d{6}$/.test(code))) {
          this.showText('验证码必须是6位')
          console.log(code)
        }
        result = await reqSmsLogin(phone, code)
      } else { // 密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          this.showText('用户名不能为空')
        } else if (!pwd) {
          this.showText('请输入密码')
        } else if (!captcha) {
          this.showText('请输入图片验证码')
        }
        // console.log(name, pwd, captcha)
        result = await reqPwdLogin({name, pwd, captcha})
        console.log(result)
      }
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/profile')
      } else {
        const msg = result.msg
        this.getCaptcha()
        this.showText(msg)
      }
    },
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #1a0424
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #1a0424
            font-weight 700
            border-bottom 2px solid #1a0424
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #1a0424
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 40px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #1a0424
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(40px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #1a0424
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #491870
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>

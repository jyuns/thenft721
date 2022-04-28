<template>
<div id="signup">
    <p class="sign-title">회원가입</p>
    
    <div id="sign-inner">

    <b-form-group
    label="이메일"
    label-size="md"
    class="mb-4">

    <b-form-input
    id="email"
    class="w-100"
    size="md"
    trim
    type="email"
    placeholder="example@thenft.info"
    :state="emailVerified"
    :value="email"
    @input="onSet($event, 'email')"/>

    <b-form-invalid-feedback id="input-live-feedback">
        {{emailMessage}}
    </b-form-invalid-feedback>

    </b-form-group>

    <b-form-group
    label="닉네임"
    label-size="md"
    class="mb-4">

    <b-form-input
    id="nickname"
    class="w-100"
    size="md"
    trim
    type="text"
    placeholder="thenft"
    :state="nicknameVerified"
    :value="nickname"
    @input="onSet($event, 'nickname')"/>

    <b-form-invalid-feedback id="input-live-feedback">
        {{nicknameMessage}}
    </b-form-invalid-feedback>

    </b-form-group>


    <b-form-group
    label="비밀번호"
    label-size="md"
    class="mb-4">

    <b-form-input
    id="password"
    class="w-100"
    placeholder="최소 6자 이상, 최대 20자 이내로 입력해주세요."
    size="md"
    trim
    type="password"
    autoComplete="off"
    :state="passwordVerified"
    :value="password"
    @input="onSet($event, 'password')"/>

    <b-form-invalid-feedback id="input-live-feedback">
    {{passwordMessage}}
    </b-form-invalid-feedback>

    </b-form-group>

    <b-form-group
    label="초대코드"
    label-size="md"
    class="mb-4">

    <div
    class="d-flex position-relative justify-content-between mb-4">
    <b-form-input
    id="code"
    class="w-75"
    size="md"
    trim
    type="text"
    :state="codeVerified"
    :disabled="codeFix"
    :value="code"
    @input="onSet($event, 'code')"/>
 
    <b-button 
    class="w-20 code-verify-btn"
    :disabled="codeFix"
    @click="onVerify">확인</b-button>

    <b-form-valid-feedback
    v-if="codeFix"
    class="code-feedback"
    id="input-live-feedback">
        {{codeMessage}}  
    </b-form-valid-feedback>

    <b-form-invalid-feedback
    class="code-feedback"
    id="input-live-feedback">
        {{codeMessage}}  
    </b-form-invalid-feedback>
    </div>
    </b-form-group>

    <b-form-group>
        <b-form-checkbox v-model="check.policy">
        <div class="d-flex">
            <p class="nm">&nbsp;(필수)&nbsp;</p>
            <a class="check-url" target="_blank" :href="data.policy.url">개인정보처리방침</a>
            <p class="nm">에 동의합니다.</p>
        </div>
        </b-form-checkbox>
        <b-form-checkbox v-model="check.term_of_service">
        <div class="d-flex">
            <p class="nm">&nbsp;(필수)&nbsp;</p>
            <a class="check-url" target="_blank" :href="data.term_of_service.url">이용약관</a>
            <p class="nm">에 동의합니다.</p>
        </div>
        </b-form-checkbox>
        <b-form-checkbox v-model="check.newsletter">
        <div class="d-flex">
            <p class="nm">&nbsp;(선택)&nbsp;</p>
            <p class="nm">뉴스레터 수신에 동의합니다.</p>
        </div>
        </b-form-checkbox>
    </b-form-group>
    </div>

    <div class="sign-submit"
    @click="onSubmit">시작하기</div>

</div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
const { data } = require('../../data/footer');

export default {
    data() {
        return {
            email: '',
            emailVerified: true,
            emailMessage: '이메일을 다시 확인해주세요.',

            nickname: '',
            nicknameVerified: true,
            nicknameMessage: '잘못된 유형의 닉네임입니다(12자리 이내, 특수문자 불가능)',

            password: '',
            passwordVerified: true,
            passwordMessage: '최소 6자, 최대 20자 이내로 입력해주세요.',

            code: '',
            codeVerified: true,
            codeMessage: '유효한 초대코드를 입력해주세요.',
            codeFix: false,

            data,

            check: {
                policy: false,
                term_of_service: false,
                newsletter: false,
            }
        }
    },

    computed: {
        ...mapState('auth', [
            'EMAIL', 'PASSWORD', 'NICKNAME', 'CODE'
        ])
    },

    methods: {

        ...mapActions('auth', [
            'VERIFY', 'SIGNUP', 'SIGNIN'
        ]),
        
        initMessage() {
            this.emailMessage = '이메일을 다시 확인해주세요.'
            this.nicknameMessage = '잘못된 유형의 닉네임입니다(12자리 이내, 특수문자 불가능)'
            this.passwordMessage = '최소 6자, 최대 20자 이내로 입력해주세요.'
            this.codeMessage = '유효한 초대코드를 입력해주세요.'
        },

        onSet(e, v) {
            this.$data[v] = e
            const re = new RegExp(this[v.toUpperCase()])
            this.$data[`${v}Verified`] = re.test(e)
            
            this.initMessage();
        },

        async onVerify() {
            let code = this.code

            if(code.length != 10) { return this.codeVerified = false }

            let result = await this.VERIFY({code: code})

            if(result.status == 200) {
                this.codeMessage = result.data.message
                this.codeVerified = true
                this.codeFix = true
            } else {
                this.codeMessage = result.data.message
                this.codeVerified = false
            }
        },

        async onSubmit() {
            if(!this.email.length) this.emailVerified = false
            if(!this.nickname.length) this.nicknameVerified = false
            if(!this.password.length) this.passwordVerified = false

            let check = 0
            check =+ this.emailVerified
            check =+ this.nicknameVerified
            check =+ this.passwordVerified
            check =+ this.check.policy
            check =+ this.check.term_of_service
            
            if(!check) return
            
            let result = await this.SIGNUP(this.$data)
            if(result.status == 200) {
                await this.SIGNIN(this.$data)
                this.$router.push('/')
                return
            }

            let error = result.data
            
            switch(error.type) {
                case 'email':
                    this.emailMessage = error.message
                    this.emailVerified = false
                    return
                case 'code':
                    this.codeMessage = error.message
                    this.codeVerified = false
                    return
                case 'nickname':
                    this.nicknameMessage = error.message
                    this.nicknameVerified = false
                    return
            }

        }
    }
}
</script>

<style>

.code-feedback {
    position: absolute;
    bottom: -24px;
}

.code-verify-btn {
    outline: #252525; 
    border-color: #252525; 
}

.check-url {
    color: #0386FF!important;
}

input[type="text"]:disabled {
  background-color: #6c757d;
  border: none!important;
}
</style>
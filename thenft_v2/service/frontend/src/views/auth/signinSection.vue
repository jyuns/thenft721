<template>
<div id="signin">
    
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

    </div>

    <div class="sign-submit"
    @click="onSubmit">로그인</div>

    <a class="sign-sub-title"
    href="/auth/signup">theNFT가 처음이신가요? 회원가입 →</a>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            emailVerified: true,
            emailMessage: '이메일을 다시 확인해주세요.',

            password: '',
            passwordVerified: true,
            passwordMessage: '최소 6자, 최대 20자 이내로 입력해주세요.',
        }
    },

    computed: {
        ...mapState('auth', [
            'EMAIL', 'PASSWORD', 'NICKNAME', 'CODE'
        ])
    },

    methods: {

        ...mapActions('auth', [
             'SIGNIN'
        ]),

        initMessage() {
            this.emailMessage = '이메일을 다시 확인해주세요.'
            this.passwordMessage = '최소 6자, 최대 20자 이내로 입력해주세요.'
        },

        onSet(e, v) {
            this.$data[v] = e
            const re = new RegExp(this[v.toUpperCase()])
            this.$data[`${v}Verified`] = re.test(e)
            
            this.initMessage();
        },

        async onSubmit() {
            if(!this.email.length) this.emailVerified = false
            if(!this.password.length) this.passwordVerified = false

            let check = 0
            check =+ this.emailVerified
            check =+ this.passwordVerified
            
            if(!check) return

            let result = await this.SIGNIN(this.$data)

            if(result.status == 200) {
                this.$router.push('/')
                return
            }

            let error = result.data

            switch(error.type) {
                case 'email':
                    this.emailMessage = error.message
                    this.emailVerified = false
                    return
                case 'password':
                    this.passwordMessage = error.message
                    this.passwordVerified = false
                    return
            }

        }

    }
}
</script>

<style>

</style>
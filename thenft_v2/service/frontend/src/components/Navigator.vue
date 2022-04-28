<template>

  <b-navbar
  toggleable="lg"
  :sticky="true"
  class="py-2 px-4">

  <b-navbar-brand class="d-flex align-items-center" to="/">
    <img class="logo" src="@/assets/images/thenft.png"/>
  </b-navbar-brand>

    <div class="user-section">
      <a class="signin" v-if="!check" href="/auth/signin">로그인</a>
      <a class="profile" 
      v-else href="/auth/profile"
      :style="{backgroundImage: `url(${profile})`}"/>
    </div>

  <b-navbar-toggle target="nav-collapse"/>

  <b-collapse id="nav-collapse" is-nav>

    <b-navbar-nav>
      <b-nav-item to="/">랭킹</b-nav-item>
      <b-nav-item to="/event">이벤트 일정</b-nav-item>
    </b-navbar-nav>


    <b-navbar-nav
    class="position-relative ms-auto">

    <b-nav-form class="search-form"
    @focusout="onHide"
    @submit.prevent>
      <!-- 추후 돋보기 아이콘 등 포함 -->
      <label class="search-label"/>
      <b-form-input
      class="search-input"
      placeholder="궁금한 NFT를 검색해보세요"
      autocomplete="off"
      :value="keyword"
      @input="onSearch"
      @focus="onShow"/>

      <div class="search-list" v-show="showSearchList">
        <b-list-group v-if="ITEMS.length">
          <b-list-group-item
          v-for="(item, index) in ITEMS"
          :key='`search-${item._id}-${index}`'
          :href="item.page_str"
          class="d-flex align-items-center">
          
          <b-img
          rounded="circle"
          v-bind="IMAGE_STYLE"
          :src="item.image || defaultImage"/>
          <p class="search-ellipsis">{{item.name}}</p>
          
          </b-list-group-item>
        </b-list-group>

        <b-list-group v-else>
          <b-list-group-item>
            <p class="text-center">검색 결과가 없습니다.</p>
          </b-list-group-item>
        </b-list-group>

      </div>

    </b-nav-form>

    </b-navbar-nav>

    <div class="user-section-collapse">
      <a class="signin" v-if="!check" href="/auth/signin">로그인</a>
      <a class="profile" 
      v-else href="/auth/profile"
      :style="{backgroundImage: `url(${profile})`}"/>
    </div>

  </b-collapse>

  </b-navbar>

</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';
import defaultImage from '@/assets/images/default.jpg'
import pronfter from '@/assets/images/pronfter.png'
import nfter from '@/assets/images/nfter.png'

export default {

  data() {
    return {
      keyword: '',
      showSearchList: false,
      defaultImage,
    }
  },

  computed: {
    ...mapState('search', [
      'ITEMS', 'IMAGE_STYLE'
    ]),

    ...mapState('auth', [
      'USER'
    ]),

    check() {
      let user = this.USER
      let check = Object.keys(user).length
      return check
    },

    profile() {
      let user = this.USER
      let check = this.check

      if(check) {
        if(user.role == '프로느프터') return pronfter
        else if(user.role == '느프터') return nfter
        else return defaultImage
      } else return false
    }
  },

  methods: {

    ...mapMutations('search', [
      'INIT'
    ]),

    ...mapActions('search', [
      'LOAD'
    ]),

    onSearch(keyword) {
      this.keyword = keyword;

      if(keyword.length<2) return this.INIT()
      else return this.LOAD(keyword)
    },

    onShow() {
      this.showSearchList = true;
    },

    onHide(e) {
      if(e.relatedTarget) return
      this.showSearchList = false;
    },
  },

  mounted() {
    this.INIT()
  }

}
</script>

<style>
.logo {
  width: 96px;
}

.signin {
  color: #E8E8E8;
  cursor: pointer;
}

.user-section {
  margin-left: auto;
  margin-right: 8px;
}

.user-section-collapse {
  margin-left: 1rem;
}

.search-form {
  min-width: 282px;
  height: 32px;
  width:100%;

  position:relative;
}

.search-input {
  outline: none!important;
  box-shadow: none!important;
  border: none!important;

  height: 32px;
  width:100%;
}

.search-label {
  position:absolute;
  left: 4px;
}

.search-label::before {
}

.search-list {
  width: 100%;
  top: 36px;
  position: absolute;
}

.search-ellipsis {
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile {
  background: #C4C4C4;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-left: 12px;
  position: relative;

  background-repeat: no-repeat;
  background-size: 50px;
  background-position-x: -8px;

  display: block;
}

.profile::after {
    height: 12px;
    width: 12px;
    content: '';
    border-radius: 50%;
    background-color:#0386FF;
    border: 2px solid #141B2D;
    position:absolute;
    right: 0;
}

</style>
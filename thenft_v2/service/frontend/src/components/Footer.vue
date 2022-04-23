<template>
  <div id="footer">

    <div>

      <span class="footer-policy mb-2">
        <a class="footer-policy-text me-4 font-weight-bold" :href="data.policy.url" target="_blank">{{data.policy.text}}</a>
        <a class="footer-policy-text me-4 font-weight-bold" :href="data.term_of_service.url" target="_blank">{{data.term_of_service.text}}</a>
        <img class="footer-powered-by" src="@/assets/icons/coinGecko.svg"/>
      </span>

      <span class="footer-text mt-2"
        v-html="data.text">
      </span>

      <span class="footer-copyright">
        <p class="mt-2">{{data.copyright}}</p>
      </span>

    </div>

  </div>
</template>

<script>

import { data } from '../data/footer';

export default {
  data() {
    return {
      data
    }
  }
}
</script>

<style>

#footer {
  padding: 8px 16px;
}

.footer-text {
  font-size: .8rem;
  color: #A6A6A6!important;
}

.footer-copyright {
  color: #E7E7E7!important;
}

.footer-policy {
  display: flex;
  align-items: center;
}

.footer-policy-text {
  color: #E7E7E7!important;
}

.footer-powered-by {
  
}

</style>
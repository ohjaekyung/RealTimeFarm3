<template>
    <div  v-bind:class="{'scroll_lock': isModal}">
      <div class="test" v-show="isModal">
        <v-layout row wrap align-center style="height: 90%">
          <v-flex >
            <v-slider
                    v-model="value"
                    :vertical="true"
            ></v-slider>
            <span class="slide_value" id="value1">{{value}}</span>
          </v-flex>
          <v-flex >
            <v-slider
                    v-model="value2"
                    height="'900'"
                    :vertical="true"
            ></v-slider>
            <span class="slide_value" id="value2">{{value2}}</span>
          </v-flex>
        </v-layout>
      </div>
      <main class="main" v-bind:class="{'blur': isModal}" >
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" class="blur-svg">
          <!--    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" class="blur-svg">-->
          <defs>
            <filter id="blur-filter">
              <feGaussianBlur stdDeviation="3"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <article class="body_img" v-bind:class="stepClass">
          <div class="icon_area">
            <!--        <img src="~@/assets/img/step1_icon.png"/>-->
            <img src="~@/assets/img/test.png" class="plant"/>
            <img src="~@/assets/img/test.png" class="etc"/>
          </div>
        </article>
        <article class="info_box" ref="infoBox">
          <section class="info_section">
            <article class="contents">
              <div class="img_box temperature">
                <img src="~@/assets/img/icon_1.png" alt="temperature_icon">
              </div>
              <div class="text_box" v-on:click="showModal">
                <span class="name">온도</span>
                <span class="value">{{senseData.temperature}}℃</span>
              </div>
            </article>
            <article class="contents" style="width: 45%">
              <div class="img_box">
                <img src="~@/assets/img/icon_2.png" alt="temperature_icon2">
              </div>
              <div class="text_box" v-on:click="showModal">
                <span class="name">수분</span>
                <span class="value">{{senseData.water}}%</span>
              </div>
            </article>
          </section>
          <button v-on:click="fnConnect" style="width: 30px;">Connection Test</button>
          <section class="condition_box">
            <div class="condition_text_box">
          <span v-on:click="fnChangeStep">
            목이 말라요ㅠㅠ
          </span>
            </div>
          </section>
        </article>
      </main>
      <!--<modal></modal>-->
    </div>
  <!--<div>-->
    <!--<div class="contents">-->
      <!--<span>-->
      <!--온도-->
    <!--</span>-->
    <!--</div>-->
    <!--<div class="contents">-->
      <!--<span>-->
      <!--습도-->
    <!--</span>-->
    <!--</div>-->
    <!--<button v-on:click="$AwsIot.init()" style="background-color: darkgrey">Connect</button>-->
    <!--<button v-on:click="fnPublish" style="background-color: darkgrey">Publish</button>-->
  <!--</div>-->
</template>

<script>
// import Modal from '@/components/Modal'

export default {
  name: 'index',
  data () {
    return {
      value: 0,
      value2: 0,
      isModal: false,
      stepClass: 'step1'
    }
  },
  watch: {
    isModal: function (val) {
      document.body.className = ''
      if (val) {
        document.body.className = 'scroll_lock'
      }
    }
  },
  computed: {
    senseData: function () {
      return this.$store.getters['getMqttSenseData']
    }
  },
  methods: {
    showModal: function () {
      this.isModal = true
    },
    fnConnect: function () {
      // let callBack = this.$AwsIot.mqttClientConnectHandler
      this.$AwsIot.init()
      // this.store.state.mqttClient.subscribe('test')
    },
    fnPublish: function () {
      this.$AwsIot.updatePublishData()
      // window.updatePublishData()
    },
    fnChangeStep: function () {
      if (this.stepClass === 'step1') {
        this.stepClass = 'step2'
      } else if (this.stepClass === 'step2') {
        this.stepClass = 'step3'
      } else if (this.stepClass === 'step3') {
        this.stepClass = 'step4'
      } else {
        this.stepClass = 'step1'
      }
    }
  }
}
</script>
<style lang="scss">
  .v-slider--vertical .v-slider__track-container {
    width: 60px;
    height: 200px;
    .v-slider__track-background {
      // border-radius: 30px;
      border-radius: 15px;
      /*border-top-left-radius: 30px;*/
      /*border-top-right-radius: 30px;*/
      /*border-bottom-left-radius: 30px;*/
      /*border-bottom-right-radius: 30px;*/
    }
    .v-slider__track-fill {
      background: rgb(255, 255, 255);
      border-radius: 15px;
    }
  }
  .v-slider__thumb {
    width: 60px;
    height: 60px;
    left: -31px;
    background: rgba(255, 255, 255, 0) !important;
  }
  .v-slider__thumb:before {
    background: rgba(255, 255, 255, 0) !important;
  }
  .slide_value {
    display: flex;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    margin-top: 65px;
  }
  /*.v-slider__thumb {*/
    /*width: 150px;*/
  /*}*/
</style>

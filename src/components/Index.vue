<template>
    <div  v-bind:class="{'scroll_lock': isModal}">
      <transition name="fade">
        <div class="test" v-if="isModal" v-on:click="toggleModal">
          <v-layout row wrap align-center style="height: 90%">
            <div class="slide_icon" style="left: 22.7%;">
              <img src="~@/assets/img/icon_1_1.png" style="width: 17px">
            </div>
            <div class="slide_icon" style="left: 71.5%; top: 21.5%;">
              <img src="~@/assets/img/icon_2_1.png">
            </div>
            <v-flex>
              <v-slider
                v-model="postData.temperature"
                :vertical="true"
              ></v-slider>
              <div class="slide_value" id="value1">
                <span>{{postData.temperature}}℃</span>
              </div>
            </v-flex>
            <v-flex>
              <v-slider
                v-model="postData.water"
                height="'900'"
                :vertical="true"
              ></v-slider>
              <div class="slide_value" id="value2">
                <span>{{postData.water}}%</span>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </transition>
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
              <div class="text_box" v-on:click="toggleModal">
                <span class="name">온도</span>
                <span class="value">{{senseData.temperature}}℃</span>
              </div>
            </article>
            <article class="contents" style="width: 45%">
              <div class="img_box">
                <img src="~@/assets/img/icon_2.png" alt="temperature_icon2" style="width: 135%">
              </div>
              <div class="text_box" v-on:click="toggleModal">
                <span class="name">수분</span>
                <span class="value">{{senseData.water}}%</span>
              </div>
            </article>
          </section>
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
      postData: {
        temperature: 0,
        water: 0
      },
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
    },
    postData: {
      handler (val) {
        console.log(document.getElementsByClassName('v-slider__track-background')[0])
        let data = val
        console.log(data)
      },
      deep: true
    }
  },
  computed: {
    senseData: function () {
      let data = this.$_.cloneDeep(this.$store.getters['getMqttSenseData'])
      this.postData['temperature'] = data.temperature
      this.postData['water'] = data.water
      return data
    }
  },
  methods: {
    toggleModal: function (e) {
      let target = e.target.className
      if (target.indexOf('v-slider') > -1) return
      this.isModal = !this.isModal
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
      this.fnConnect()
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
    width: 61px;
    height: 200px;
    .v-slider__track-background {
      // border-radius: 30px;
      border-radius: 15px;
      /*border-top-left-radius: 15px;*/
      /*border-top-right-radius: 15px;*/
    }
    .v-slider__track-fill {
      background: rgb(255, 255, 255);
      /*border-bottom-left-radius: 15px;*/
      /*border-bottom-right-radius: 15px;*/
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
    text-align: center;
    span {
      font-size: 20px;
      width: 50px;
    }
  }
  .slide_icon {
    position: absolute;
    top: 21%;
    left: 50%;
    width: 25px;
    img {
      width: 25px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .27s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>

<template>
  <div class="modal_area" >
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  created () {
    console.log('222')
  }
}
</script>

<style scoped lang="scss">
  /*.overlay {*/
  /*  position: absolute;*/
  /*  left: 0;*/
  /*  top: 0;*/
  /*  right: 0;*/
  /*  bottom: 0;*/
  /*  background-color: black;*/
  /*  opacity: 0.5;*/

  /*  filter: blur(10px);*/
  /*  -webkit-filter: blur(10px);*/
  /*  -moz-filter: blur(10px);*/
  /*  -o-filter: blur(10px);*/
  /*  -ms-filter: blur(10px);*/
  /*  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='svgMask'><feGaussianBlur stdDeviation='10' /></filter></svg>#svgMask");*/

  /*}*/
</style>

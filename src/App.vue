<template>
  <div id="app">
    <div id="nav">
      <app-navbar></app-navbar>
    </div>
    <notifications group="foo" />

    <div class="container-fluid" style="height: calc(100vh - 80px);"><router-view/></div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background: #fafbfd;*/
  background: #f6f6f6;
}


</style>

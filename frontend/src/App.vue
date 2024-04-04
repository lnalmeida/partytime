<template>
  <div>
    <Navbar />
    <router-view class="container"/>
    <Footer />
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
  import Footer from './components/Footer';

  export default {
    name: "App",
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.container {
  min-height: 68.9vh;
}

a {
  transition: .5s;
}

a:hover {
  color: #C1B696;
}
</style>

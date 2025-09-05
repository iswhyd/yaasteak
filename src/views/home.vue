<template>
  <div>
    <Header />
    <Carousel />
    <AboutUs />
    <FavoriteMenu />
    <GoogleMaps />
    <Comments />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Carousel from "../components/Carousel.vue";
import AboutUs from "../components/AboutUs.vue";
import FavoriteMenu from "../components/FavoriteMenu.vue";
import GoogleMaps from "../components/GoogleMaps.vue";
import Comments from "../components/Comments.vue";
import Footer from "../components/footer.vue";

export default {
  components: {
    Header,
    Carousel,
    AboutUs,
    FavoriteMenu,
    GoogleMaps,
    Comments, 
    Footer,
  },
};
</script>
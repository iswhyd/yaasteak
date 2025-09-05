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
import Header from "../admin/AdminHeader.vue";
import Carousel from "../admin/AdminCarousel.vue";
import AboutUs from "../admin/AdminAboutUs.vue";
import FavoriteMenu from "../admin/AdminFavoriteMenu.vue";
import GoogleMaps from "../admin/AdminGoogleMaps.vue";
import Comments from "../admin/AdminComments.vue";
import Footer from "../../components/Footer.vue";

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
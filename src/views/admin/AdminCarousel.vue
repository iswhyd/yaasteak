<template>
  <section class="carousel">
    <div class="carousel-images">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        :class="{ active: index === activeIndex }"
      />
      <button class="carousel-control prev" @click="prevSlide">❮</button>
      <button class="carousel-control next" @click="nextSlide">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      images: [
        { src: "/images/banner.png", alt: "Banner 1" },
        { src: "/images/banner2.png", alt: "Banner 2" },
        { src: "/images/banner3.png", alt: "Banner 3" },
      ],
      activeIndex: 0,
      interval: null,
    };
  },
  methods: {
    prevSlide() {
      this.activeIndex =
        (this.activeIndex + this.images.length - 1) % this.images.length;
      this.restartAutoSlide();
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.restartAutoSlide();
    },
    startAutoSlide() {
      this.interval = setInterval(this.nextSlide, 3000); // 3 detik
    },
    stopAutoSlide() {
      clearInterval(this.interval);
      this.interval = null;
    },
    restartAutoSlide() {
      this.stopAutoSlide();
      this.startAutoSlide();
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
};
</script>

<style scoped>
/* Carousel */
.carousel {
  text-align: center;
  padding: 40px 0;
}

.carousel-images {
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-images img {
  width: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  border-radius: 12px;
}

.carousel-images img.active {
  opacity: 1;
  position: relative;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  color: #555;
  cursor: pointer;
  background: none;
  border: none;
  padding: 10px;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}
</style>

<template>
  <section class="google-maps">
    <h3>Our Location</h3>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7915.449130031583!2d112.755442!3d-7.272151!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbd15c9a7875%3A0x610115ca4219fbf1!2sJl.%20Gubeng%20Airlangga%20II%2C%20Airlangga%2C%20Kec.%20Gubeng%2C%20Surabaya%2C%20Jawa%20Timur%2060286%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1731542945589!5m2!1sen!2sus"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: "GoogleMaps",
};
</script>

<style scoped>
.google-maps {
  text-align: center;
  padding: 20px;
}

/* Container responsif */
.map-container {
  position: relative;
  width: 100%;
  max-width: 800px; /* batas maksimal di desktop */
  margin: 0 auto; /* biar center */
  padding-bottom: 56.25%; /* rasio 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 20px;
}

/* Iframe full dalam container */
.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 20px;
}

/* Kalau di HP, biarin full */
@media (max-width: 768px) {
  .map-container {
    max-width: 100%;
    padding-bottom: 75%; /* bisa diganti lebih tinggi biar lega di hp */
  }
}
</style>


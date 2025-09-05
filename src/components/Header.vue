<template>
  <header class="header">
    <div class="logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>

    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/detailmenu">Menu</router-link></li>
        <li><router-link to="/event">Event</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>

    <!-- Panggil component dropdown -->
    <ProfileDropdown />
  </header>
</template>

<script>
import ProfileDropdown from "./ProfileDropdown.vue";

export default {
  components: { ProfileDropdown }
};
</script>
<style scoped>
/* Tambahkan di CSS header */

@media (max-width: 768px) {
  nav {
    display: none; /* sembunyikan menu di HP */
  }
}

</style>

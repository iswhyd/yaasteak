<template>
  <header class="header">
    <div class="logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>

    <nav>
      <ul>
        <li><router-link to="/admin/home">Home</router-link></li>
        <li><router-link to="/admin/detailmenu">Menu</router-link></li>
        <li><router-link to="/admin/event">Event</router-link></li>
        <li><router-link to="/admin/contact">Contact</router-link></li>
      </ul>
    </nav>

    <!-- Panggil component dropdown -->
    <ProfileDropdown />
  </header>
</template>

<script>
import ProfileDropdown from "../admin/ProfileDropdown.vue";

export default {
  components: { ProfileDropdown }
};
</script>
<style scoped>
@media (max-width: 768px) {
  nav {
    display: none; /* sembunyikan menu di HP */
  }
  }
</style>
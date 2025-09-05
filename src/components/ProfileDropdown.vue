<template>
  <div class="profile" ref="profileWrapper">
    <!-- Tombol Hamburger (khusus mobile) -->
    <div class="hamburger mobile-only" @click="toggleDropdown">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Profile Image (khusus desktop) -->
    <img
      src="/images/customer.png"
      alt="profile"
      class="profile-img desktop-only"
      @click="toggleDropdown"
    />

    <!-- Popup Card -->
    <div v-if="showDropdown" class="popup-card">
      <!-- Bagian User -->
      <div class="user-info">
        <img src="/images/customer.png" alt="profile" class="profile-img" />
        <p>{{ isLoggedIn ? "Admin" : "Customer" }}</p>
      </div>

      <!-- Navigasi (hanya muncul di mobile) -->
      <nav class="popup-nav mobile-only">
        <router-link to="/">Home</router-link>
        <router-link to="/detailmenu">Menu</router-link>
        <router-link to="/event">Event</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>

      <!-- Auth Button (selalu ada, baik desktop maupun mobile) -->
      <div class="auth-btn">
        <button v-if="isLoggedIn" @click="logout">Logout</button>
        <button v-else @click="goLogin">Login as Admin</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goLogin() {
      this.$router.push("/admin/login");
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
.profile {
  position: relative;
}

/* Hamburger */
.hamburger {
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #333;
  border-radius: 3px;
}

/* Profile Image */
.profile-img.desktop-only {
  width: 40px;
  height: 40px;
  border-radius: 20%;
  cursor: pointer;
}

/* Popup */
.popup-card {
  position: absolute;
  top: 50px;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  min-width: 180px;
  padding: 15px;
  z-index: 9999;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}
.user-info img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

/* Nav */
.popup-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}
.popup-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.popup-nav a:hover {
  color: #007bff;
}

/* Auth Button */
.auth-btn button {
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
.auth-btn button:hover {
  background: #f5f5f5;
}

/* Responsive */
.desktop-only {
  display: none;
}
.mobile-only {
  display: flex;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block; /* tampilkan di desktop */
  }
  .mobile-only {
    display: none !important; /* sembunyikan di desktop */
  }
}
</style>

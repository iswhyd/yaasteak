<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Admin Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="text" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.post("https://api.yaasteak.my.id/api/admin/login", {
          username: this.username,
          password: this.password,
        });

        // Simpan token
        localStorage.setItem("token", res.data.token);

        // Redirect ke dashboard admin
        this.$router.push("/admin/home");
      } catch (err) {
        this.error =
          err.response?.data?.message || "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f6fa;
}

.login-card {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 350px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>

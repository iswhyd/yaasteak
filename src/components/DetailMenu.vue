<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const menus = ref([]);
const newMenu = ref({
  nama_detail: "",
  kategori: "paket_hemat",
  gambar: null,
  link_whatsapp: "",
  link_gofood: "",
});

const editingMenu = ref(null); // simpan menu yang sedang diedit

// Fetch data dari backend
const fetchMenus = async () => {
  try {
    const res = await api.get("/api/details");
    menus.value = res.data.data;
  } catch (err) {
    console.error("Error fetch:", err);
  }
};

// Handle file input
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newMenu.value.gambar = file;
  }
};

// Tambah menu baru
const createMenu = async () => {
  try {
    const formData = new FormData();
    formData.append("nama_detail", newMenu.value.nama_detail);
    formData.append("kategori", newMenu.value.kategori);
    if (newMenu.value.gambar) formData.append("gambar", newMenu.value.gambar);
    formData.append("link_whatsapp", newMenu.value.link_whatsapp);
    formData.append("link_gofood", newMenu.value.link_gofood);

    await api.post("/api/details", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await fetchMenus();
    resetForm();
  } catch (err) {
    console.error("Error create:", err);
  }
};

// Edit menu (load data ke form)
const editMenu = (menu) => {
  editingMenu.value = menu.id;
  newMenu.value = {
    nama_detail: menu.nama_detail,
    kategori: menu.kategori,
    gambar: null, // file baru optional
    link_whatsapp: menu.link_whatsapp,
    link_gofood: menu.link_gofood,
  };
};

// Update menu
const updateMenu = async () => {
  try {
    const formData = new FormData();
    formData.append("nama_detail", newMenu.value.nama_detail);
    formData.append("kategori", newMenu.value.kategori);
    if (newMenu.value.gambar) formData.append("gambar", newMenu.value.gambar);
    formData.append("link_whatsapp", newMenu.value.link_whatsapp);
    formData.append("link_gofood", newMenu.value.link_gofood);

    await api.post(`/api/details/${editingMenu.value}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await fetchMenus();
    resetForm();
  } catch (err) {
    console.error("Error update:", err);
  }
};

// Hapus menu
const deleteMenu = async (id) => {
  try {
    await api.delete(`/api/details/${id}`);
    await fetchMenus();
  } catch (err) {
    console.error("Error delete:", err);
  }
};

// Reset form
const resetForm = () => {
  newMenu.value = {
    nama_detail: "",
    kategori: "paket_hemat",
    gambar: null,
    link_whatsapp: "",
    link_gofood: "",
  };
  editingMenu.value = null;
};

onMounted(fetchMenus);
</script>

<template>
  <div>
    <Header />
    <section class="favorite-menu">
      <h3>MENU</h3>

      <!-- Render tiap kategori -->
      <div v-for="kategori in ['paket_hemat','special_offers','special_nasi']" :key="kategori">
        <h2 class="mt-4">{{ kategori.replace('_',' ').toUpperCase() }}</h2>
        <div class="menu-items">
          <div v-for="menu in menus.filter(m => m.kategori === kategori)" :key="menu.id" class="menu-card">
            <img v-if="menu.gambar" :src="menu.gambar" :alt="menu.nama_detail" />
            <p>{{ menu.nama_detail }}</p>
            <a :href="menu.link_whatsapp" target="_blank" class="menu-button">Order Via Whatsapp</a>
            <a :href="menu.link_gofood" target="_blank" class="menu-button">Order Via GoFood</a>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
.menu-button {
  display: inline-block;
  background-color: #007bff;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  padding: 8px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-button:hover {
  background-color: #0056b3;
}
@media (max-width: 768px){
.menu-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}
.menu-card {
    width: 150px;
    height: 300%;
    background-color: #ffffff;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-card:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.menu-card img {
    width: 100%;
    height: 120px;
    border-radius: 12px;
}

.menu-card p {
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
    color: #333;
}

.menu-card button {
    background-color: #007bff;
    font-size: 10px;
    color: #ffffff;
    margin: 5px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.menu-card button:hover {
    background-color: #0056b3;
}
.menu-button {
  display: inline-block;
  background-color: #007bff;
  font-size: 10px;
  color: #fff;
  text-decoration: none;
  padding: 9px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-button:hover {
  background-color: #0056b3;
}
}

</style>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import Header from "../admin/AdminHeader.vue";
import Footer from "../../components/Footer.vue";

const menus = ref([]);
const newMenu = ref({
  nama_detail: "",
  kategori: "paket_hemat",
  gambar: null,
  link_whatsapp: "",
  link_gofood: "",
});

const editingMenu = ref(null); // simpan menu yang sedang diedit
const formRef = ref(null); // 🔹 Ref untuk form


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

  if (formRef.value) {
    formRef.value.scrollIntoView({ behavior: "auto", block: "start" });
  }
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

      <!-- Form Tambah/Edit Menu -->
      <div class="form-container" ref="formRef">
  <h4>{{ editingMenu ? "Edit Menu" : "Tambah Menu Baru" }}</h4>
  <form @submit.prevent="editingMenu ? updateMenu() : createMenu()">
    <input 
      v-model="newMenu.nama_detail" 
      placeholder="Nama menu" 
      required 
      ref="namaInput"  />
    <select v-model="newMenu.kategori">
      <option value="paket_hemat">Paket Hemat</option>
      <option value="special_offers">Special Offers</option>
      <option value="special_nasi">Spesial Nasi</option>
    </select>
    <input type="file" @change="handleFileChange" />
    <input v-model="newMenu.link_whatsapp" placeholder="Link Whatsapp" />
    <input v-model="newMenu.link_gofood" placeholder="Link GoFood" />

    <button type="submit">
      {{ editingMenu ? "Update" : "Tambah" }}
    </button>
    <button v-if="editingMenu" type="button" @click="resetForm">Batal</button>
  </form>
</div>

      <!-- Render tiap kategori -->
      <div v-for="kategori in ['paket_hemat','special_offers','special_nasi']" :key="kategori">
        <h2 class="mt-4">{{ kategori.replace('_',' ').toUpperCase() }}</h2>
        <div class="menu-items">
          <div v-for="menu in menus.filter(m => m.kategori === kategori)" :key="menu.id" class="menu-card">
            <img v-if="menu.gambar" :src="menu.gambar" :alt="menu.nama_detail" />
            <p>{{ menu.nama_detail }}</p>
            <a :href="menu.link_whatsapp" target="_blank" class="menu-button">Order Via Whatsapp</a>
            <a :href="menu.link_gofood" target="_blank" class="menu-button">Order Via GoFood</a>
            <div class="menu-actions">
            <button @click="editMenu(menu)">Edit</button>
            <button @click="deleteMenu(menu.id)">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>

/* Form */
/* Favorite Menu */
.favorite-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
}

.favorite-menu h3 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.menu-container {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.menu-card {
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 420px; /* fix tinggi biar konsisten */
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.menu-card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.menu-card img {
    width: 150px;
    height: 150px;
    border-radius: 12px;
    object-fit: fill;
}

.menu-card h4 {
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0;
  color: #333;

  /* batasi teks biar gak bikin card tinggi */
  
  /* overflow: hidden; */
  text-overflow: ellipsis;
}

.menu-links button {
  background-color: #007bff;
  font-size: 15px;
  color: #ffffff;
  margin: 5px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-links button:hover {
  background-color: #0056b3;
}
.form-container {
  margin: 20px 0;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.form-container h4 {
  margin-bottom: 15px;
  color: #444;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

form input,
form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  width: 100%;
}

form input[type="file"] {
  border: none;
}

form button {
  grid-column: span 2;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}

form button:hover {
  background: #0056b3;
}

form button[type="button"] {
  background: #999;
}
form button[type="button"]:hover {
  background: #777;
}
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


@media (max-width: 768px) {
/* Form */
.form-container {
  margin: 20px 0;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.form-container h4 {
  margin-bottom: 15px;
  color: #444;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

form input,
form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  width: 140px;
}

form input[type="file"] {
  border: none;
}

form button {
  grid-column: span 2;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}

form button:hover {
  background: #0056b3;
}

form button[type="button"] {
  background: #999;
}
form button[type="button"]:hover {
  background: #777;
}
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
    font-size: 12px;
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
}

</style>

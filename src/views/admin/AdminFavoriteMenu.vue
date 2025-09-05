<script setup>
import { ref } from 'vue';
import api from '../../api';
import dayjs from 'dayjs';

// Format tanggal
const formatDate = (date) => dayjs(date).format('DD MMM YYYY, HH:mm');

// State utama
const menus = ref([]);
const newMenu = ref({
  nama_menu: '',
  gambar: '',
  link_whatsapp: '',
  link_gofood: '',
});
const editMenu = ref(null); // State untuk mode edit
const errors = ref([]);
const imagePreview = ref(''); // Untuk pratinjau gambar

// Fetch data menu
const fetchMenus = async () => {
  try {
    const response = await api.get('/api/menus');
    menus.value = response.data.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
  }
};

// Fungsi untuk menangani gambar
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    newMenu.value.gambar = file; // Simpan file gambar ke state
  }
};

// Submit menu (create/update)
const submitMenu = async () => {
  try {
    const formData = new FormData();
    formData.append('nama_menu', newMenu.value.nama_menu);
    formData.append('link_whatsapp', newMenu.value.link_whatsapp);
    formData.append('link_gofood', newMenu.value.link_gofood);

    // Tambahkan file gambar hanya jika baru dipilih
    if (newMenu.value.gambar && typeof newMenu.value.gambar !== 'string') {
      formData.append('gambar', newMenu.value.gambar);
    }

    if (editMenu.value) {
      // Update menu
      formData.append('_method', 'PUT'); // Gunakan POST dengan _method PUT
      await api.post(`/api/menus/${editMenu.value.id}`, formData);
      editMenu.value = null; // Reset state edit
    } else {
      // Tambah menu baru
      await api.post('/api/menus', formData);
    }

    // Reset form setelah submit
    newMenu.value = { nama_menu: '', gambar: '', link_whatsapp: '', link_gofood: '' };
    imagePreview.value = '';
    fetchMenus();
  } catch (error) {
    console.error('Error submitting menu:', error);
    if (error.response && error.response.data) {
      errors.value = error.response.data;
    }
  }
};

// Edit menu
const editExistingMenu = (menu) => {
  editMenu.value = menu;
  newMenu.value = { ...menu }; // Isi form dengan data menu yang akan diedit
  imagePreview.value = menu.gambar; // Tampilkan gambar yang ada
};

// Delete menu
const deleteMenu = async (id) => {
  try {
    await api.delete(`/api/menus/${id}`);
    fetchMenus();
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
};

// Batalkan edit
const cancelEdit = () => {
  editMenu.value = null;
  newMenu.value = { nama_menu: '', gambar: '', link_whatsapp: '', link_gofood: '' };
  imagePreview.value = '';
};

// Fetch data saat komponen dimuat
fetchMenus();
</script>

<template>
  <section class="favorite-menu">
    <h3>MENU FAVORITE</h3>
    <div class="menu-container">
      <div v-for="menu in menus" :key="menu.id" class="menu-card">
        <img :src="menu.gambar" :alt="menu.nama_menu" />
        <h4>{{ menu.nama_menu }}</h4>
        <div class="menu-links">
          <a :href="menu.link_whatsapp" target="_blank" class="btn-link">Order Via Whatsapp</a>
          <a :href="menu.link_gofood" target="_blank" class="btn-link">Order Via GoFood</a>
        </div>
        <div class="menu-actions">
          <button @click="editExistingMenu(menu)" class="edit-button">Edit</button>
          <button @click="deleteMenu(menu.id)" class="delete-button">Hapus</button>
        </div>
      </div>
      <p v-if="menus.length === 0">Tidak ada menu favorite saat ini.</p>
    </div>

    <form @submit.prevent="submitMenu" class="menu-form">
      <input
        type="text"
        v-model="newMenu.nama_menu"
        placeholder="Nama Menu"
        required
      />
      <input
        type="file"
        @change="handleImageChange"
        accept="image/*"
        :required="!editMenu"
      />
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Gambar pratinjau" />
      </div>
      <input
        type="text"
        v-model="newMenu.link_whatsapp"
        placeholder="Link Whatsapp"
        required
      />
      <input
        type="text"
        v-model="newMenu.link_gofood"
        placeholder="Link GoFood"
        required
      />
      <button type="submit">
        {{ editMenu ? 'Perbarui Menu' : 'Tambah Menu' }}
      </button>
      <button
        v-if="editMenu"
        type="button"
        @click="cancelEdit"
      >
        Batal
      </button>
    </form>
  </section>
</template>

<style scoped>
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
  height: 400px; /* fix tinggi biar konsisten */
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
@media (max-width: 768px) {
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
  height: 350px;
  width: 325px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.menu-card {
  justify-content:center;
  display: flex; 
  flex-direction: column; 
  width: 150px;
  height: 325px;
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 8 6px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.menu-card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.menu-card img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
}

.menu-card h4 {
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0;
  color: #333;
}

.menu-links {
  display: flex;
  flex-direction: column;
}

.menu-links button {
  background-color: #007bff;
  font-size: 10px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-links button:hover {
  background-color: #0056b3;
}

.btn-link {
  display: inline-block;
  background-color: #007bff;
  font-size: 10px;
  color: #ffffff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  transition: background 0.3s;
  margin: 5px;
}

.btn-link:hover {
  background-color: #0056b3;
}
}
</style>

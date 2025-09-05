<script setup>
import { ref, onMounted } from "vue";
import api from "../../api"; // axios instance
import Header from "../admin/AdminHeader.vue";

const events = ref([]);
const newEvent = ref({
  judul: "",
  deskripsi: "",
  gambar: null,
});

const editingEvent = ref(null);
const formRef = ref(null);

// Fetch data dari backend
const fetchEvents = async () => {
  try {
    const res = await api.get("/api/events");
    events.value = res.data.data || res.data; // sesuai response controller
  } catch (err) {
    console.error("Error fetch:", err);
  }
};

// Handle file input
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newEvent.value.gambar = file;
  }
};

// Tambah event baru
const createEvent = async () => {
  try {
    const formData = new FormData();
    formData.append("judul", newEvent.value.judul);
    formData.append("deskripsi", newEvent.value.deskripsi);
    if (newEvent.value.gambar) formData.append("gambar", newEvent.value.gambar);

    await api.post("/api/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await fetchEvents();
    resetForm();
  } catch (err) {
    console.error("Error create:", err);
  }
};

// Edit event (load data ke form)
const editEvent = (event) => {
  editingEvent.value = event.id;
  newEvent.value = {
    judul: event.judul,
    deskripsi: event.deskripsi,
    gambar: null, // file baru optional
  };
  // Scroll ke atas
  if (formRef.value) {
    formRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Update event
const updateEvent = async () => {
  try {
    const formData = new FormData();
    formData.append("judul", newEvent.value.judul);
    formData.append("deskripsi", newEvent.value.deskripsi);
    if (newEvent.value.gambar) formData.append("gambar", newEvent.value.gambar);

    await api.post(`/api/events/${editingEvent.value}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await fetchEvents();
    resetForm();
  } catch (err) {
    console.error("Error update:", err);
  }
};

// Hapus event
const deleteEvent = async (id) => {
  try {
    await api.delete(`/api/events/${id}`);
    await fetchEvents();
  } catch (err) {
    console.error("Error delete:", err);
  }
};

// Reset form
const resetForm = () => {
  newEvent.value = {
    judul: "",
    deskripsi: "",
    gambar: null,
  };
  editingEvent.value = null;
};

onMounted(fetchEvents);
</script>

<template>
  <div>
    <Header />

    <section class="event-section">
      <h3>EVENTS</h3>

      <!-- Form Tambah/Edit Event -->
      <div class="form-container" ref="formRef">
        <h4>{{ editingEvent ? "Edit Event" : "Tambah Event Baru" }}</h4>
        <form @submit.prevent="editingEvent ? updateEvent() : createEvent()">
          <input v-model="newEvent.judul" placeholder="Judul event" required />
          <textarea v-model="newEvent.deskripsi" placeholder="Deskripsi" required></textarea>
          <input type="file" @change="handleFileChange" />

          <button type="submit">
            {{ editingEvent ? "Update" : "Tambah" }}
          </button>
          <button v-if="editingEvent" type="button" @click="resetForm">Batal</button>
        </form>
      </div>

      <!-- List Event -->
      <div class="event-list">
        <div v-for="event in events" :key="event.id" class="event-card">
          <img v-if="event.gambar" :src="event.gambar" :alt="event.judul" class="event-image" />
          <h3>{{ event.judul }}</h3>
          <p>{{ event.deskripsi }}</p>
          <div class="event-actions">
          <button @click="editEvent(event)">Edit</button>
          <button @click="deleteEvent(event.id)">Hapus</button>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer2">
      <p>© 2024 Yaa Steak. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.event-section {
  width: 80%;
  margin: auto;
  text-align: center;
}


.form-container {
  margin: 20px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.event-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.event-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

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
.event-actions button {
  background-color: #007bff;
  color: #ffffff;
  margin: 5px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.event-actions button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .event-section {
  width: 80%;
  margin: auto;
  text-align: center;
}

.form-container {
  margin: 20px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.event-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}
.event-image {
  width: 100%;
  height: 200px;
  object-fit:fill;
  border-radius: 12px;
}}
</style>

/* form input,
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
} */

/* Untuk HP (layar max 768px) */

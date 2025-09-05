<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api';
import dayjs from 'dayjs';

const formatDate = (date) => dayjs(date).format('DD MMM YYYY, HH:mm');
const router = useRouter();
const comments = ref([]);
const newComment = ref({
  nama: '',
  isikomentar: '',
});
const editComment = ref(null);
const errors = ref([]);

const fetchComments = async () => {
  try {
    const response = await api.get('/api/komentar');
    console.log('Fetched comments:', response.data);
    comments.value = response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const submitComment = async () => {
  try {
    if (editComment.value) {
      // Update existing comment
      await api.put(`/api/komentar/${editComment.value.id}`, newComment.value);
      editComment.value = null;
    } else {
      // Add new comment
      let formData = new FormData();
      formData.append('nama', newComment.value.nama);
      formData.append('isikomentar', newComment.value.isikomentar);

      await api.post('/api/komentar', formData);
    }

    newComment.value = { nama: '', isikomentar: '' };
    fetchComments();
  } catch (error) {
    console.error('Error submitting comment:', error);
    if (error.response && error.response.data) {
      errors.value = error.response.data;
    }
  }
};

const editExistingComment = (comment) => {
  editComment.value = comment;
  newComment.value = { ...comment };
};

const deleteComment = async (id) => {
  try {
    await api.delete(`/api/komentar/${id}`);
    fetchComments();
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

fetchComments();
</script>

<template>
  <section class="comment">
    <h3>Komentar</h3>
    <div class="comment-container">
      <div v-for="comment in comments" :key="comment.id" class="comment-card">
        <div class="comment-header">
          <h4>{{ comment.nama }}</h4>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p>{{ comment.isikomentar }}</p>
        <div class="comment-actions">
          <button @click="editExistingComment(comment)" class="edit-button">Edit</button>
          <button @click="deleteComment(comment.id)" class="delete-button">Hapus</button>
        </div>
      </div>
      <p v-if="comments.length === 0">Belum ada komentar.</p>
    </div>
    <form @submit.prevent="submitComment" class="comment-form">
      <input type="text" v-model="newComment.nama" placeholder="Nama Anda" class="comment-input" required />
      <textarea v-model="newComment.isikomentar" placeholder="Tulis komentar Anda..." class="comment-textarea" required></textarea>
      <button type="submit" class="comment-button">
        {{ editComment ? 'Perbarui Komentar' : 'Kirim Komentar' }}
      </button>
      <button v-if="editComment" @click="() => { editComment = null; newComment = { nama: '', isikomentar: '' }; }" type="button" class="cancel-button">Batal</button>
    </form>
  </section>
</template>

<style scoped>
.comment {
  padding: 20px;
}

.comment h3 {
  text-align: center;
  margin-bottom: 15px;
}

/* Container scrollable */
.comment-container {
  max-height: 400px; /* biar nggak kepanjangan di hp */
  overflow-y: auto;
  padding-right: 5px; /* kasih space biar ga nabrak scrollbar */
}

/* Styling tiap card komentar */
.comment-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap; /* biar di hp nama & tanggal bisa turun */
}

.comment-header h4 {
  font-size: 16px;
  margin: 0;
  color: #333;
}

.comment-date {
  font-size: 13px;
  color: #666;
}

/* Responsif untuk HP */
@media (max-width: 768px) {
  .comment {
    padding: 10px;
  }

  .comment-card {
    padding: 12px;
  }

  .comment-header h4 {
    font-size: 14px;
  }

  .comment-date {
    font-size: 12px;
  }

  .comment-container {
    max-height: 300px; /* lebih pendek biar pas di hp */
  }
}
</style>
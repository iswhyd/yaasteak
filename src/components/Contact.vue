
<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

  export default {
    name: "Contact",
    components: {
    Header,
    Footer
  }
  };
</script>
<template>
    <div>
    <!-- Header -->
     <Header />
    <!-- Contact Card Section -->
    <section class="contact-card">
        <div class="contact-content">
            <h2>Contact Us</h2>
            <p>Terima kasih atas kunjungannya , jika ada kendala mohon hubungi nomor atau sosial media kami.</p>
            <div class="contact-buttons">
                <a href="http://wa.me/+6285975305091?text=Hallo%20Yaa%20Steak%20%2C%20Saya%20Ingin%20Menanyakan%20Sesuatu" target="_blank" class="contact-button whatsapp">WhatsApp Admin</a>
                <a href="https://instagram.com/yaasteak_" target="_blank" class="contact-button instagram">Instagram</a>
            </div>
        </div>
    </section>
    <!-- Footer (Placeholder) -->
    <Footer />
    </div>
</template>
<style scoped>

@media (max-width: 768px) {
  /* Contact Card */
  .contact-card {
    display: flex;
    flex-direction: column; /* biar isi ditumpuk */
    align-items: center;
    justify-content: center;
    padding: 40px 20px; /* padding lebih kecil */
    margin: 40px 20px;
    text-align: center;
  }

  .contact-content {
    width: 100%;
    max-width: 400px; /* biar tidak melebar */
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .contact-content h2 {
    font-size: 1.5em; /* dikecilin di hp */
    margin-bottom: 10px;
  }

  .contact-content p {
    font-size: 1em;
    margin-bottom: 20px;
    color: #000000;
  }

  .contact-buttons {
    display: flex;
    flex-direction: column; /* tombol ditumpuk */
    gap: 10px;
    align-items: center;
  }

  .contact-button {
    width: 100%;  /* tombol full lebar kontainer */
    max-width: 250px;
    text-align: center;
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: bold;
  }
}

</style>

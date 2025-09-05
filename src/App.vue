<template>
  <div>
    <router-view/>
  </div>
</template>

<style>
/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, sans-serif;
    background-color: #ffffff;
    color: #333;
    line-height: 1.6;
    width: 100%;
    overflow-x: hidden;
}

/* Header */
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    background-color: #ffffff;  
}

.logo img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 100px;
}

nav ul li a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    padding: 15px 30px;
    border-radius: 19px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease, color 0.5s ease;
}

nav ul li a:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

nav ul li2 a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    padding: 15px 30px;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease, color 0.5s ease;
}

nav ul li2 a:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.icons .icon {
    width: 8px;
    height: 8px;
    margin-left: 5px;
    background-color: #e74c3c;
    border-radius: 50%;
}

/* About Us */
.about-us {
    text-align: center;
    background-color: #ffffff;
}

.about-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin: 20px auto;
    max-width: 800px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.about-location {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin: 20px auto;
    max-width: 800px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.icon-fire {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.icon-fire3 {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.icon-location {
    width: 100px;
    border-radius: 8px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: flex;  /* Jadi kolom di HP */
    align-items: center;     /* Gambar tetap center */
    gap: 20px;
    padding: 15px;
    max-width: 95%;
  }
  .about-location {
    flex-direction:flex;  /* Jadi kolom di HP */
    align-items: center;     /* Gambar tetap center */
    gap: 20px;
    padding: 15px;
    max-width: 95%;
  }

  .about-content p {
    text-align:center;   /* teks tetap rata kiri */
    max-width: 90%;     /* biar nggak mepet ke tepi */
    height: 150px;
    overflow: auto;      /* kasih scroll kalo kepanjangan */
    font-size: 14px;
    line-height: 1.6;
  }

  .about-location p {
    text-align:center;   /* teks tetap rata kiri */
    max-width: 90%;     /* biar nggak mepet ke tepi */
    height: 120px;
    overflow: auto;      /* kasih scroll kalo kepanjangan */
    font-size: 14px;
    line-height: 1.6;
  }
  .icon-fire {
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
  }

  .icon-fire3 {
    width: 220px;
    height: 220px;
    margin-bottom: 10px;
  }

  .icon-location {
    width: 80px;
    margin-bottom: 10px;
  }
}

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
  width: 150px;
  height: 350px; /* fix tinggi biar konsisten */
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
.btn-link {
  display: inline-block;
  background-color: #007bff;
  font-size: 14px;
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

.menu-links button {
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

.menu-links button:hover {
  background-color: #0056b3;
}

.menu-actions button {
  background-color: #ffc107;
  font-size: 10px;
  color: #ffffff;
  margin: 5px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.menu-actions button:hover {
  background-color: #e0a800;
}

.menu-form {
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-form input,
.menu-form button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.menu-form button {
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-form button:hover {
  background-color: #218838;
}

.image-preview {
  margin-top: 10px;
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
}
/* Google Maps */
.google-maps {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #ffffff;
}

.google-maps h3 {
    color: #333;
    margin-bottom: 20px;
}

/* Contact Card */
.contact-card {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 250px;
    margin-bottom: 80px;
    text-align: center;
}

.contact-content {
    max-width: 500px;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.contact-content h2 {
    font-size: 2em;
    margin-bottom: 10px;
}

.contact-content p {
    font-size: 1.1em;
    margin-bottom: 20px;
    color: #000000;
}

.contact-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.contact-button {
    color: #1a1a1a;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease, color 0.5s ease;
}

.contact-button.instagram:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.contact-button.whatsapp:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.contact-button.whatsapp {
    background-color: #25D366; /* WhatsApp green */
    color: #fff;
}

.contact-button.instagram {
    background-color: #E1306C; /* Instagram pink */
    color: #fff;
}

.linkkartu{
    color: white;
    text-decoration: none;
}

/* Komentar Section */
.comment {
    padding: 40px 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 40px auto;
    max-width: 800px;
}

.comment h3 {
    text-align: center;
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
}

.comment-container {
    max-height: 250px; /* Adjust this value based on the height of your cards */
    overflow-y: auto;
    margin-bottom: 30px;
}

.comment-card {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.comment-header h4 {
    font-size: 1.2em;
    color: #333;
    margin: 0;
}

.comment-header .comment-date {
    font-size: 0.9em;
    color: #888;
}

.comment p {
    font-size: 1em;
    color: #555;
    line-height: 1.5;
    margin: 0;
}

/* Comment Form */
.comment-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.comment-input,
.comment-textarea {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1em;
    outline: none;
    transition: border-color 0.3s;
}

.comment-input:focus,
.comment-textarea:focus {
    border-color: #007bff;
}

.comment-button {
    padding: 10px 15px;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.comment-button:hover {
    background-color: #0056b3;
}

.comment-actions {
  margin-top: 10px;
}
.edit-button,
.delete-button {
    border: 0px;
  margin-right: 5px;
  cursor: pointer;
}
.edit-button {
  color: blue;
}
.delete-button {
  color: red;
}

/* Footer */
footer {
    text-align: center;
    padding: 20px;
    background-color: #ffffff;
    color: #333;
}
.favorite-menu {
    padding: 40px 20px;
    text-align: center;
}

.favorite-menu h3 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
}

.menu-items {
    display: flex;
    margin: 15px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}
.menu-items2 {
    display: flex;
    margin: 15px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}
.menu-cardhemat {
    width: 300px;
    background-color: #ffffff;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-cardhemat:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.menu-cardhemat img {
    width: 100%;
    border-radius: 12px;
}

.menu-cardhemat p {
    font-weight: bold;
    margin: 10px 0;
    color: #333;
}

.menu-cardhemat button {
    background-color: #007bff;
    color: #ffffff;
    margin: 5px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.menu-cardhemat button:hover {
    background-color: #0056b3;
}

.menu-card {
    width: 200px;
    background-color: #ffffff;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-card:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.menu-card img {
    width: 100%;
    border-radius: 12px;
}

.menu-card p {
    font-weight: bold;
    margin: 10px 0;
    color: #333;
}

.menu-card button {
    background-color: #007bff;
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

/* Responsive */
@media (max-width: 768px) {
  body {
    font-size: 14px;        /* teks agak kecil di HP */
    line-height: 1.6;       /* jarak antar baris nyaman */
    padding: 0 10px;        /* kasih space kiri kanan */
    background-color: #fff; /* biar terang & clean */
  }

  section {
    max-width: 100%;        /* full lebar HP */
    margin: 0 auto;
  }

  p {
    text-align: left;       /* teks rata kiri (rapi di HP) */
  }

}
</style>



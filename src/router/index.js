//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
  {
    path: '/admin/home',
    name: 'Adminhome',
    component: () => import(/* webpackChunkName: "home" */ '../views/admin/Adminhome.vue')
  },
  {
    path: '/admin/detailmenu',
    name: 'Admindetailmenu',
    component: () => import(/* webpackChunkName: "detailmenu" */ '../views/admin/AdminDetailMenu.vue')
  },
  {
    path: '/admin/event',
    name: 'Adminevent',
    component: () => import(/* webpackChunkName: "event" */ '../views/admin/AdminEvent.vue')
  },
  {
    path: '/admin/contact',
    name: 'Admincontact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/admin/AdminContact.vue')
  },
  {
    path: '/admin/AdminPosts',
    name: 'posts.index',
    component: () => import(/* webpackChunkName: "index" */ '../views/posts/index.vue')
  },
  {
    path: '/admincreate',
    name: 'posts.create',
    component: () => import(/* webpackChunkName: "create" */ '../views/posts/create.vue')
  },
  { 
    path: '/admin/menus',
    name: 'MenuFormCreate',
    component: () => import(/* webpackChunkName: "menus" */ '../components/FavoriteMenu.vue')
  },
  {
    path: '/admin/komentar',
    name: 'AdminComments',
    component: () => import(/* webpackChunkName: "comments" */ '../components/Comments.vue')
  },
  {
    path: '/edit/:id',
    name: 'posts.edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/posts/edit.vue')
  },
  {
  path: "/admin/login",
  name: "AdminLogin",
  component: () => import("../views/admin/Login.vue"),
  },
  //--------------------------------------------------------//
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/detailmenu',
    name: 'detailmenu',
    component: () => import(/* webpackChunkName: "detailmenu" */ '../components/DetailMenu.vue')
  },
  {
    path: '/event',
    name: 'event',
    component: () => import(/* webpackChunkName: "event" */ '../components/Event.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../components/Contact.vue')
  },
  {
    path: '/posts',
    name: 'posts.index',
    component: () => import(/* webpackChunkName: "index" */ '../views/posts/index.vue')
  },
  {
    path: '/create',
    name: 'posts.create',
    component: () => import(/* webpackChunkName: "create" */ '../views/posts/create.vue')
  },
  { 
    path: '/menus',
    name: 'MenuFormCreate',
    component: () => import(/* webpackChunkName: "menus" */ '../components/FavoriteMenu.vue')
  },
  {
    path: '/komentar',
    name: 'Comments',
    component: () => import(/* webpackChunkName: "comments" */ '../components/Comments.vue')
  },
  {
    path: '/edit/:id',
    name: 'posts.edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/posts/edit.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

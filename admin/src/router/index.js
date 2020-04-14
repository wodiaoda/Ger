import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Mian from '../views/Mian.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import Categorylist from '../views/Categorylist.vue'

import itemEdit from '../views/itemsEdit.vue'
import itemlist from '../views/itemsList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import Herolist from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import Articlelist from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import Adlist from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserlist from '../views/AdminUserList.vue'

import register from '../views/register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login,
    meta: { isPublic:true }
  },
  {
    path:"/register",
    name:"register",
    component:register,
  },

  {
    path:"/",
    name:'Mian',
    component:Mian,
    children:[
      {path:"/categories/create",component:CategoryEdit},
      {path:"/categories/edit/:id",component:CategoryEdit,props:true},
      {path:"/categories/list",component:Categorylist},


      {path:"/items/create",component:itemEdit},
      {path:"/items/edit/:id",component:itemEdit,props:true},
      {path:"/items/list",component:itemlist},

      {path:"/heros/create",component:HeroEdit},
      {path:"/heros/edit/:id",component:HeroEdit,props:true},
      {path:"/heros/list",component:Herolist},

      {path:"/articles/create",component:ArticleEdit},
      {path:"/articles/edit/:id",component:ArticleEdit,props:true},
      {path:"/articles/list",component:Articlelist},

      {path:"/Ads/create",component:AdEdit},
      {path:"/Ads/edit/:id",component:AdEdit,props:true},
      {path:"/Ads/list",component:Adlist},

      {path:"/admin_users/create",component:AdminUserEdit},
      {path:"/admin_users/edit/:id",component:AdminUserEdit,props:true},
      {path:"/admin_users/list",component:AdminUserlist},
    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
if(!to.meta.isPublic && !localStorage.token){
  return next("login")
}
  next()
})
export default router

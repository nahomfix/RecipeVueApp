import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
// import 'materialize-css/dist/css/materialize.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter);
Vue.use(Vuetify);

import Recipes from './components/Recipes.vue';
import RecipeDetails from './components/RecipeDetails.vue';
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignupPage.vue';
import NotFoundPage from './components/NotFoundPage.vue';

const routes = [
  {path: '/', component: Recipes},
  {path:'/recipes', component: Recipes},
  {path: '/recipes/:recipeId', component: RecipeDetails},
  {path: '/login', component:LoginPage},
  {path: '/signup', component:SignupPage},
  {path:'*', component:NotFoundPage}
];

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

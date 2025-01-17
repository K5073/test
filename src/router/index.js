import { createRouter, createWebHistory } from 'vue-router';
import LayoutView from '../views/LayoutView.vue'; // 레이아웃 컴포넌트
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Layout',
    component: LayoutView,
    children: [
      {
        path: '/category',
        name: 'Category',
        component: () => import('../views/CategoryView.vue'),
      },
      {
        path: '/community',
        name: 'Community',
        component: () => import('../views/CommunityView.vue'),
      },
      {
        path: '/guidelines',
        name: 'Guidelines',
        component: () => import('../views/GuidelinesView.vue'),
      },
      {
        path: '/mybooks',
        name: 'MyBooks',
        component: () => import('../views/MyBooksView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Signup') {
    // 로그인 페이지로 이동할 때는 상단바 숨기기
    document.body.classList.add('no-header');
  } else {
    // 로그인 페이지에서 나올 때는 상단바 보이기
    document.body.classList.remove('no-header');
  }
  next();
});

export default router;

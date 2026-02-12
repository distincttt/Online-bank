import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Help from "../views/Help.vue";
import Auth from "../views/Login.vue";
import Request from "../views/Request.vue";
import Registration from "../views/Registration.vue";
import store from "../store";

import { RouteName } from "@/types/router";

export const routes: RouteRecordRaw[] = [
   {
      path: "/",
      name: RouteName.Home,
      component: Home,
      meta: { layout: "main", auth: true },
   },
   {
      path: "/help",
      name: RouteName.Help,
      component: Help,
      meta: { layout: "main", auth: true },
   },
   {
      path: "/auth",
      name: RouteName.Auth,
      component: Auth,
      meta: { layout: "auth", auth: false },
   },
   {
      path: "/registration",
      name: RouteName.Registration,
      component: Registration,
      meta: { layout: "auth", auth: false },
   },
   {
      path: "/requests/:id",
      name: RouteName.Request,
      component: Request,
      meta: { layout: "main", auth: true },
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
   linkActiveClass: "active",
   linkExactActiveClass: "active",
});

router.beforeEach((to, from, next): void => {
   const requiresAuth = to.meta.auth;
   if (requiresAuth && store.getters["authModule/isAuthenticated"]) {
      next();
   } else if (requiresAuth && !store.getters["authModule/isAuthenticated"]) {
      next("/registration?message=auth");
   } else {
      next();
   }
});

export default router;

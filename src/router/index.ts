import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

//page importing
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/admins",
  },
  {
    path: "/admins",
    name: "admins",
    component: () => import("@/views/pages/AdminPage/AdminPage.vue"),
    children: [
      {
        path: "",
        name: "adminTable",
        component: () => import("@/components/AdminPage/AdminPageIndex.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/admins",
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

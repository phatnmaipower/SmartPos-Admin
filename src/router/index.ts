import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

//page importing

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/pages/AdminPage/AdminPage.vue"),
    children: [
      {
        path: "admins",
        name: "admins",
        component: () =>
          import("@/views/components/AdminPage/AdminTableContainer.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/admins",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

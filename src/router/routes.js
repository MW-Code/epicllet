const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        // redirect: "/dashboard"
        component: () => import("pages/Index.vue")
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("pages/Dashboard.vue"),
        // component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "/signx",
        name: "SignX",
        component: () => import("pages/Signx.vue"),
        // component: SignX,
        meta: { requiresAuth: false }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;

const routes = [{
  path: "/",
  component: () => import("layouts/MainLayout.vue"),
  children: [{
      path: "",
      component: () => import("pages/Index.vue")
    },
    {
      path: "storymoji",
      component: () => import("pages/storymoji/Index.vue")
    },
    {
      path: "storymoji/solo",
      component: () => import("pages/storymoji/StorySolo.vue")
    },
    {
      path: "storymoji/multi",
      component: () => import("pages/storymoji/StoryMultiplayer.vue")
    },
    {
      path: "storymoji/multi/:id",
      component: () => import("pages/storymoji/StoryMultiplayerGame.vue"),
      props: true,
    },
    {
      path: "gba",
      component: () => import("pages/gba/Index.vue"),
    },
    {
      path: "gba/:id",
      component: () => import("pages/gba/GbaGame.vue"),
      props: true,
    },
    {
      path: "tictactoe",
      component: () => import("pages/tictactoe/Index.vue"),
    },
    {
      path: "tictactoe/:id",
      component: () => import("pages/tictactoe/TictactoeGame.vue"),
      props: true,
    },
    {
      path: "signup",
      component: () => import("pages/auth/AuthSignUp.vue")
    },
    {
      path: "login",
      component: () => import("pages/auth/AuthLogIn.vue")
    },
    {
      path: "signup_confirm",
      component: () => import("pages/auth/AuthConfirmSignUp.vue")
    },
    {
      path: "login_forgot",
      component: () => import("pages/auth/AuthForgotPassword.vue")
    }
  ]
}];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("nuxt_token");
    const isAuthRoute = to.path === "/auth/login";
    if (!token && !isAuthRoute) {
      return navigateTo("/auth/login");
    }
  }
});

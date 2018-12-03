import router from './router'
// import store from './store'
router.beforeEach((to, from, next) => {
    next();
})
router.beforeResolve((to, from, next) => {
    next();
})
router.afterEach((to, from) => {
})


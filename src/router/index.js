import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ImagesList from "../views/ImagesList";
import Upload from "../views/Upload";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/upload',
        name: 'upload',
        component: Upload
    },
    {
        path: '/gallery/:category',
        name: 'gallery',
        component: ImagesList,
        props: true
    },
    // {
    //     path: '/image/:id',
    //     name: 'image',
    //     component: ImageShow,
    //     props: true
    // },
    {
        path: '/images',
        name: 'images',
        component: ImagesList
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

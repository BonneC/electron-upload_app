<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo.png" width="30" height="30" alt="">MUH PAGE</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Gallery</a>
                        <ul class="dropdown">
                            <router-link :to="{name: 'gallery', params:{category: 'cat1'}}">
                                <li>Graphs</li>
                            </router-link>
                            <router-link :to="{name: 'gallery', params:{category: 'cat2'}}">
                                <li>Drawings</li>
                            </router-link>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'upload'}">Upload</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped lang="scss">
    .navbar {
        /*box-shadow: 1px 5px 10px #dcdcdc;*/
        /*border-bottom: 1px solid #cbcbcb;*/
        /*overflow: hidden;*/
        box-shadow: 1px 1px 10px #e3e3e3;
        background: white;
        padding-top: 0;
        padding-bottom: 0;
        /*height: 60px;*/
        /*z-index:10;*/
        a {
            color: black;
            /*float: left;*/
            font-size: 16px;
            /*text-align: center;*/
            /*padding: 14px 16px;*/
            text-decoration: none;
        }
    }

    li {
        /*height: inherit;*/
        /*line-height: 60px;*/
        display: block;
        transition-duration: 0.5s;
        color: black;
        float: left;
        padding: 0.5rem;
        position: relative;
        text-decoration: none;
        /*background: white !important;*/
        /*height: 150px;*/
        /*align-self: center!important;*/
        &:hover {
            cursor: pointer;
            background: #f6f6f6;
            border-bottom: 5px black;
            /*border-bottom: 5px black;*/
        }
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        /*text-align: left;*/
    }

    ul li ul {
        visibility: hidden;
        z-index: 999;
        opacity: 0;
        min-width: 4rem;
        position: absolute;
        transition: all 0.5s ease;
        margin-top: 0.5rem;
        /*padding: 5px;*/
        left: 0;
        display: none;
    }

    ul li:hover > ul,
    ul li ul:hover {
        background: #f6f6f6;
        visibility: visible;
        opacity: 1;
        display: block;
    }

    ul li ul li {
        clear: both;
        width: 100%;
        padding: 1rem;

        &:hover {
            background: #6b7eaa;
            color:white;
        }
    }
</style>
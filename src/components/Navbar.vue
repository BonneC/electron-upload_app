<template>
    <div>
        <nav class="nav-bar navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo.png" width="30" height="30" alt="">MUH PAGE</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Gallery
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <router-link class="dropdown-item" :to="{name: 'gallery', params:{category: 'cat1'}}">Graphs
                                </router-link>
                                <router-link class="dropdown-item" :to="{name: 'gallery', params:{category: 'cat2'}}">
                                    Drawings
                                </router-link>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </li>
                    <li>
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

<style scoped>
    .navbar{
        box-shadow: 1px 5px 10px #dcdcdc;
        border: none;
    }
</style>
<template>
    <div>
        <div class="col-md-4">

                <div class="card" style="width: 50rem;">
                    <img class="card-img-top" :src="image_url" alt="image">
                    <div class="card-body">
                        <h5 class="card-title">{{image.title}} with id {{image.id}}</h5>
                        <p>Category: {{image.category}}</p>
                        <!--                        <p class="card-text">{{image.description}}</p>-->
                    </div>
                </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageCard",
        props: {
            image: Object
        },
        data() {
            return {
                image_url: ''
            }
        },
        created() {
            this.image_url = 'http://localhost:8000/image/' + this.image.id
        }
    }
</script>

<style scoped>

</style>
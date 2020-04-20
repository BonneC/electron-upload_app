<template>
    <div>
        <h1>List of The Images for {{category}}</h1>
        <ImageCard v-for="image in images" :key="image.id" :image="image"></ImageCard>
    </div>

</template>

<script>
    import ImagesService from "../services/ImagesService";
    import ImageCard from "../components/ImageCard";

    export default {
        name: "ImagesList",
        components: {
            ImageCard
        },
        props: {
            category: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                images: []
            }

        },
        methods: {
            getImages() {
                ImagesService.getImagesCat(this.category)
                    .then(response => {
                        console.log(response.data)
                        this.images = response.data
                    })
                    .catch(error => {
                        console.log('error:' + error.response)
                    })
                console.log(this.category)
            }
        },
        watch: {
            category: function (newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.getImages()
            }
        },
        created() {
            this.getImages()
        }
    }
</script>

<style scoped>
    .card {
        margin-left: 300px;
    }

</style>
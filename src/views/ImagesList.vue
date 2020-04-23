<template>
    <div>
        <h1>List of The Images for {{category}}</h1>
        <ImageCard v-for="image in images" :key="image.id" :image="image" @click.native="show(image)"></ImageCard>
        <!--<modal name="edit-location" @before-open="beforeOpen">-->
        <v-dialog/>
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
            },
            show (image) {
                console.log('show')
                console.log(image.id)
                this.$modal.show('dialog', {
                    title: image.title,
                    buttons: [
                        {
                            title: 'Edit',
                            handler: () => {
                                console.log('Editing button')
                            }
                        },
                        {
                            title: 'Delete',
                            handler: () => {
                                console.log('Deletion')
                            }
                        }
                    ]
                })
            },
            hide () {
                this.$modal.hide('dialog')
            },
            beforeOpen (event) {
                console.log(event.params)
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
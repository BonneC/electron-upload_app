<template>
    <div>
        <h1>List of The Images for {{category}}</h1>
        <ImageCard class="show-image"
                   v-for="image in images" :key="image.id" :image="image"
                   v-on:onClickEdit="showEdit"
                   v-on:onClickDelete="showDelete"
        >
        </ImageCard>
        <modal name="edit-modal" @before-open="beforeOpen">
            <ValidationObserver v-slot="{ handleSubmit, reset }" ref="form">
                <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
                    <div class="form-group col-md-6">
                        <label for="imageName">Image Name</label>
                        <ValidationProvider name="imageName" rules="min:4|required" v-slot="{errors}">
                            <input :disabled="disabled" type="text" v-model="title" class="form-control" id="imageName">
                            <ul>
                                <li v-for="error in errors" :key="error.ruleId">{{ error }}</li>
                            </ul>
                        </ValidationProvider>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputCat">Category</label>
                            <select :disabled="disabled" id="inputCat" class="form-control">
                                <option :selected="cat === 'cat1'">Graphs</option>
                                <option :selected="cat === 'cat2'">Drawings</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <button type="submit" v-if="!disabled" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    <button type="button" v-if="disabled" @click="enableEdit" class="btn btn-primary">Edit</button>

                    <button type="button" class="btn btn-secondary" @click="hide('edit-modal')">Cancel</button>
                </form>
            </ValidationObserver>
        </modal>
        <modal name="delete-modal">
            <h1>Delete image?</h1>
            <button type="button" class="btn btn-primary" @click="onDelete">Yes</button>
            <button type="button" class="btn btn-primary" @click="hide('delete-modal')">Cancel</button>

        </modal>
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
                images: [],
                title: '',
                cat: '',
                id: '',
                disabled: true
            }

        },
        computed: {},
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
            setInfo(img) {
                this.title = img.title
                this.cat = img.cat
                this.id = img.id
            },
            enableEdit() {
                this.disabled = false
            },
            showEdit(image) {
                console.log('show')
                console.log(image.id)
                this.$modal.show('edit-modal', {
                    title: image.title,
                    cat: image.category,
                    id: image.id
                })
            },
            showDelete(image) {
                console.log('Show Delete modal with id ' + image.id)
                this.id = image.id
                this.$modal.show('delete-modal')
            },
            onDelete() {
                console.log('We gon delete' + this.id)
                ImagesService.deleteImage(this.id).then(response => {
                    console.log(response.data)
                    this.getImages()
                    this.$store.dispatch('notifyEvent', {
                        title: 'SUKSES',
                        text: 'Deleted imazh suksesfuli'
                    })
                    this.hide('delete-modal')


                })
                    .catch(error => {
                        console.log('error:' + error.response)
                        this.$store.dispatch('notifyEvent', {
                            title: 'ERROR',
                            text: 'Couldnt delete imazh'
                        })
                    })
            },
            hide(modal) {
                this.$modal.hide(modal)
            },
            beforeOpen(event) {
                this.disabled = true
                this.setInfo(event.params)
                console.log(event.params);
            },
            onSubmit() {
                console.log(this.title)
                console.log(this.cat)
                console.log(this.id)

                let image_info = {
                    'id': this.id,
                    'title': this.title,
                    'category': this.cat
                }

                ImagesService.putImage(image_info).then(response => {
                    console.log(response.data)
                    this.getImages()
                    this.hide('edit-modal')
                    this.$store.dispatch('notifyEvent', {
                        title: 'SUKSES',
                        text: 'Edited imazh suksesfuli'
                    })
                })
                    .catch(error => {
                        console.log('error:' + error.response)
                        this.$store.dispatch('notifyEvent', {
                            title: 'ERROR',
                            text: 'Imazh not edited suksesfuli'
                        })
                    })
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
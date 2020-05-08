<template>
    <div :style="cssVars" id="imagesList">
        <h1>List of The Images for {{category}}</h1>
        <ImageCard class="show-image"
                   v-for="image in images" :key="image.id" :image="image"
                   v-on:onClickEdit="showEdit"
                   v-on:onClickDelete="showDelete"
        >
        </ImageCard>
        <modal name="edit-modal" @before-open="beforeOpen" :width="modalWidth" :focus-trap="true" :height="400">
            <ValidationObserver v-slot="{ handleSubmit, reset }" ref="form">
                <div class="box">
                    <div class="box-part" id="bp-left">
                        <div class="partition">
                            <div class="partition-title" style="padding: 15px">EDIT IMAGE</div>
                            <div class="partition-form">
                                <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">

                                    <label for="imageName" class="catStyle">Image Name</label>
                                    <ValidationProvider name="imageName" rules="min:4|required" v-slot="{errors}">
                                        <input :disabled="disabled" type="text" v-model="title"
                                               class="form-control mb-4" id="imageName">
                                        <ul>
                                            <li v-for="error in errors" :key="error.ruleId">{{ error }}</li>
                                        </ul>
                                    </ValidationProvider>
                                    <label for="inputCat" class="catStyle">Category</label>
                                    <select :disabled="disabled" id="inputCat"
                                            class="form-control" data-style="btn btn-primary">
                                        <option :selected="cat === 'cat1'">Graphs</option>
                                        <option :selected="cat === 'cat2'">Drawings</option>
                                    </select>
                                    <div class="button-set">
                                        <button type="button" :disabled="!disabled" @click="enableEdit"
                                                style="margin-right: 8px">Edit
                                        </button>
                                        <button type="button" class="github-btn" @click="hide('edit-modal')"
                                        >Cancel
                                        </button>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" v-if="!disabled"
                                                class="large-btn facebook-btn">Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!--                    :style="{background: 'url(' + selectedImage + ') no-repeat top left'}">-->
                    <div class="box-part" id="bp-right" style="background: black">
                        <div class="thumbnail">
                            <img :src="selectedImage"/>
                        </div>
                    </div>
                </div>
            </ValidationObserver>
        </modal>
        <modal name="delete-modal" @before-open="beforeOpen">

            <div class="box ">
                <div class="box-part">
                    <div class="partition" id="partition-register">
                        <div class="partition-title">DELETE IMAGE</div>
                        <div class="partition-form" style="margin-top: 20px">
                            <button type="button" class="btn btn-primary" @click="onDelete">Yes</button>
                            <button type="button" class="btn btn-primary" @click="hide('delete-modal')">Cancel</button>
                        </div>
                    </div>
                </div>
                <!--                :style="{background: 'url(' + selectedImage + ') no-repeat top left'}"-->
                <div class="box-part" style="background: black"
                >
                    <div class="thumbnail">
                        <img :src="selectedImage"/>
                    </div>
                    <!--                    <div class="box-messages">-->
                    <!--                    </div>-->
                </div>
            </div>


        </modal>
    </div>

</template>

<script>
    import ImagesService from "../services/ImagesService";
    import ImageCard from "../components/ImageCard";

    const MODAL_WIDTH = 656
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
                selectedImage: '',
                disabled: true,
                modalWidth: MODAL_WIDTH
            }

        },
        created() {
            this.getImages()
            this.modalWidth =
                window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
        },
        computed: {
            cssVars() {
                return {
                    '--selected-image': this.selectedImage
                }
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
            setInfo(img) {
                this.title = img.title
                this.cat = img.cat
                this.id = img.id
                this.selectedImage = 'http://localhost:8000/image/' + this.id

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
                this.$modal.show('delete-modal', {
                    title: image.title,
                    cat: image.category,
                    id: image.id
                })
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
                console.log(event.params)
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
        }
    }
</script>

<style scoped lang="scss">
    #imagesList{
        background: whitesmoke;
    }
    label {
        font-size: 15px;
    }

    .thumbnail {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .thumbnail img {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 100%;
        width: auto;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .thumbnail img.portrait {
        width: 100%;
        height: auto;
    }

</style>
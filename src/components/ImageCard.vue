<template>
    <div>
        <div class="col-md-4">
            <div class="show-image card" style="width: 50rem;">
                <img class="card-img-top" :src="image_url" alt="image">
                <div class="card-body">
                    <h5 class="card-title">{{image.title}} with id {{image.id}}</h5>
                    <p>Category: {{image.category}}</p>
                    <!--                        <p class="card-text">{{image.description}}</p>-->
                </div>
                <input class="the-buttons" type="button" value=" Edit "/>
                <input class="tmp" type="button" value=" Delete " @click="show"/>
            </div>

        </div>
        <modal name="delete-modal">
            <h1>Delete image?</h1>
            <button type="button" class="btn btn-primary" @click="deleteImage">Yes</button>
            <button type="button" class="btn btn-primary" @click="hide">Cancel</button>

        </modal>

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
        },
        methods: {
            emitClick() {
                this.$emit('imageButton',)
            },
            deleteImage(){
                console.log('We gon delete' + this.image.id)
                this.hide()
            },
            show() {
                this.$modal.show('delete-modal', )
            },
            hide() {
                this.$modal.hide('delete-modal')
            }
        }
    }
</script>

<style scoped>
    .show-image {
        position: relative;
        float: left;
        margin: 5px;
    }

    .show-image:hover input {
        display: block;
    }

    .show-image input {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
    }

    .tmp {
        margin-left: 100px;
    }
</style>
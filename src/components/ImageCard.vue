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
                <input class="the-buttons" type="button" value=" Edit " @click="emitClick('onClickEdit')"/>
                <input class="tmp" type="button" value=" Delete " @click="emitClick('onClickDelete')"/>
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
        },
        methods: {
            emitClick(event) {
                console.log('emitting ' + event)
                console.log('image id '+ this.image.id)
                this.$emit(event, this.image)
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
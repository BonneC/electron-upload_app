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
                <div class="buttons text-center">
                    <input type="button" value=" Edit " @click="emitClick('onClickEdit')"/>
                    <input type="button" value=" Delete " @click="emitClick('onClickDelete')"/>
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
        },
        methods: {
            emitClick(event) {
                console.log('emitting ' + event)
                console.log('image id ' + this.image.id)
                this.$emit(event, this.image)
            }
        }
    }
</script>

<style scoped>
    div.show-image {
        position: relative;
        float: left;
        margin: 5px;
    }

    div.show-image:hover .buttons {
        display: block;
    }

    div.show-image .buttons {
        position: absolute;
        margin-top: calc(50vh - 120px);
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        opacity: 0;
    }

    div.show-image:hover .buttons {
        transform: translateY(-3px);
        transition: .2s ease-in;
        opacity: 1;
    }

    .buttons input:hover {
        transform: translateY(-3px);
        transition: .2s ease-in;
    }

</style>
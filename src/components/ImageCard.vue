<template>
    <div id="imageCard">
        <div class="col-md-4">
            <div class="show-image card">
                <div class="thumbnail" style="background: black">
                    <img class="card-img-top" :src="image_url" alt="image">
                </div>
                <div class="card-body">
                    <div class="img-title">{{image.title}} with id {{image.id}}</div>
                    <div class="catStyle">Category: {{image.category}}</div>
                </div>
                <div class="buttons text-center ">
                    <input type="button" value=" Edit "
                           class="large-btn facebook-btn btn" @click="emitClick('onClickEdit')"/>
                    <input type="button" value=" Delete "
                           class="btn" @click="emitClick('onClickDelete')"/>
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

<style scoped lang="scss">
    #imageCard{
    }
    .card-body {
        padding: 0;
    }

    .img-title {
        font-family: "Roboto";
        letter-spacing: 1px;
        font-size: 20px;
        font-weight: 500;
    }

    .thumbnail {
        position: relative;
        width: 200px;
        height: 200px;
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
        margin-top: 50px;
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

    /*.buttons input:hover {*/
    /*    transform: translateY(-3px);*/
    /*    transition: .2s ease-in;*/
    /*}*/
    .btn {
        background: white;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        letter-spacing: 1px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        min-width: 140px;
        margin-top: 8px;
        margin-right: 10px;
        color: #8b8c8d;
        cursor: pointer;
        border: 1px solid #dddedf;
        text-transform: uppercase;
        transition: 0.1s all;
        font-size: 10px;

        &:hover {
            border-color: #6b7eaa;
            background: #6b7eaa;
            color: white;
            transform: translateY(-3px);
            transition: .2s ease-in;
        }
    }

</style>
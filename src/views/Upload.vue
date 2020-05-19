<template>
    <div class="container-fluid about" >
        <!--        <h1>This is where you gon upload</h1>-->
        <div class="row justify-content-center" style="padding-top: 30px">
            <div class="box col-md-6" id="upload" >
                <div class="box-part" id="bp-left">
                    <div class="partition" id="partition-register">
                        <div class="partition-title">UPLOAD IMAGE</div>
                        <div class="partition-form">
                            <ValidationObserver v-slot="{ handleSubmit, reset }" ref="form">
                                <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset"
                                      autocomplete="off">
                                    <div class="autocomplete-fix">
                                        <input disabled type="password">
                                    </div>


                                    <ValidationProvider name="imageName" rules="alpha_num|min:4|required"
                                                        v-slot="{errors}">
                                        <label for="imageName" class="catStyle">Image Title</label>
                                        <input type="text" v-model="image_info.name" class="form-control"
                                               id="imageName">
                                        <ul class=" list-group list-group-flush">
                                            <li v-for="error in errors" :key="error.ruleId"
                                                class="flist-item list-group-item">
                                                <i class="fa fa-exclamation-circle" style="padding-right: 10px"></i>
                                                {{ error }}</li>
                                        </ul>
                                    </ValidationProvider>
                                    <div style="margin-top: 20px">
                                    </div>
                                    <label for="inputCat" class="catStyle">Category</label>
                                    <select id="inputCat" v-model="cat" class="form-control" data-style="btn btn-primary">
                                        <option>Graphs</option>
                                        <option>Drawings</option>
                                    </select>
                                    <div style="margin-top: 20px">
                                    </div>
                                    <ValidationProvider rules="required|ext:jpg,png" ref="provider"
                                                        v-slot="{ validate, errors }">
                                        <label for="inputFile" class="custom-file-upload">
                                            <i class="fa fa-cloud-upload" style="font-size: 15px; padding-right: 10px"></i>
                                            Choose Image</label>
                                        <input type="file" @change="onImageChange"
                                               class="form-control-file large-btn github-btn"
                                               id="inputFile">
                                        <ul class=" list-group list-group-flush">
                                            <li v-for="error in errors" :key="error.ruleId"
                                                class="flist-item list-group-item">
                                                <i class="fa fa-exclamation-circle" style="padding-right: 10px"></i>
                                                {{ error }}</li>
                                        </ul>
<!--                                        <span>{{ errors[0] }}</span>-->
                                    </ValidationProvider>
                                    <div style="margin-top: 42px">
                                    </div>
                                    <button type="submit" class="large-btn facebook-btn">Submit</button>
                                </form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImagesService from "../services/ImagesService";
    import router from '../router'

    export default {
        name: "Upload",
        data() {
            return {
                image_info: {
                    name: '',
                    category: '',
                    upload_file: null
                },
                cat: 'Graphs'
            }
        },
        methods: {
            async onImageChange(e) {
                console.log('imagechangelog')
                const {valid} = await this.$refs.provider.validate(e)

                if (valid) {
                    this.image_info.upload_file = e.target.files[0]
                    console.log(e.target.files[0])
                }
            },
            onSubmit() {
                console.log(this.image_info.name)
                console.log(this.image_info.category)
                console.log(this.image_info.upload_file)

                this.setCategory()

                let formData = new FormData()
                // formData.append('name', this.image_info.name)
                // formData.append('category', this.image_info.category)
                formData.append('upload_file', this.image_info.upload_file)
                this.image_info.upload_file = formData
                // console.log(formData)

                ImagesService.postImage(this.image_info).then(response => {
                    console.log(response.data)
                    this.$store.dispatch('notifyEvent', {
                        title: 'SUKSES',
                        text: 'Uploaded imazh suksesfuli'
                    })
                    router.push({name: 'home'})
                })
                    .catch(error => {
                        this.$store.dispatch('notifyEvent', {
                            title: 'ERROR',
                            text: 'Failed imazh upload'
                        })
                        console.log('error:' + error.response)
                    })
            },
            setCategory() {
                if (this.cat === 'Graphs')
                    this.image_info.category = 'cat1'
                else
                    this.image_info.category = 'cat2'
            }
        }
    }
</script>

<style scoped lang="scss">
    $github_color: #dba226;
    .custom-file-upload {
        text-align: center;
        background: white;
        border-radius: 4px;
        box-sizing: border-box;
        /*border: 1px solid #ccc;*/
        padding: 10px;
        letter-spacing: 1px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        min-width: 140px;
        margin-top: 8px;
        display: inline-block;
        cursor: pointer;
        border: 1px solid $github_color;
        color: $github_color;
        text-transform: uppercase;
        transition: 0.1s all;
        font-size: 10px;
        width: 100%;
        /*padding: 6px 12px;*/

        &:hover {
            border-color: $github_color;
            background: $github_color;
            color: white;
            /*border-color: mix(#dddedf, black, 90%);*/
            /*color: mix(#8b8c8d, black, 80%);*/
        }
    }
    #upload{
        /*border: 1px solid #cbcbcb; */
        padding-bottom:100px;
        box-shadow: 1px 1px 10px #e3e3e3;
    }

</style>
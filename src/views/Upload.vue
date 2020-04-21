<template>
    <div class="about">
        <h1>This is where you gon upload</h1>
        <ValidationObserver v-slot="{ handleSubmit, reset }" ref="form">
            <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
                <div class="form-group col-md-6">
                    <label for="imageName">Image Name</label>
                    <ValidationProvider name="imageName" rules="alpha_num|min:4|required" v-slot="{errors}">
                        <input type="text" v-model="image_info.name" class="form-control" id="imageName">
                        <ul>
                            <li v-for="error in errors" :key="error.ruleId">{{ error }}</li>
                        </ul>
                    </ValidationProvider>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-2">
                        <label for="inputCat">Category</label>
                        <select id="inputCat" v-model="cat" class="form-control">
                            <option>Graphs</option>
                            <option>Drawings</option>
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputFile">File input</label>
                        <ValidationProvider rules="required|ext:jpg,png" ref="provider" v-slot="{ validate, errors }">
                            <input type="file" @change="onImageChange" class="form-control-file"
                                   id="inputFile">
                            <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </ValidationObserver>
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
                const { valid } = await this.$refs.provider.validate(e)

                if(valid){
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
                    router.push({name: 'home'})
                })
                    .catch(error => {
                        console.log('error:' + error.response)
                    })
            },
            setCategory(){
                if(this.cat === 'Graphs')
                    this.image_info.category = 'cat1'
                else
                    this.image_info.category = 'cat2'
            }
        }
    }
</script>

<style scoped>

</style>
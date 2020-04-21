<template>
    <div class="about">
        <h1>This is where you gon upload</h1>
        <form>
            <div class="form-group col-md-6">
                <label for="imageName">Image Name</label>
                <ValidationProvider name="imageName" rules="alpha_num|min:4|required" v-slot="{errors}">
                    <input type="text" v-model="name" class="form-control" id="imageName">
                    <ul>
                        <li v-for="error in errors" :key="error.ruleId">{{ error }}</li>
                    </ul>
                </ValidationProvider>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="inputCat">Category</label>
                    <select id="inputCat" v-model="category" class="form-control">
                        <option disabled value="">Please select one</option>
                        <option>Graphs</option>
                        <option>Drawings</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputFile">File input</label>
                    <ValidationProvider rules="required|ext:jpg,png" v-slot="{ errors }">
                        <input type="file" class="form-control-file" id="inputFile">
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
            </div>
            <button v-on:click="postImage" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        data() {
            return {
                name: '',
                category: '',
                image: Object
            }
        },
        methods: {
            postImage() {
                console.log(this.name)
                let e = document.getElementById("inputCat");
                console.log(e.options[e.selectedIndex].value)
                // console.log()
            }
        }
    }
</script>

<style scoped>

</style>
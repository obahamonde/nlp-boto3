<script setup lang="ts">

const model = ref<{text:string; lang:string}>({
    text: '',
    lang: 'en'  
})

const response = ref("")


const fetchResponse = async() => {
    const { data } = await useFetch(`/api/nlp/speech?&text=` + model.value.text + "&lang="+model.value.lang).blob()
    const url = URL.createObjectURL(unref(data) as Blob)
    response.value = url
}
const clipboard = useClipboard()

const copyToClipboard = async() => {
    await clipboard.copy(response.value)
}


</script>

<template>
    <div row>
    <div p-32 col center gap-4>
        <select v-model="model.lang" bg-success text-secondary text-center p-1 no-outline sh cp scale>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="nl">Dutch</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="zh">Chinese</option>
    </select>
        <textarea no-outline sh p-2 rows="12" cols="48" type="text" v-model="model.text" />
    <button @click="fetchResponse" btn-post>Submit</button>
</div>
<div p-32 col center gap-4>
    <h3>Response</h3>
    <audio controls
        :src="response" 
    />
    <h1 text-info text-sm row center><Ico icon="mdi-clipboard" @click="copyToClipboard" btn-icon dark:text-accent text-primary />Copy</h1> 
</div>
</div>
</template>
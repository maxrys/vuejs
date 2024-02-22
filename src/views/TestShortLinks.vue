<script setup>
    import axios from 'axios';
    import Messages from '../components/Messages.vue';
    import URL_validator from '../assets/URL_validator.js';
</script>

<template>
    <nav><RouterLink to="/">Home</RouterLink></nav>

    <!-- messages -->
    <Messages ref="messagesRef" />

    <!-- form -->
    <h2>Short Links Generator</h2>
    <form v-on:submit="generateLink">
        <!-- field "Link" -->
        <x-field required>
            <label>Link</label>
            <input type="url" v-model="link" v-on:input="formStateUpdate">
            <x-description v-if="link_description">
                {{ link_description }}
            </x-description>
        </x-field>
        <!-- submit -->
        <button type="submit" :disabled="is_error">
            Generate
        </button>
    </form>
    {{ onLoad }}
</template>

<script>
    export default {
        data() {
            return {
                service: import.meta.env.VITE_SHORT_LINK_SERVICE,
                urlGo  : import.meta.env.VITE_URL_GO,
                link   : '',
                link_description: '',
                link_maxlength: 2047,
                is_error: false
            }
        },
        computed: {
            onLoad() {
                this.formStateUpdate();
            }
        },
        methods: {
            formStateUpdate() {
                this.link_description = '';
                this.is_error = true;
                // check values
                if (this.link.length > 1) {
                    if (this.link.length < this.link_maxlength) {
                        if (!(new URL_validator(this.link)).hasError) {
                            this.is_error = false;
                        } else this.link_description = `Field "Link" contains an incorrect value!`;
                    }     else this.link_description = `Field "Link" contains a value that is too long! The maximum length is ${this.link_maxlength} bytes.`;
                }         else this.link_description = `Field "Link" must contain a value!`;
            },
            generateLink() {
                event.preventDefault();
                if (!this.is_error) {
                    axios({
                        url: this.service,
                        method: 'post',
                        header: {'Content-Type': 'application/json'},
                        data: JSON.stringify({link: this.link})
                    }).then(response => {
                        if      (response.data.status === 'ok'     ) this.$refs.messagesRef.addMessage(`Short Link: <a href="` + this.urlGo.replace('%%_hash', response.data.data) + `" target="_blank">` + this.urlGo.replace('%%_hash', response.data.data) + `</a>`);
                        else if (response.data.status === 'warning') this.$refs.messagesRef.addMessage(`Warning: ${response.data.data}`, 'warning');
                        else if (response.data.status === 'error'  ) this.$refs.messagesRef.addMessage(`Error: ${response.data.data}`  , 'error');
                        else if (response.data.status              ) this.$refs.messagesRef.addMessage(`Error: Unknown status!`        , 'error');
                        else                                         this.$refs.messagesRef.addMessage(`Error: Invalid JSON`           , 'error');
                    }).catch(error => {                              this.$refs.messagesRef.addMessage(`Error: ${error.message}`       , 'error'); });
                }
            }
        }
    }
</script>
<script setup>
    import Messages from '../components/Messages.vue';
    import Table from '../components/Table.vue';
</script>

<template>
    <nav><RouterLink to="/">Home</RouterLink></nav>

    <!-- messages -->
    <Messages ref="messagesRef" />

    <!-- form -->
    <h2>Simple form</h2>
    <form v-on:submit="submitForm" >
        <!-- text -->
        <x-field>
            <label>Text:</label>
            <input type="text" v-model="valueText">
        </x-field>
        <!-- textarea -->
        <x-field>
            <label>Textarea:</label>
            <textarea v-model="valueTextarea"></textarea>
        </x-field>
        <!-- checkbox -->
        <x-field>
            <label>Checkbox:</label>
            <input type="checkbox" v-model="valueCheckbox">
        </x-field>
        <!-- checkboxes -->
        <x-field>
            <label>Checkboxes:</label>
            <input type="checkbox" value="1" v-model="valueCheckboxes">
            <input type="checkbox" value="2" v-model="valueCheckboxes">
            <input type="checkbox" value="3" v-model="valueCheckboxes">
        </x-field>
        <!-- radio -->
        <x-field>
            <label>Radio:</label>
            <input type="radio" value="1" v-model="valueRadio">
            <input type="radio" value="2" v-model="valueRadio">
            <input type="radio" value="3" v-model="valueRadio">
        </x-field>
        <!-- select -->
        <x-field>
            <label>Select:</label>
            <select v-model="valueSelect">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </x-field>
        <!-- select multiple -->
        <x-field>
            <label>Select multiple:</label>
            <select v-model="valueSelectMultiple" multiple>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </x-field>
        <!-- submit -->
        <button type="submit">Send</button>
    </form>

    <!-- current state report -->
    <h2>Current values</h2>
    <Table :titles="titles" :data="currentValues" />

    <!-- final report -->
    <h2>New values</h2>
    <div v-if="collection.length">
        <Table :titles="titles" :data="collection" :has_actions="true" :deleteItem="deleteItem" />
    </div>
    <div v-else>
        No items.
    </div>

    <!-- dump -->
    <div>{{ dump }}</div>
</template>

<script>
    export default {
        data() {
            return {
                valueText          : 'text value',
                valueTextarea      : 'textarea value',
                valueCheckbox      : true,
                valueRadio         : 2,
                valueCheckboxes    : ['2'],
                valueSelect        : 3,
                valueSelectMultiple: ['2'],
                dump               : '',
                collection         : [],
                titles             : [
                    'value Text',          
                    'value Textarea',      
                    'value Checkbox',      
                    'value Checkboxes',    
                    'value Radio',         
                    'value Select',        
                    'value SelectMultiple'
                ]
            }
        },
        computed: {
            currentValues() {
                return [{
                    valueText          : this.valueText,
                    valueTextarea      : this.valueTextarea,
                    valueCheckbox      : this.valueCheckbox,
                    valueCheckboxes    : this.valueCheckboxes,
                    valueRadio         : this.valueRadio,
                    valueSelect        : this.valueSelect,
                    valueSelectMultiple: this.valueSelectMultiple
                }];
            }
        },
        methods: {
            submitForm() {
                event.preventDefault();
                this.$refs.messagesRef.deleteMessagesAll();
                if (this.valueText     === '' ||
                    this.valueTextarea === '') {
                    this.$refs.messagesRef.addMessage('Field is empty!', 'error');
                    return;
                }
                this.collection.push({
                    valueText          : this.valueText,
                    valueTextarea      : this.valueTextarea,
                    valueCheckbox      : this.valueCheckbox,
                    valueRadio         : this.valueRadio,
                    valueCheckboxes    : this.valueCheckboxes,
                    valueSelect        : this.valueSelect,
                    valueSelectMultiple: this.valueSelectMultiple
                })
                this.$refs.messagesRef.addMessage('New item was added.');
            },
            deleteItem(num) {
                this.collection = this.collection.filter((value, i) => i !== num);
                this.$refs.messagesRef.addMessage(`Item ${num} was deleted.`);
            }
        }
    }
</script>
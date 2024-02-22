<script setup>
    import Table from '../components/Table.vue';
</script>

<template>
    <nav><RouterLink to="/">Home</RouterLink></nav>

    <!-- form -->
    <h2>Simple form</h2>
    <form>
        <!-- text -->
        <x-field>
            <label>Text:</label>
            <input type="text"
                   :value="valueText"
                   v-on:input="changeValueText($event.target.value);">
        </x-field>
        <!-- textarea -->
        <x-field>
            <label>Textarea:</label>
            <textarea :value="valueTextarea"
                      v-on:input="(event) => {valueTextarea = event.target.value;}">
            </textarea>
        </x-field>
        <!-- checkbox -->
        <x-field>
            <label>Checkbox:</label>
            <input type="checkbox"
                   :checked="valueCheckbox"
                   v-on:change="(event) => {valueCheckbox = event.target.checked;}">
        </x-field>
        <!-- checkboxes -->
        <x-field>
            <label>Checkboxes:</label>
            <input type="checkbox" value="1" :checked="valueCheckboxes[1] == true" v-on:change="valueCheckboxes[1] = !valueCheckboxes[1]">
            <input type="checkbox" value="2" :checked="valueCheckboxes[2] == true" v-on:change="valueCheckboxes[2] = !valueCheckboxes[2]">
            <input type="checkbox" value="3" :checked="valueCheckboxes[3] == true" v-on:change="valueCheckboxes[3] = !valueCheckboxes[3]">
        </x-field>
        <!-- radio -->
        <x-field>
            <label>Radio:</label>
            <input type="radio" value="1" :checked="valueRadio == 1" v-on:change="valueRadio = $event.target.value">
            <input type="radio" value="2" :checked="valueRadio == 2" v-on:change="valueRadio = $event.target.value">
            <input type="radio" value="3" :checked="valueRadio == 3" v-on:change="valueRadio = $event.target.value">
        </x-field>
        <!-- select -->
        <x-field>
            <label>Select:</label>
            <select v-on:change="valueSelect = $event.target.value">
                <option value="1" :selected="valueSelect == 1">1</option>
                <option value="2" :selected="valueSelect == 2">2</option>
                <option value="3" :selected="valueSelect == 3">3</option>
            </select>
        </x-field>
        <!-- select multiple -->
        <x-field>
            <label>Select multiple:</label>
            <select v-on:change="changeValueSelectMultiple($event.target)" multiple>
                <option value="1" :selected="valueSelectMultiple[1] == true">1</option>
                <option value="2" :selected="valueSelectMultiple[2] == true">2</option>
                <option value="3" :selected="valueSelectMultiple[3] == true">3</option>
            </select>
        </x-field>
    </form>

    <!-- current state report -->
    <h2>Current values</h2>
    <Table :titles="titles" :data="currentValues" />

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
                valueCheckboxes    : {1: false, 2: true, 3: false},
                valueSelect        : 3,
                valueSelectMultiple: {1: false, 2: true, 3: false},
                dump               : '',
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
            changeValueText(value) {
                this.valueText = value;
            },
            changeValueSelectMultiple(target) {
                Array.prototype.forEach.call(target.options, (option) => {
                    this.valueSelectMultiple[option.value] = option.selected;
                })
            }
        }
    }
</script>
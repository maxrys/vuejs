<script setup>
</script>

<template>
    <table>
        <tr>
            <th v-for="(value, i) in titles" :key="i">
                {{ value }}
            </th>
            <th v-if="has_actions">
            </th>
        </tr>
        <tr v-for="(row, i) in data" :key="i">
            <td v-for="(value, j) in row" :key="j">
                {{ value }}
            </td>
            <td v-if="has_actions">
                [<a href="#" data-type="delete" v-on:click="deleteItem(i)">x</a>]
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        props: {
            titles: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true
            },
            has_actions: {
                type: Boolean
            },
            deleteItem: {
                type: Function
            }
        }
    }
</script>
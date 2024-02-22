<script setup>
    import { RouterLink } from 'vue-router';
    import router from '../router/index';
</script>

<template>
    <nav>
        <ul>
            <li> <RouterLink to="/test_forms">Test Forms</RouterLink> </li>
            <li> <RouterLink to="/test_forms_model">Test Forms (model)</RouterLink> </li>
            <li> <RouterLink to="/test_short_links">Test Short Links</RouterLink> </li>
        </ul>
    </nav>
    <!--
    <nav>
        <ul>
            <li v-for="(route, i) in router.getRoutes().filter(item => item.path !== '/')" :key="i">
                <span v-if="route.path !== '/'">
                    <RouterLink to="{{ route.path }}">{{ route.path }}</RouterLink>
                </span>
            </li>
        </ul>
    </nav>
    -->
</template>
<template>
    <footer class="footer bg-gray-200 text-right text-sm text-gray-700">
        <span v-if="version">API Version: {{ version }}</span>
    </footer>
</template>

<script>
    import LeagueService from '../services/LeagueService';

    export default {
        data() {
            return {
                version: ''
            };
        },
        async created() {
            try {
                this.version = await LeagueService.fetchApiVersion();
            } catch (error) {
                console.error('Failed to fetch API version:', error);
            }
        }
    };
</script>

<style scoped>
    .footer {
        background-color: #F6F7F7;
        color: #4B5C68;
        position: relative;
        bottom: 0;
        width: 100%;
        height: 40px;
        padding-right: 40px;
        padding-top: 10px;
        flex-shrink: 0;
    }
</style>
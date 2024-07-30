<template>
    <div class="leaderboard-page p-10 text-center">
        <h1 class="text-2xl text-blue-900 font-bold mb-6">League Standings</h1>
        <table class="w-11/12 mx-auto border-collapse">
            <thead>
                <tr class="bg-table-header">
                    <th class="pl-3 pr-3 text-left">Team Name</th>
                    <th class="pl-3 pr-3">MP</th>
                    <th class="pl-3 pr-3 gf-col">GF</th>
                    <th class="pl-3 pr-3 ga-col">GA</th>
                    <th class="pl-3 pr-3 gd-col">GD</th>
                    <th class="pl-3 pr-3">Points</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(team, index) in leaderboard" :key="index"
                    :class="{ 'bg-even-row': index % 2 === 0, 'bg-white': index % 2 !== 0 }">
                    <td class="p-3 text-left table-bold ">
                        <img :src="getFlagUrl(team.name)" :alt="team.name" class="inline-block mr-2 flag" />
                        {{ team.name }}
                    </td>
                    <td class="p-3 text-sm">{{ team.mp }}</td>
                    <td class="p-3 text-sm gf-col">{{ team.gf }}</td>
                    <td class="p-3 text-sm ga-col">{{ team.ga }}</td>
                    <td class="p-3 text-sm gd-col">{{ team.gd }}</td>
                    <td class="p-3 text-blue table-bold">{{ team.points }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import LeagueService from '../services/LeagueService';

export default {
    data() {
        return {
            leaderboard: []
        };
    },
    async created() {
        await LeagueService.fetchData();
        this.leaderboard = LeagueService.getLeaderboard();
    },
    methods: {
        getFlagUrl(countryName) {
            return `https://flagsapi.codeaid.io/${countryName.replace(/ /g, '%20')}.png`;
        }
    }
};
</script>

<style scoped>
.leaderboard-page {
    padding: 40px 0px 40px 0px;
}

h1 {
    margin-bottom: 20px;
    color: #182C62;
    font-size: 24px;
}

tr {
    height: 70px;
}

.bg-table-header {
    background-color: #E4EDF2;
    font-size: 12px;
    height: 40px;
}

.table-bold {
    font-size: 16px;
    font-weight: bold;
}

.bg-even-row {
    background-color: #F6F7F7;
}

.bg-white {
    background-color: white;
}

table {
    color: #4B5C68;
}

.flag {
    width: 53px;
    height: 37px;
}

.gd-col {
    display: none;
}

.text-blue {
    color: #025FEB;
}

@media (max-width: 500px) {

    .gf-col,
    .ga-col {
        display: none;
    }

    .gd-col {
        display: table-cell;
    }
}
</style>
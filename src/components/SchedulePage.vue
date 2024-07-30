<template>
    <div class="schedule-page p-10 text-center">
        <h1 class="text-2xl text-blue-900 font-bold mb-6">League Schedule</h1>
        <table class="w-11/12 mx-auto border-collapse">
            <thead>
                <tr class="bg-table-header">
                    <th class="pl-3 pr-3 text-right date-time-col">Date/Time</th>
                    <th class="pl-3 pr-3 text-left stadium-col">Stadium</th>
                    <th class="pl-3 pr-3 text-right w-[30%]">Home Team</th>
                    <th class="pl-3 pr-3">Result</th>
                    <th class="pl-3 pr-3 text-left w-[30%]">Away Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, index) in matches" :key="index"
                    :class="{ 'bg-even-row': index % 2 === 0, 'bg-white': index % 2 !== 0 }">
                    <td class="p-3 text-right text-sm date-time-col">
                        <p>{{ getYear(match.matchDate) }}</p>
                        <p>{{ getTime(match.matchDate) }}</p>
                    </td>
                    <td class="p-3 text-left text-sm stadium-col">{{ match.stadium }}</td>
                    <td class="p-3 table-bold text-right">
                        {{ match.homeTeam }}
                        <img :src="getFlagUrl(match.homeTeam)" :alt="match.homeTeam" class="inline-block flag ml-3" />
                    </td>
                    <td class="p-3 table-bold">{{ match.matchPlayed ? `${match.homeTeamScore} :
                        ${match.awayTeamScore}` : '- : -' }}</td>
                    <td class="p-3 table-bold text-left">
                        <img :src="getFlagUrl(match.awayTeam)" :alt="match.awayTeam" class="inline-block flag mr-3" />
                        {{ match.awayTeam }}
                    </td>
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
            matches: []
        };
    },
    async created() {
        await LeagueService.fetchData();
        this.matches = LeagueService.getMatches();
    },
    methods: {
        getYear(timestamp) {
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}.${month}.${year}`;
        },
        getTime(timestamp) {
            const date = new Date(timestamp);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;

        },
        getFlagUrl(countryName) {
            return `https://flagsapi.codeaid.io/${countryName.replace(/ /g, '%20')}.png`;
        }
    }
};
</script>

<style scoped>
.schedule-page {
    padding: 40px 0px 40px 0px;
}

tr {
    height: 70px;
}

h1 {
    margin-bottom: 20px;
    color: #182C62;
    font-size: 24px;
}

.bg-table-header {
    background-color: #E4EDF2;
    font-size: 12px;
    height: 40px;
}

.border-table {
    border: 1px solid #E4EDF2;
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

@media (max-width: 750px) {
    .stadium-col {
        display: none;
    }
}

@media (max-width: 500px) {
    .date-time-col {
        display: none;
    }
}
</style>

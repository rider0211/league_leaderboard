import axios from 'axios';

class LeagueService {
    constructor() {
        this.matches = [];
    }

    setMatches(matches) {
        this.matches = matches;
    }

    getMatches() {
        return this.matches;
    }

    getLeaderboard() {
        const leaderboard = {};
        this.matches.forEach(match => {
            if (match.matchPlayed) {
                const homeTeam = match.homeTeam;
                const awayTeam = match.awayTeam;

                if (!leaderboard[homeTeam]) {
                    leaderboard[homeTeam] = { name: homeTeam, mp: 0, gf: 0, ga: 0, points: 0, gd: 0 };
                }
                if (!leaderboard[awayTeam]) {
                    leaderboard[awayTeam] = { name: awayTeam, mp: 0, gf: 0, ga: 0, points: 0, gd: 0 };
                }

                leaderboard[homeTeam].mp++;
                leaderboard[awayTeam].mp++;
                leaderboard[homeTeam].gf += match.homeTeamScore;
                leaderboard[homeTeam].ga += match.awayTeamScore;
                leaderboard[awayTeam].gf += match.awayTeamScore;
                leaderboard[awayTeam].ga += match.homeTeamScore;

                if (match.homeTeamScore > match.awayTeamScore) {
                    leaderboard[homeTeam].points += 3;
                } else if (match.homeTeamScore < match.awayTeamScore) {
                    leaderboard[awayTeam].points += 3;
                } else {
                    leaderboard[homeTeam].points += 1;
                    leaderboard[awayTeam].points += 1;
                }

                leaderboard[homeTeam].gd = leaderboard[homeTeam].gf - leaderboard[homeTeam].ga;
                leaderboard[awayTeam].gd = leaderboard[awayTeam].gf - leaderboard[awayTeam].ga;
            }
        });

        return Object.values(leaderboard).sort((a, b) => {
            if (b.points === a.points) {
                if (b.gd === a.gd) {
                    if (b.gf === a.gf) {
                        return a.name.localeCompare(b.name);
                    }
                    return b.gf - a.gf;
                }
                return b.gd - a.gd;
            }
            return b.points - a.points;
        });
    }

    async fetchData() {
        try {
            const tokenResponse = await axios.get('http://localhost:3001/api/v1/getAccessToken');
            const token = tokenResponse.data.access_token;
            const matchesResponse = await axios.get('http://localhost:3001/api/v1/getAllMatches', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.setMatches(matchesResponse.data.matches);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    async fetchApiVersion() {
        try {
            const response = await axios.get('http://localhost:3001/api/version');
            if (response.data.success) {
                return response.data.version;
            }
            throw new Error('Failed to fetch API version');
        } catch (error) {
            console.error('Failed to fetch API version:', error);
            throw error;
        }
    }
}

export default new LeagueService();

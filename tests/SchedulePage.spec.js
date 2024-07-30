import { shallowMount } from '@vue/test-utils';
import SchedulePage from '@/components/SchedulePage.vue';
import LeagueService from '@/services/LeagueService';

jest.mock('@/services/LeagueService');

const mockMatches = [
    {
        matchDate: new Date('2022-05-05T11:50:00Z').getTime(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 0,
    },
    {
        matchDate: new Date('2022-05-05T11:50:00Z').getTime(),
        stadium: 'Stade de Suisse',
        homeTeam: 'Switzerland',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
    }
];

describe('SchedulePage.vue', () => {
    beforeEach(() => {
        LeagueService.getMatches.mockResolvedValue(mockMatches);
        LeagueService.fetchData.mockResolvedValue();
    });

    it('renders the match schedule correctly', async () => {
        const wrapper = shallowMount(SchedulePage);

        await LeagueService.fetchData();
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows).toHaveLength(mockMatches.length);

        rows.wrappers.forEach((rowWrapper, index) => {
            const cells = rowWrapper.findAll('td');
            expect(cells.at(0).text()).toContain('5.5.2022 11:50');
            expect(cells.at(1).text()).toBe(mockMatches[index].stadium);
            expect(cells.at(2).text()).toContain(mockMatches[index].homeTeam);
            expect(cells.at(3).text()).toContain(mockMatches[index].awayTeam);
            if (mockMatches[index].matchPlayed) {
                expect(cells.at(4).text()).toBe(`${mockMatches[index].homeTeamScore} : ${mockMatches[index].awayTeamScore}`);
            } else {
                expect(cells.at(4).text()).toBe('- : -');
            }
        });
    });
});

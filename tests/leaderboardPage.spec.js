import { shallowMount } from '@vue/test-utils';
import LeaderboardPage from '@/components/LeaderboardPage.vue';
import LeagueService from '@/services/LeagueService';

jest.mock('@/services/LeagueService');

const mockData = [
    { name: 'Brazil', mp: 3, gf: 5, ga: 2, gd: 3, points: 7 },
    { name: 'France', mp: 3, gf: 4, ga: 3, gd: 1, points: 5 },
];

describe('LeaderboardPage.vue', () => {
    beforeEach(() => {
        LeagueService.getLeaderboard.mockResolvedValue(mockData);
        LeagueService.fetchData.mockResolvedValue();
    });

    it('renders the correct columns based on screen width', async () => {
        const wrapper = shallowMount(LeaderboardPage);

        await LeagueService.fetchData();
        await wrapper.vm.$nextTick();

        // Test for widths greater than 500px
        global.innerWidth = 600;
        global.dispatchEvent(new Event('resize'));

        expect(wrapper.findAll('.gf-col').isVisible()).toBe(true);
        expect(wrapper.findAll('.ga-col').isVisible()).toBe(true);
        expect(wrapper.findAll('.gd-col').isVisible()).toBe(false);

        // Test for widths less than 500px
        global.innerWidth = 400;
        global.dispatchEvent(new Event('resize'));

        expect(wrapper.findAll('.gf-col').isVisible()).toBe(false);
        expect(wrapper.findAll('.ga-col').isVisible()).toBe(false);
        expect(wrapper.findAll('.gd-col').isVisible()).toBe(true);
    });

    it('fetches and displays leaderboard data correctly', async () => {
        const wrapper = shallowMount(LeaderboardPage);

        await LeagueService.fetchData();
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows).toHaveLength(mockData.length);

        rows.wrappers.forEach((rowWrapper, index) => {
            const cells = rowWrapper.findAll('td');
            expect(cells.at(0).text()).toContain(mockData[index].name);
            expect(cells.at(1).text()).toBe(mockData[index].mp.toString());
            expect(cells.at(2).text()).toBe(mockData[index].gf.toString());
            expect(cells.at(3).text()).toBe(mockData[index].ga.toString());
            expect(cells.at(4).text()).toBe(mockData[index].gd.toString());
            expect(cells.at(5).text()).toBe(mockData[index].points.toString());
        });
    });
});

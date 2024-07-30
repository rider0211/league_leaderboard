import { shallowMount } from '@vue/test-utils';
import NotFound from '@/components/NotFound.vue';

describe('NotFound.vue', () => {
    it('renders the 404 not found message', () => {
        const wrapper = shallowMount(NotFound);
        expect(wrapper.text()).toContain('404');
    });
});

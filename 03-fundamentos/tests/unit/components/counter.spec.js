import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });
    test('Should match  snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    });

    test('H2 should have default value "Counter"', () => {
        const h2 = wrapper.find('h2');
        expect(h2.exists()).toBeTruthy();
        expect(h2.text()).toBe('Counter');
    });

    test('Default value must be 100 in "p" tag', () => {
        const p = wrapper.find('[data-testid="counter"]');
        expect(p.exists()).toBeTruthy();
        expect(p.text()).toBe("100");
    });

    test('Should modify counter value when click buttons', async () => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');
        const counter = wrapper.find('[data-testid="counter"]');

        for(let i = 0; i<4; i++) {
            await increaseBtn.trigger('click');
        }

        for(let i = 0; i<5; i++) {
            await decreaseBtn.trigger('click');
        }

        expect(counter.text()).toBe('99');

    });

    test('Must define a default value', () => {
        const {contador} = wrapper.props();
        const value = wrapper.find('[data-testid="counter"]').text();

        expect(Number(value)).toBe(contador);
    });

    test('Should show the prop "title"', () => {
        const title = 'Hola mundo';
        const wrapper = shallowMount(Counter, {
            props:{
                title,
            },
        });
        expect(typeof title).toBe('string');
        expect(title).toBe(wrapper.find('h2').text());
    });
});
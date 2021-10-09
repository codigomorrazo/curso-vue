import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision.vue';

describe('Indecision.vue', () => {
   const fetchAnswer = 'Si!';
   const fetchImage = 'https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif';
   let wrapper;
   let getAnswerSpy;

   global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
         answer:fetchAnswer,
         forced:false,
         image:fetchImage,
      })
   }));

   beforeEach(() => {
      wrapper = shallowMount(Indecision);
      getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
      jest.clearAllMocks();
   });

   test('Should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
   });

   test('Should not launch fetch when writing on input, without "?"', async () => {
      const input = wrapper.find('input');
      await input.setValue('Hola mundo');

      expect(getAnswerSpy).not.toHaveBeenCalled();
   });

   test('Should launch fetch on keypress "?"', async() => {
      const input = wrapper.find('input');
      await input.setValue('Hola mundo?');

      expect(getAnswerSpy).toHaveBeenCalledTimes(1);
   });

   test('Should work on getAnswer with status 20X', async () => {
      await wrapper.vm.getAnswer();

      const img = wrapper.find('img');

      expect(img.exists()).toBeTruthy();
      expect(wrapper.vm.img).toBe(fetchImage);
      expect(wrapper.vm.answer).toBe(fetchAnswer);
   });

   test('Test should fail on API fail', async() => {
      fetch.mockImplementationOnce(() => Promise.reject('API is down'));

      await wrapper.vm.getAnswer();

      const img = wrapper.find('img');
      expect(img.exists()).toBeFalsy();
      expect(wrapper.vm.answer).toBe('No se pudo cargar del API');
   });
});
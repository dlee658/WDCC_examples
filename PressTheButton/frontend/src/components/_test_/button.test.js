import Button from '../Button';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AppContext } from '../../AppContextProvider';
import mockAxios from 'jest-mock-axios';
import { shallow } from 'enzyme'
let wrapper


// Some dummy data to test with
const stateFalse = {

    state: false
};

const stateTrue = {
    state: true
};

afterEach(() => {
    mockAxios.reset();
});

it('Renders correctly for initial state', () => {
    wrapper = shallow(<Button/>)
    expect(wrapper.find("p").text()).toContain("Button is Unpressed");
});

it('Renders correctly for pressed state', async () => {
    wrapper = shallow(<Button/>)
    mockAxios.get('/api/states');
    await act(async () => mockAxios.mockResponse({ stateTrue }));
    wrapper = shallow(<Button/>)
    expect(wrapper.find("p").text()).toContain("Button is");
});

it('Renders correctly for unpressed state', async () => {
    wrapper = shallow(<Button/>)
    mockAxios.get('/api/states');
    await act(async () => mockAxios.mockResponse({ stateFalse }));
    wrapper = shallow(<Button/>)
    expect(wrapper.find("p").text()).toContain("Button is Unpressed");
});

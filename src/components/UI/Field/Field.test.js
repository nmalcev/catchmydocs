import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Field from './Field';

configure({adapter: new Adapter()});

describe('Field component', () => {
    it('should render props', () => {
        const fieldProperties = {
            elementType: null,
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your E-mail',
                required: true,
                name: 'login',
            },
            elementLabel: 'E-mail:',
        };
        const wrapper = shallow(<Field {...fieldProperties}/>);
        const input = wrapper.find(fieldProperties.elementType === 'textarea' ? 'textarea' : 'input');
        expect(wrapper.find('label'))
            .toHaveLength(2);
        expect(input.prop('type'))
            .toMatch(fieldProperties.elementConfig.type);
        expect(input.prop('required'))
            .toBe(true);
    });
});
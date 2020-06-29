import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from './List';

configure({adapter: new Adapter()});

describe('List component', () => {
    it('should render props', () => {
        const Items = [
            {props: {}, textContent: 'item0'},
            {props: {value: 'optionValue1', selected: ''}, textContent: 'item1'},
            {props: {value: 'optionValue3', selected: true}, textContent: 'item1'},
            {props: {value: 'optionValue2'}},
          ];
      
        const wrapper = shallow(<List component="option" items={Items}/>);
        
        expect(wrapper.find('option'))
            .toHaveLength(Items.length);
        expect(wrapper.find('option[value="optionValue1"]').html())
            .toBe('<option value="optionValue1">item1</option>');
        expect(wrapper.find('option[value="optionValue3"]').html())
            .toBe('<option value="optionValue3" selected="">item1</option>');
        expect(wrapper.find('option[value="optionValue2"]').html())
            .toBe('<option value="optionValue2"></option>');
    });
});
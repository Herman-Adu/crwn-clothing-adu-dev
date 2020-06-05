import React from 'react';
import { shallow } from 'enzyme';

import { CheckoutPage } from './checkout.component.jsx';

let wrapper;

beforeEach(() => {
    const mockProps = {
        cartItems: [], 
        total: 100
    };
    wrapper = shallow(<CheckoutPage {...mockProps} />);
});

it('should render CheckoutPage component', () => {
    expect(wrapper).toMatchSnapshot();
});

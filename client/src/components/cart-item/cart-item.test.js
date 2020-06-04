import React from 'react';
import { shallow } from 'enzyme';
import CartItem from './cart-item.component.jsx';

it('should render CartItem component', () => {
    const mockItem = {
         imageUrl: 'www.testImageUrl.com',
         price: 10,
         name: 'jackets',
         quantity: 1
    };

    expect(shallow(<CartItem item={mockItem} />)).toMatchSnapshot();
});

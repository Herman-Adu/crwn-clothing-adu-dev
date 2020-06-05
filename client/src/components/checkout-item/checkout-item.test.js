import React from 'react';
import { shallow } from 'enzyme';

import { CheckoutItem } from './checkout-item.component';
//import { clearItemFromCart, removeItem } from '../../redux/cart/cart.actions';

describe('CheckoutItem component', () => {
    let wrapper;
    let mockClearItem;
    let mockAddItem;
    let mockRemoveItem;

    beforeEach(() => {
        mockClearItem = jest.fn();
        mockAddItem = jest.fn();
        mockRemoveItem = jest.fn();
    
        const mockProps = {
            cartItem: {
                name: 'hats',
                imageUrl: 'www.testImage.com',
                price: 30,                
                quantity: 3
            },
            clearItem: mockClearItem,
            addItem: mockAddItem,
            removeItem: mockRemoveItem
        };
    
        wrapper = shallow(<CheckoutItem {...mockProps} />);
      });

      it('should render CheckoutItem component', () => {
          expect(wrapper).toMatchSnapshot();
      });

      it('should call clearItem when remove button is clicked', () => {
        wrapper.find('RemoveButtonContainer').simulate('click');

        expect(mockClearItem).toHaveBeenCalled();
      });

      it('should call removeItem when left arrow is clicked', () => {
         wrapper.find('QuantityContainer').childAt(0).simulate('click');

         expect(mockRemoveItem).toHaveBeenCalled();
      });

      it('should call addItem when right arrow is clicked', () => {
        wrapper.find('QuantityContainer').childAt(2).simulate('click');

        expect(mockAddItem).toHaveBeenCalled();
      });

        
    
})
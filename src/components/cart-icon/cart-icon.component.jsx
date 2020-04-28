import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);
  
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// using a selector this way always fire mapStateToProps as state is a new object - bad for performance
// moved this functionality into cart.selectors and useing the new mapStateToProps below passing in the state

/* const mapStateToProps = ({ cart: { cartItems } }) => {
  console.log('I am being called')
  return {
    itemCount: cartItems.reduce((accumaletedQuantity, cartItem) => accumaletedQuantity + cartItem.quantity,  0)
  };  
}; */

// using cart.selectors
const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
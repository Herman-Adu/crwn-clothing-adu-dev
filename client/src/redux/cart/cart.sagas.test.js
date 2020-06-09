import { all, call, takeLatest, put, select } from "redux-saga/effects"

import UserActionTypes from '../user/user.types';

import { selectCurrentUser } from '../user/user.selectors';
import { getUserCartRef } from '../../firebase/firebase.utils';

import CartActionTypes from "./cart.types";
import { selectCartItems } from '../cart/cart.selectors';


import { clearCart } from './cart.actions';
import { 
    clearCartOnSignOut, 
    onSignOutSuccess,
    onUserSignIn,
    checkCartFromFirebase,
    updateCartInFirebase,   
    onCartChange
} from './cart.sagas';

describe('clear cart on signout saga', () => {
    it('should fire clearCart', () => { 

      const generator = clearCartOnSignOut();

      expect(generator.next().value).toEqual(put(clearCart()));
    });
});

describe('on signout success saga', () => {
    it('should trigger user action SIGN_OUT_SUCCESS', () => {

        const generator = onSignOutSuccess();

        expect(generator.next().value).toEqual(takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut));
    });
});

describe('on User Sign In success saga', () => {
    it('should trigger user action SIGN_IN_SUCCESS', () => {

        const generator = onUserSignIn();

        expect(generator.next().value).toEqual(takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase));
    });
});

describe('onCartChange saga', () => {
    it('should update cart in firebase when changes', () => {

        const generator = onCartChange();

        expect(generator.next().value).toEqual(takeLatest (
            [
                CartActionTypes.ADD_ITEM,
                CartActionTypes.REMOVE_ITEM,
                CartActionTypes.CLEAR_ITEM_FROM_CART
            ],
            updateCartInFirebase));
    });
});

// todo
describe('update cart in firebase saga', () => {        
    // getUserCartRef to be called
});


describe('check cart from firebase saga', () => {        
});


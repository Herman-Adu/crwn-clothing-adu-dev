import { all, call, takeLatest, put, select } from "redux-saga/effects"

import UserActionTypes from '../user/user.types';

import { selectCurrentUser } from '../user/user.selectors';

import CartActionTypes from "./cart.types";
import { selectCartItems } from '../cart/cart.selectors';

import { 
    firestore,
    getUserCartRef,
    cartRef,
    update,
    cartItems,
    convertCollectionsSnapshotToMap 
} from '../../firebase/firebase.utils';


import { clearCart, updateCartInFirebaseFailure } from './cart.actions';
import { 
    clearCartOnSignOut, 
    onSignOutSuccess,
    onUserSignIn,
    checkCartFromFirebase,
    updateCartInFirebase,
    setCartFromFirebase, 
    onCartChange,
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

describe('update cart in firebase saga', () => {

    const generator = updateCartInFirebase();

    it('should call select current user', () => {        
        
        expect(generator.next().value).toEqual(select(selectCurrentUser));
    });
    
    it('should call getUserCartRef if a user exist', () => {

        const mockUser = {
            id: 123
        }

        expect(generator.next(mockUser.id).value).toEqual(getUserCartRef(mockUser.id));
    });

    it('should call select cart items', () => {

        const mockCartItems = {
            imageUrl: 'www.testImageUrl.com',
            price: 10,
            name: 'jackets',
            quantity: 1
       };

        expect(generator.next(mockCartItems).value).toEqual(select(selectCartItems));
    });

    // todo
    it('should call cartRef.update cart items', () => {
    });

    
    it('should throw an error if update cart in firebase fails at any point', () => {
    });
});


// todo
describe('check cart from firebase saga', () => {

    const mockUser = {
        id: 321
    }

    const mockAction = {
        payload: {
          user: mockUser
        }
      };

    const generator = checkCartFromFirebase(mockAction);

    it('should call getUserCartRef if a user exist', () => {

        const mockUser = {
            id: 123
        }

        expect(generator.next(mockUser.id).value).toEqual(getUserCartRef(mockUser.id));
    });

    it('should get the cart snapshot if cart ref exist', () => {
    });

    it('should set the cart from firebase', () => {        
    });
});


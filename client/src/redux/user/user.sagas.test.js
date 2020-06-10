import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  checkUserSession
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

import {
    getSnapshotFromUserAuth,
    signInWithGoogle,
    signInWithEmail,
    isUserAuthenticated,
    signOut,
    signUp,
    signInAfterSignUp,
    onGoogleSignInStart,
    onEmailSignInStart,
    onCheckUserSession,
    onSignOutStart,
    onSignUpStart,
    onSignUpSuccess
 } from './user.sagas';

 describe('on sign up success saga', () => {
     it('should trigger SIGN_UP_SUCCESS', () => {
         
        const generator = onSignUpSuccess();

        expect(generator.next().value).toEqual(takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp));
     });
 });

 describe('on sign up start saga', () => {
    it('should trigger SIGN_UP_START', () => {
        
       const generator = onSignUpStart();

       expect(generator.next().value).toEqual(takeLatest(UserActionTypes.SIGN_UP_START, signUp));
    });
});

describe('on sign out start saga', () => {
    it('should trigger SIGN_OUT_START', () => {
        
       const generator = onSignOutStart();

       expect(generator.next().value).toEqual(takeLatest(UserActionTypes.SIGN_OUT_START, signOut));
    });
});

describe('on check user session saga', () => {
    it('should trigger on CHECK_USER_SESSION', () => {

      const generator = onCheckUserSession();

      expect(generator.next().value).toEqual(takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated));
    });
});

describe('on email sign in start saga', () => {
    it('should trigger on EMAIL_SIGN_IN_START', () => {

      const generator = onEmailSignInStart();

      expect(generator.next().value).toEqual(takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail));
    });
});

describe('on google sign in start saga', () => {
    it('should trigger on GOOGLE_SIGN_IN_START', () => {

      const generator = onGoogleSignInStart();

      expect(generator.next().value).toEqual(takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle));
    });
});

describe('on sign in after sign up saga', () => {
    it('should fire getSnapshotFromUserAuth', () => {

        const mockUser = {};
        const mockAdditionalData = {};

        const mockAction = {
            payload: {
                user: mockUser,
                additionalData: mockAdditionalData
            }
        };

        const generator = signInAfterSignUp(mockAction);

        expect(generator.next().value).toEqual(getSnapshotFromUserAuth(mockUser, mockAdditionalData));
    });
});

describe('on sign up saga', () => {

    const mockEmail = 'sarah@gmail.com';
    const mockPassword = 'test123';
    const mockDisplayName = 'sarah';

    const mockAction = {
        payload: {
            email: mockEmail,
            password: mockPassword,
            displayName: mockDisplayName
        }
    };

    const generator = signUp(mockAction);

    it('should call auth.createUserWithEmailAndPassword', () => {

        const createUserWithEmailAndPassword = jest.spyOn(auth, 'createUserWithEmailAndPassword');

        generator.next();
        
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
});

describe('on sign up saga', () => {

    const generator = signOut();

    it('should call auth.signOut', () => {

        const expectSignOut = jest.spyOn(auth, 'signOut');

        generator.next();

        expect(expectSignOut).toHaveBeenCalled();
    });

    it('should call sign out success', () => {
        expect(generator.next().value).toEqual(put(signOutSuccess()));
    });

    it('should call sign out failure when an error occurrs', () => {

        const newGenerator = signOut();

        newGenerator.next();

        expect(newGenerator.throw('an error has occurred').value).toEqual(put(signOutFailure('an error has occurred')));
    });
});

describe('is user authenticated', () => {

    const generator = isUserAuthenticated();

    it('should call get current user', () => {

        expect(generator.next().value).toEqual(getCurrentUser());
        
    });

    it('should call getSnapshotFromUserAuth if userAuth exists', () => {

        const mockUserAuth = {
            uid: '123abc'
        }

        expect(generator.next(mockUserAuth).value).toEqual(getSnapshotFromUserAuth(mockUserAuth));
    });

    it('should call signInFailure when an error occurrs', () => {

        const newGenerator = isUserAuthenticated();

        newGenerator.next();

        expect(newGenerator.throw('an error has occurred').value).toEqual( put(signInFailure('an error has occurred')));
    });
});

  
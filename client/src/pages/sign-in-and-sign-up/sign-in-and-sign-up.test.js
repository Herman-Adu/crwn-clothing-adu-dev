import React from 'react';
import { shallow } from 'enzyme';
import SignInAndSignUpPage from './sign-in-and-sign-up.component.jsx';

it('should render the SignInAndSignUpPage component', () => {
    expect(shallow(<SignInAndSignUpPage />)).toMatchSnapshot();
})
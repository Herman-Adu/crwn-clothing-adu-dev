import React from 'react';
import { shallow } from 'enzyme';

import { MenuItem } from './menu-item.component';

describe('MenuItem component', () => {
    let wrapper;
    let mockMatch;
    let mockHistory;
    const linkUrl = '/jackets';
    const size = 'large';
    const imageUrl = 'testimage';

    beforeEach(() => {
        mockMatch = {
        url: '/shop'
        };

        mockHistory = {
        push: jest.fn()
        };

        const mockProps = {
        match: mockMatch,
        history: mockHistory,
        linkUrl,
        size,
        title: 'jackets',
        imageUrl
        };

        wrapper = shallow(<MenuItem {...mockProps} />);
    });

    it('should render MenuItem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call history.push with the right string when MenuItemContainer clicked', () => {
        wrapper.find('MenuItemContainer').simulate('click');
        console.log(linkUrl);

        expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${linkUrl}`);
    });

    it('should pass size to MenuItemContainer as the prop size', () => {
        console.log(size);
        expect(wrapper.find('MenuItemContainer').prop('size')).toBe(size)
    })
});

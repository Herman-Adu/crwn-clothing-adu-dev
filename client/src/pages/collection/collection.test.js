import React from 'react';
import { shallow } from 'enzyme';

import { CollectionPage } from './collection.component';
import CollectionItem from '../../components/collection-item/collection-item.component';

describe('collectionPage', () => {
    
    let wrapper; 
    let mockItems = [{id: 1}, {id: 2}, {id: 3}];

    // setup collection
    beforeEach(() => {
        const mockCollection = {
            items: mockItems,
            title: 'Test Collection'
        };

        wrapper = shallow(<CollectionPage collection={mockCollection} />)
    });

    it('should render the CollectionPage component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the same number of CollectionItems as collection array', () => {
        expect(wrapper.find(CollectionItem).length).toBe(mockItems.length);
    });
});


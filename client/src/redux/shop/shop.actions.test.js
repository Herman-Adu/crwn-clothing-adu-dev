import ShopActionTypes from './shop.types';

import {
    fetchCollectionsStart,
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
    fetchCollectionsStartAsync
} from './shop.actions'

describe('fetchCollectionsStart action', () => {
    it('should create the fetchCollectionsStart action', () => {
        expect(fetchCollectionsStart().type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_START);
    });
});

describe('fetchCollectionsSuccess action', () => {
    
    const mockCollectionsMap = {
        hats: {
            id:1
        }
    };

    const action = fetchCollectionsSuccess(mockCollectionsMap);

    it('should create the fetchCollectionsSuccess action', () => {
        expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_SUCCESS);
        expect(action.payload).toEqual(mockCollectionsMap);
    });
});

describe('fetchCollectionsFailure action', () => {
    it('should create the fetchCollectionsSuccess action', () => {
        
        const action = fetchCollectionsFailure('an error has occurred')

        expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_FAILURE);        
        expect(action.payload).toEqual('an error has occurred');
    });
});


describe('fetchCollectionsStartAsync action', () => {
    it('should create the fetchCollectionsStartAsync action', () => {
        const mockActionCreator = fetchCollectionsStartAsync();
        const mockDispatch = jest.fn();
        mockActionCreator(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith(fetchCollectionsStart());
    });
});

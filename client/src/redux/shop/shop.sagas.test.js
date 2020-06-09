import { takeLatest, call, put, all } from 'redux-saga/effects';

import { 
    firestore, 
    convertCollectionsSnapshotToMap 
} from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

import {
    fetchCollectionsAsync,
    fetchCollectionsStart
} from './shop.sagas';

describe('fetch collections start saga', () => {
    it('should trigger on FETCH_COLLECTIONS_START shop action type', () => {

        const generator = fetchCollectionsStart();

        expect(generator.next().value).toEqual(takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync));
    });
});

describe('fetch collections async saga', () => {

    const generator = fetchCollectionsAsync();

    it('should call firebase collection', () => {

        const getCollection = jest.spyOn(firestore, 'collection');

        generator.next();

        expect(getCollection).toHaveBeenCalled();
    });

    it('should call convert collections snapshot to map', () => {

        const mockSnapshot = {};

        expect(generator.next(mockSnapshot).value).toEqual(call(convertCollectionsSnapshotToMap, mockSnapshot));
    });

    it('should fire fetchCollectionsSuccess if collectionsMap is succesful', () => {

        const mockcollectionsMap = {
            hats: {
                id: 1
            }
         };

        expect(generator.next(mockcollectionsMap).value).toEqual(put(fetchCollectionsSuccess(mockcollectionsMap)));
    });

    it('should fire fetchCollectionsFailure if get collection fails at any point', () => {

        const newGenerator = fetchCollectionsAsync();

        newGenerator.next();

        expect(newGenerator.throw({
            message: 'an error has occurred'
        }).value).toEqual(put(fetchCollectionsFailure('an error has occurred')))
    });
});





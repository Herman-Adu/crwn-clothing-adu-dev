import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDI1i7z62Ic8DvigQabZrc-fA8-uW9s7zk",
    authDomain: "crwn-db-40827.firebaseapp.com",
    databaseURL: "https://crwn-db-40827.firebaseio.com",
    projectId: "crwn-db-40827",
    storageBucket: "crwn-db-40827.appspot.com",
    messagingSenderId: "850738473234",
    appId: "1:850738473234:web:e8195fb5d1bda1dbb0abcb",
    measurementId: "G-4DKZXR7J09"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {    
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    //console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();       

        try
        {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error)
        {
            console.log('error creating user', error.message);
        }
    }
    return userRef; 
};

// util method to programmatically upload a collection and documents i.e. shop data to firebase.
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();        
        batch.set(newDocRef, obj);
        //console.log(newDocRef);
    });

    return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    //console.log(transformedCollection);

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }  , {});
}








firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;







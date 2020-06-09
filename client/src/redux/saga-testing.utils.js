// The runSaga function allows starting sagas outside the Redux middleware environment. 
// It also allows you to hook up to external input/output, other than store actions.

import { runSaga } from 'redux-saga';

export async function recordSaga(saga, initialAction) {

    const dispatched = [];

    await runSaga(
        {
            dispatch: action => dispatch.push(action)
        },
        saga,
        initialAction
    ).done;

    return dispatched;
}
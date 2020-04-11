import { myFirebase } from '../firebase/firebase'
import 'firebase/database'
import 'firebase/app'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE"
export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST"

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const receiveUserList = users => {
    return {
        type: RECEIVE_USER_LIST,
        users
    }
}

const receiveSignup = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const signupError = () => {
    return {
        type: SIGNUP_FAILURE
    }
}

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(loginError());
          });

}

export const signupUser = (username, email, password) => dispatch => {
    dispatch(requestSignup());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            myFirebase.database().ref("users/" + user.user.uid).set({
                username, email, uid: user.user.uid
            })
            dispatch(receiveSignup(user));
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(signupError());
          });
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {         
            dispatch(receiveLogout());
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError());
        });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user));
            myFirebase.messaging().getToken()
            .then( function( token ) {
                console.log(token)
                myFirebase.database().ref("users/" + user.uid + "/token").set(token)
                myFirebase.database().ref("users").on('value', function(snapshot) {
                    var users = []
                    snapshot.forEach( userSnap => {
                        if( user.uid !== userSnap.val().uid ) {
                            users.push( userSnap.val() )
                        }
                    })
                    dispatch(receiveUserList(users));
                })
                })
        }
        dispatch(verifySuccess());
    });
};
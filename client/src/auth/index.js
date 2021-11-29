import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    ERROR: "ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                });
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.ERROR: {
                let pl = payload === "Unauthorized" ? null : payload;
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: pl
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        } catch (err) {
            console.log(err);
            authReducer({
                type: AuthActionType.ERROR,
                payload: err.response.data.errorMessage
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.ERROR,
                payload: err.response.data.errorMessage
            });
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        user: response.data.user,
                        loggedIn: true
                    }
                });
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.ERROR,
                payload: err.response.data.errorMessage
            });
        }
    }

    auth.logoutUser = async function() {
        try {
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        user: null,
                        loggedIn: false
                    }
                });
                history.push("/");
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    user: null,
                    loggedIn: false
                }
            });
            history.push("/");
        }
    }

    auth.dismiss = function() {
        authReducer({
            type: AuthActionType.ERROR,
            payload: null
        });
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
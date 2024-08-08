import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor as createUserActor } from '../declarations/User';
import { createActor as createBookingActor } from '../declarations/Booking';
import { createActor as createHotelActor } from '../declarations/Hotel';
import { createActor as createSupportActor, supportChat } from '../declarations/Support';
import {createActor as createReviewActor} from '../declarations/Review'
import {ids} from '../../../AdminDevelopmentConfig'
import Login from '../pages/Login'
import { Principal } from '@dfinity/principal';

const AuthContext = createContext();

export const useAuthClient = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [actors, setActors] = useState(null);
        
    const clientInfo = async (client) => {
        const isAuthenticated = await client.isAuthenticated();
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        console.log(principal.toText())

        setAuthClient(client);
        // setIsAuthenticated(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
            let userActor = createUserActor(ids.userCan, { agentOptions: { identity: identity } });
            let hotelActor=createHotelActor(ids.hotelCan,{agentOptions:{identity:identity}})
            let bookingActor=createBookingActor(ids.bookingCan,{agentOptions:{identity:identity}})
            let supportActor=createSupportActor(ids.supportCan,{agentOptions:{identity:identity}})
            let reviewActor = createReviewActor(ids.reviewCan, {agentOptions : {identity: identity}})
            console.log(supportActor)
            setActors({
                userActor:userActor,
                hotelActor:hotelActor,
                bookingActor:bookingActor,
                supportActor:supportActor,
                reviewActor
            })
            let supportRes=await supportActor?.checkIsAdmin(identity.getPrincipal())
            if(supportRes==false){
                console.log(supportRes)
                alert(`You are not the admin, please add this principal as admin to access functionalities : \n${identity.getPrincipal().toString()}`)
                console.log(`You are not the admin, please add this principal as admin to access functionalities : \n${identity.getPrincipal().toString()}`)
                return false
            }else{
                console.log(supportRes)
                setIsAuthenticated(true)
            }
        }

        return true;
    }

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            clientInfo(authClient);
        })();
        console.log(principal?.toText())
    }, []);

    const login = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (authClient.isAuthenticated() && ((await authClient.getIdentity().getPrincipal().isAnonymous()) === false)) {
                    resolve(clientInfo(authClient));
                } else {
                    await authClient.login({
                        identityProvider: process.env.DFX_NETWORK === "ic"
                            ? "https://identity.ic0.app/"
                            : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
                        // identityProvider:"https://identity.ic0.app/",
                        onError: (error) => reject((error)),
                        onSuccess: () => resolve(clientInfo(authClient)),
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const logout = async () => {
        await authClient?.logout();
    }

    return {
        login, logout, authClient, isAuthenticated, identity, principal, ids, actors
    };
}

export const AuthProvider = ({ children,setLoggedIn }) => {
    const auth = useAuthClient();
    if (!auth.isAuthenticated || !auth.actors) {
        return (
            <AuthContext.Provider value={auth}>
                <Login setLoggedIn={setLoggedIn}/>
            </AuthContext.Provider>
        )
    }
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
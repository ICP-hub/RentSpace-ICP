import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor as createUserActor } from '../declarations/User';
import { createActor as createBookingActor } from '../declarations/booking';
import { createActor as createHotelActor } from '../declarations/hotel';
import { createActor as createSupportActor, supportChat } from '../declarations/supportChat';
import {ids} from '../../../AdminDevelopmentConfig'
import Login from '../pages/Login'

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
        console.log(principal)

        setAuthClient(client);
        // setIsAuthenticated(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
            let userActor = createUserActor(ids.userCan, { agentOptions: { identity: identity } });
            let hotelActor=createHotelActor(ids.hotelCan,{agentOptions:{identity:identity}})
            let bookingActor=createBookingActor(ids.bookingCan,{agentOptions:{identity:identity}})
            let supportActor=createSupportActor(ids.supportCan,{agentOptions:{identity:identity}})
            setActors({
                userActor:userActor,
                hotelActor:hotelActor,
                bookingActor:bookingActor,
                supportActor:supportActor
            })
            await supportActor.isAdmin().then((res)=>{
                if(res == true){
                    setIsAuthenticated(true);
                }
                else{
                    alert("You are not an admin -->" + principal);
                }
            })
        }

        return true;
    }

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            clientInfo(authClient);
        })();
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
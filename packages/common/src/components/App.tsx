import React, {useEffect, useState} from 'react';
import {Link, Switch, Route} from "react-router-native";
import {Protected, Auth} from "../util/RouteUtil";
import {Text} from 'react-native';
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from "./users/UserProfile";
import jwt_decode from "jwt-decode";
import {getJwtToken, logout} from '../util/SessionApiUtil';

interface UserInterface {
    username: string;
    exp: number;
}
const App = (props: {history: {push: Function}}) => {
    const {history} = props;
    const [user, setUser] = useState<UserInterface | null>(null);
    const loginUser = (user: any) => {
        setUser(user);
    };
    useEffect(() => {
        getJwtToken().then((user: any) => {
            if (user) {
                let decodedUser: UserInterface = jwt_decode(user);
                const currentTime = Date.now() / 1000;
                if (decodedUser.exp < currentTime) {
                    // Logout the user and redirect to the login page
                    console.log(history);
                    logout().then(() => {
                        history.push("/login");
                    })
                } else {
                    setUser(decodedUser)
                }
            }
        });
    }, []);
    return (
        <>
            {!user && <Link to="/login"><Text>Log in</Text></Link>}
            {!user && <Link to="/signup"><Text>Sign up</Text></Link>}
            {!!user && <Link to="/signout"><Text>Sign out</Text></Link>}
            <Auth path={'/login'} user={user} loginUser={loginUser} component={Login}/>
            <Auth path={'/signup'} user={user} loginUser={loginUser} component={Signup}/>
            <Switch>
                <Protected path={'/'} user={user} component={UserProfile}/>
                <Route path={"/"} component={Login}/>
            </Switch>
        </>
    )
};

export default App;

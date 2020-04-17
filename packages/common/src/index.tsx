import React from 'react';
import {SafeAreaView} from "react-native";
import { NativeRouter, Route } from "react-router-native";
import App from "./components/App";
export const Root = () => {

    return (
        <NativeRouter>
            <SafeAreaView>
                <Route path={"/"} component={App}/>
            </SafeAreaView>
        </NativeRouter>
    );
};
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {login, loginRequest} from '../util/SessionApiUtil';
const Login = (props: {loginUser: () => any}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View>
            <Text>username</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
            />
            <Text>password</Text>
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <View>
                <Button
                    title={"submit"}
                    onPress={() => {
                        loginRequest({username, password})
                            .then(async (res: {json: () => object}) => {
                                const newRes = await res.json();
                                login(newRes).then((props.loginUser));
                            })
                            .catch((error: unknown) => {
                                console.log('hitting', error);
                            });
                    }}
                />
            </View>
        </View>
    )
};
export default Login;
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {signupRequest} from '../util/SessionApiUtil';
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <View>
            <Text>Username</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
            />
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
            />
            <Text>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Text>Confirm Password</Text>
            <TextInput
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry={true}
            />
            <View>
                <Button
                    title={"submit"}
                    onPress={() => {
                        signupRequest({username, email, password, password2})
                            .then(async (res: {json: () => object}) => {
                                const newRes = await res.json();
                                console.log('res', newRes)
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
// const styles = StyleSheet.create({
//     label: {
//
//     }
// });
export default Signup;
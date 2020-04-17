import React, {useEffect, useState} from 'react';
import {Button, View, Text, ActivityIndicator} from "react-native";
import {addBottle, fetchUserFills} from "../../util/UserApiUtil";
import socketIOClient from 'socket.io-client';
const endpoint = "http://192.168.86.161:5000/";
const socket = socketIOClient(endpoint)
interface BottleInterface {
    _id: string;
    dateAdded: Date;
    user: string;
    uuid: string;
}
interface FillingInterface {
    _id: string;
    bottle: string;
    fillingStarted: Date;
    fillTime: number;
}

const UserProfile = (props: {user: {username: string, email: string, _id: string}}) => {
    // const [endpoint, setEndpoint] = useState("http://192.168.86.161:5000/");
    const [bottles, setBottles] = useState(Array());
    // const [socket, setSocket] = useState(socketIOClient(endpoint));
    const [adding, setAdding] = useState(false);
    const [confirmBottle, setConfirmBottle] = useState(false);
    const [confirmFill, setConfirmFill] = useState(false);
    const [fills, setFills] = useState<{[key: string]: FillingInterface[]}>({});
    const [bottle, setBottle] = useState<BottleInterface | undefined>(undefined);
    const {user} = props;

    const fetchFills = () => {
        fetchUserFills().then(async (res) => {
            if (res) {
                const jsonRes = await res.json();
                const bottleFills: {[key: string]: FillingInterface[]} = {};
                jsonRes.fills.forEach((fill: FillingInterface) => !!bottleFills[fill.bottle] ? bottleFills[fill.bottle].push(fill) : bottleFills[fill.bottle] = [fill]);
                setFills(bottleFills);
            }
        })
    };

    const startAdding = () => {
        setAdding(true);
        setTimeout(() => {
            setAdding(false);
            setConfirmBottle(false);
        }, 10000)
    };

    useEffect(() => {
        socket.open();
        socket.on("askForBottleConfirmation", (data: BottleInterface) => {
            setBottle(data);
        });
        socket.on("addedBottle", (data: {"_doc": BottleInterface}) => {
            setAdding(false);
            setBottles([...bottles, data._doc])
        });
        socket.on("addingFailed", (res: {message: string}) => {
            setAdding(false);
        });
        socket.on('pullBottles', (newBottles: never[]) => {
            setBottles(newBottles)
        });
        socket.emit('startPullingBottles', user._id);
        fetchFills();
        const findFills = setInterval(fetchFills, 10000);
        return () => {
            clearInterval(findFills);
            socket.close();
        };
    }, []);

    useEffect(() => {
        if (bottle){
            setConfirmBottle(true)
        } else {
            setConfirmBottle(false)
        }
    }, [bottle]);

    useEffect(() => {
        console.log(fills);
    }, [fills]);

    return (
        !adding ? (
            <View>
                <Text>Your Bottles:</Text>
                {bottles.map((b: BottleInterface) => {
                    return (
                        <View key={b._id}>
                            <Text>{b.uuid}</Text>
                            <Text>{b.dateAdded}</Text>
                            <>
                                <Text>Fills:</Text>
                                {!!fills[b._id] && fills[b._id].map(f => {
                                    return (
                                            <View key={f._id}>
                                                <Text>{f.fillingStarted}</Text>
                                                <Text>{f.fillTime}</Text>
                                            </View>

                                        )
                                })}
                            </>
                        </View>
                    )
                })}
                <Button title={"Add Bottle"} onPress={() => {
                    socket.emit("addBottle", user._id);
                    startAdding()
                }}/>
            </View>
        ) : (confirmBottle && !!bottle) ? (
            <View>
                <Text>Is this your bottle?</Text>
                <Text>{bottle.uuid}</Text>
                <Button title={"confirmBottle"} onPress={() => socket.emit("confirmAddBottle")}/>
            </View>
        ) : (
            <View>
                <Text>Searching for smart bottle</Text>
                <ActivityIndicator size="large" color="blue"/>
            </View>
        )

    );
};

export default UserProfile;
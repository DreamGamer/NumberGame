import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView } from "react-native";

// Import all needed modules
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

import Colors from "../constants/Colors";

const GameFinishedScreen = props => {
    // States

    const [currentAvailableDeviceWidth, setCurrentDeviceWidth] = useState(Dimensions.get("window").width);
    const [currentAvailableDeviceHeight, setCurrentDeviceHeight] = useState(Dimensions.get("window").height);



    // Scripts

    useEffect(() => {
        const updateLayout = () => {
            setCurrentDeviceWidth(Dimensions.get("window").width);
            setCurrentDeviceHeight(Dimensions.get("window").height);
        };

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    });


    // Render

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game Finished!</TitleText>
                <View style={{...styles.imageContainer, ...{width: currentAvailableDeviceWidth * 0.6, height: currentAvailableDeviceWidth * 0.6}}}>
                    <Image source={{ uri: "https://as1.ftcdn.net/jpg/02/33/50/88/500_F_233508894_b8qvV2BLSIlHQkqURx73Kz8TeQQWjvLA.jpg" }} style={styles.image} resizeMode="contain" />
                </View>
                <View style={styles.textContainer}>
                    <BodyText style={styles.resultText}>The roboter needed <Text style={styles.highlightText}>{props.numberOfRounds}</Text> rounds to guess the number <Text style={styles.highlightText}>{props.choosenNumber}</Text></BodyText>
                </View>
                <Button title="Restart Game" onPress={props.restartGame} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    imageContainer: {
        borderRadius: 125,
        borderWidth: 3,
        borderColor: Colors.danger,
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 40,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
    },
    highlightText: {
        color: Colors.success,
        fontFamily: "ms-new-tai-lue-bold",

    },
    textContainer: {
        marginHorizontal: 60,
        marginVertical: Dimensions.get("window").height / 80,
    },
});


export default GameFinishedScreen;
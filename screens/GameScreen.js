import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert, FlatList, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Import all needed modules
import NumberContainer from "../components/NumberContainer";
import Box from "../components/Box";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomNumber = (min, max, execlude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === execlude) {
        return generateRandomNumber(min, max, execlude);
    } else {
        return randomNumber;
    }

};

const renderListItem = (guessedListLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{guessedListLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);



const GameScreen = props => {
    const initialGuess = generateRandomNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    // Dimensions States
    const [currentAvailableDeviceWidth, setCurrentAvailableDeviceWidth] = useState(Dimensions.get("window").width);
    const [currentAvailableDeviceHeight, setCurrentAvailableDeviceHeight] = useState(Dimensions.get("window").height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameFinished } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameFinished(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameFinished]);


    useEffect(() => {
        const updateLayout = () => {
            setCurrentAvailableDeviceWidth(Dimensions.get("window").width);
            setCurrentAvailableDeviceHeight(Dimensions.get("window").height);
        };
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });



    const nextGuessHandler = userValue => {
        if ((userValue === "lower" && currentGuess < props.userChoice) || (userValue === "greater" && currentGuess > props.userChoice)) {
            Alert.alert("Don\'t lie", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
            return;
        }

        if (userValue === "lower") {
            currentHigh.current = currentGuess;
        } else if (userValue === "greater") {
            currentLow.current = currentGuess + 1;
        } else {
            console.warn("GameScreen Error, userValue is not the key 'lower' or 'greater'!");
        }

        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
    };


    let listContainerStyle = styles.listContainer;

    if (currentAvailableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (currentAvailableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <TitleText>Opponent's Guess:</TitleText>
                <View style={styles.controlField}>
                    <MainButton title={<MaterialIcons name="remove" size={18} color="#fff"></MaterialIcons>} onPress={nextGuessHandler.bind(this, "lower")} />
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton title={<MaterialIcons name="add" size={18} color="#fff"></MaterialIcons>} onPress={nextGuessHandler.bind(this, "greater")} />
                </View>
                <View style={listContainerStyle}>
                    <FlatList data={pastGuesses} keyExtractor={item => item} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess:</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Box style={{...styles.buttonContainer, ...{marginTop: currentAvailableDeviceHeight > 600 ? 20 : 5}}}>
                <MainButton title={<MaterialIcons name="remove" size={18} color="#fff"></MaterialIcons>} onPress={nextGuessHandler.bind(this, "lower")} />
                <MainButton title={<MaterialIcons name="add" size={18} color="#fff"></MaterialIcons>} onPress={nextGuessHandler.bind(this, "greater")} />
            </Box>
            <View style={listContainerStyle}>
                {/*
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
                */}
                <FlatList data={pastGuesses} keyExtractor={item => item} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 300,
    },
    listContainer: {
        flex: 1,
        width: "60%",
    },
    list: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    listItem: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    controlField: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-around",
        alignItems: "center",

    }
});


export default GameScreen;
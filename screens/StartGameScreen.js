import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";

// Import all needed Modules
import Box from "../components/Box";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import Colors from "../constants/Colors";

const StartGameScreen = props => {

    // States
    const [enteredNumberValue, setEnteredNumberValue] = useState("");
    const [numberConfirmed, setNumberConfirmed] = useState(false);

    const [selectedNumber, setSelectedNumber] = useState();

    // States for stylinng
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);



    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };

        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });


    const numberInputHandler = value => {
        setEnteredNumberValue(value.replace(/[^0-9]/g, ""));
    };

    const resetInputHandler = () => {
        setEnteredNumberValue("");
        setSelectedNumber();
        setNumberConfirmed(false);
    }

    const confirmInputHandler = () => {
        const number = parseInt(enteredNumberValue);
        if (isNaN(number) || number < 0 || number > 99) {
            Alert.alert("Invalid number!", "Selected Number is undefined or not between 0 - 99", [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]);
            return;
        }
        setNumberConfirmed(true);
        setSelectedNumber(parseInt(enteredNumberValue));
        setEnteredNumberValue("");
        Keyboard.dismiss();

    }

    let confirmedOutput;

    if (numberConfirmed) {
        confirmedOutput = (
            <Box style={styles.numberContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
            </Box>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Box style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit autoCapitaliye="none" autoCorrect={false} keyboardType="numeric" maxLength={2} onChangeText={numberInputHandler} value={enteredNumberValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.danger} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Box>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    input: {
        width: 50,
        textAlign: "center",
    },
    numberContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
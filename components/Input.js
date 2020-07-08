import React from "react";
import { StyleSheet, TextInput } from "react-native";

import Colors from "../constants/Colors";


const input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }}></TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default input;
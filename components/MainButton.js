import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const MainButton = props => {

    let text = <Text style={styles.text}>{props.title}</Text>;
    let content = <View style={{ ...styles.buttonContainer, ...props.style }}>{text}</View>;

    if (props.color) {
        text = <Text style={{ ...styles.text, ...props.style, color: props.color }}>{props.title}</Text>;
    }

    if (props.backgroundColor) {
        content = <View style={{ ...styles.buttonContainer, ...props.style, backgroundColor: props.backgroundColor }}>{text}</View>
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: Colors.primary,
    },
    text: {
        fontFamily: "ms-new-tai-lue-regular",
        fontSize: 18,
        color: "#fff",
    },
});


export default MainButton;
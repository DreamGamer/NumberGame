import React from "react";
import { StyleSheet, Text } from "react-native";

const TitleText = props => {
    return (
    <Text style={{...styles.TitleText, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    TitleText: {
        fontSize: 18,
        fontFamily: "ms-new-tai-lue-bold",
    }
});


export default TitleText;
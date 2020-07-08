import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = props => {
    return (
        <Text style={{...styles.mainTextStyle, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    mainTextStyle: {
        fontFamily: "ms-new-tai-lue-regular",

    }
});


export default BodyText;
import React from "react";
import { StyleSheet, View } from "react-native";

const Box = props => {
    return (
        <View style={{...styles.container, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 6,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 6,
    }
});

export default Box
import React from "react";
import { StyleSheet, View, Text } from "react-native";

// Import all needed modules
import Colors from "../constants/Colors";
import TitleText from "../components/TitleText";

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerText}>{props.title}</TitleText>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 24,
        backgroundColor: Colors.red,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "#000",
    }
});

export default Header;
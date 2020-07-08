import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from './screens/GameScreen';
import GameFinishedScreen from "./screens/GameFinishedScreen";


const fetchFonts = () => {
  return Font.loadAsync({
    "ms-new-tai-lue-regular": require("./assets/fonts/microsoft-new-tai-lue-regular.ttf"),
    "ms-new-tai-lue-bold": require("./assets/fonts/microsoft-new-tai-lue-bold.ttf"),
  });
};


export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setDataLoaded(true); }} onError={(err) => { console.log(err); }} />;
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameFinishedHandler = rounds => {
    setGuessRounds(rounds);
  }

  const restartGameHandler = () => {
    // Reset Game data to restart the gane
    setUserNumber(null);
    setGuessRounds(0);
  }


  let mainScreen = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    mainScreen = <GameScreen userChoice={userNumber} onGameFinished={gameFinishedHandler} />
  } else if (guessRounds > 0) {
    mainScreen = <GameFinishedScreen numberOfRounds={guessRounds} choosenNumber={userNumber} restartGame={restartGameHandler} />
  }


  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Number Game" />
      {mainScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

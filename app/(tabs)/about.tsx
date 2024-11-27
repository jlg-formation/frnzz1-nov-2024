import AsyncButton from "@/components/AsyncButton";
import { api } from "@/utils/api";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onPress = async () => {
    try {
      console.log("coucou");
      setErrorMsg("");
      if (message !== "") {
        setMessage("");
        return;
      }
      const msg = await api.getMessage();
      setMessage(msg);
    } catch (err) {
      console.log("err: ", err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
        return;
      }

      setErrorMsg("oups!");
    }
  };
  return (
    <View style={styles.container}>
      <AsyncButton onPress={onPress} label="Clique moi" />
      <Text style={[styles.message, { color: "red" }]}>{errorMsg}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "#fff",
  },
  button: {
    borderRadius: 9,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    flexDirection: "row",
    gap: 10,
  },
  buttonIcon: {
    color: "white",
  },
  buttonLabel: {
    color: "white",
  },
  message: {
    height: 20,
    color: "white",
  },
});

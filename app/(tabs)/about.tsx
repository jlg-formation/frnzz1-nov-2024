import { api } from "@/utils/api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function AboutScreen() {
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  const onPress = async () => {
    try {
      console.log("coucou");
      setIsWorking(true);
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
    } finally {
      setIsWorking(false);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, isWorking ? { borderColor: "gray" } : {}]}
        onPress={onPress}
        disabled={isWorking}
      >
        <FontAwesome
          name="heart"
          size={18}
          style={[styles.buttonIcon, isWorking ? { color: "gray" } : {}]}
        />
        <Text style={[styles.buttonLabel, isWorking ? { color: "gray" } : {}]}>
          Clique moi
        </Text>
      </Pressable>
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

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  onPress: () => Promise<void>;
  label: string;
};

export default function AsyncButton({ onPress, label }: Props) {
  const [isWorking, setIsWorking] = useState(false);

  const handleOnPress = async () => {
    try {
      setIsWorking(true);
      await onPress();
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <Pressable
      style={[styles.button, isWorking ? { borderColor: "gray" } : {}]}
      onPress={handleOnPress}
      disabled={isWorking}
    >
      <FontAwesome
        name="heart"
        size={18}
        style={[styles.buttonIcon, isWorking ? { color: "gray" } : {}]}
      />
      <Text style={[styles.buttonLabel, isWorking ? { color: "gray" } : {}]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

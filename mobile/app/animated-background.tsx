import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing } from "react-native";

const { height } = Dimensions.get("window");

export default function AnimatedBackground() {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: height,
        duration: 35000, // 30 segundos
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <>
      <Animated.Image
        source={require("@/assets/images/background.png")}
        style={{
          position: "absolute",
          width: "100%",
          height,
          transform: [{ translateY }],
        }}
        resizeMode="cover"
      />

      <Animated.Image
        source={require("@/assets/images/background.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: height,
          top: -height,
          transform: [{ translateY }],
        }}
        resizeMode="cover"
      />
    </>
  );
}

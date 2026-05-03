import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import globalStyles from "@/constants/globalStyles";

interface FloatingCardSlotProps {
  active: boolean;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  delay: number;
  children?: React.ReactNode;
}

export default function FloatingCardSlot({
  active,
  bgColor,
  borderColor,
  glowColor,
  delay,
  children,
}: FloatingCardSlotProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -3,
            duration: 800,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
      return () => animation.stop();
    } else {
      floatAnim.setValue(0);
    }
  }, [active]);

  return (
    <Animated.View
      style={[
        globalStyles.cardSlotOuter,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
          transform: [{ translateY: floatAnim }],
        },
        active && {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 8,
          elevation: 8,
        },
      ]}
    >
      <View style={styles.cardSlotInner}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardSlotInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
    overflow: "hidden",
  },
});

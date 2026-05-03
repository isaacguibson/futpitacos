import React from "react";
import { StyleSheet, View } from "react-native";

const BADGE_SIZE = 48;
const INNER_SIZE = Math.ceil(BADGE_SIZE * 1.5);

export default function TeamBadge({ colors }: { colors: string[] | undefined }) {
  const offset = (BADGE_SIZE - INNER_SIZE) / 2;

  return (
    <View style={styles.teamBadgeShadow}>
      <View style={[styles.teamBadge, { borderColor: colors ? colors[0] : "#000" }]}>
        <View
          style={{
            position: "absolute",
            width: INNER_SIZE,
            height: INNER_SIZE,
            top: offset,
            left: offset,
            transform: [{ rotate: "45deg" }],
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {colors?.map((color, index) => (
            <View key={index} style={{ flex: 1, backgroundColor: color }} />
          ))}
        </View>
        <View style={styles.teamBadgeHighlight} pointerEvents="none" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  teamBadgeShadow: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
  teamBadge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  teamBadgeHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: BADGE_SIZE / 2,
    borderTopRightRadius: BADGE_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
});

import React from "react";
import { View } from "react-native";
import AppText from "@/components/text";
import ColorScheme from "@/components/ui/color-scheme";
import globalStyles from "@/constants/globalStyles";
import Match from "@/models/Match";
import StatusPartidaEnum from "@/models/StatusPartidaEnum";

export default function MatchStatusBadge({ status }: { status: number }) {
  const config = StatusPartidaEnum.getById(status);

  return (
    <View style={[globalStyles.matchStatusBadge, { backgroundColor: config.bg, borderWidth: 2, borderColor: config.text }]}>
      <View style={globalStyles.badgeShinyHighlight} pointerEvents="none" />
      <AppText style={[globalStyles.matchStatusText, { color: config.text }]}>
        {config.nome}
      </AppText>
    </View>
  );
}

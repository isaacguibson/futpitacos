import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

interface RankedUser {
  id: string;
  username: string;
  points: number;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const WEEKLY_RANKING: RankedUser[] = [
  { id: "1", username: "craque_do_pita", points: 2150 },
  { id: "2", username: "bola_de_ouro", points: 1980 },
  { id: "3", username: "gol_certo", points: 1870 },
  { id: "4", username: "pitaco_mestre", points: 1250 },
  { id: "5", username: "futebol_rei", points: 1100 },
  { id: "6", username: "camiseta10", points: 980 },
  { id: "7", username: "drible_fatal", points: 870 },
  { id: "8", username: "caneta_show", points: 750 },
  { id: "9", username: "zagueiro_bravo", points: 620 },
  { id: "10", username: "goleiro_muralha", points: 510 },
];

const ANNUAL_RANKING: RankedUser[] = [
  { id: "1", username: "bola_de_ouro", points: 58200 },
  { id: "2", username: "craque_do_pita", points: 51400 },
  { id: "3", username: "futebol_rei", points: 47300 },
  { id: "4", username: "camiseta10", points: 42100 },
  { id: "5", username: "pitaco_mestre", points: 34800 },
  { id: "6", username: "gol_certo", points: 31200 },
  { id: "7", username: "drible_fatal", points: 28700 },
  { id: "8", username: "caneta_show", points: 24500 },
  { id: "9", username: "zagueiro_bravo", points: 19800 },
  { id: "10", username: "goleiro_muralha", points: 15300 },
];

const WEEKLY_REWARDS: Record<number, number> = { 1: 50, 2: 30, 3: 10 };
const ANNUAL_REWARDS: Record<number, number> = { 1: 500, 2: 300, 3: 100 };

type Tab = "weekly" | "annual";

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function RankingScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("weekly");

  const data = activeTab === "weekly" ? WEEKLY_RANKING : ANNUAL_RANKING;
  const rewards = activeTab === "weekly" ? WEEKLY_REWARDS : ANNUAL_REWARDS;

  const getMedalColor = (position: number) => {
    if (position === 1) return "#FFD700";
    if (position === 2) return "#C0C0C0";
    if (position === 3) return "#CD7F32";
    return ColorScheme.LineColor;
  };

  const renderItem = ({ item, index }: { item: RankedUser; index: number }) => {
    const position = index + 1;
    const isTopThree = position <= 3;
    const reward = rewards[position];

    return (
      <View
        style={[
          styles.row,
          isTopThree && styles.rowHighlight,
          index === 0 && styles.rowFirst,
        ]}
      >
        {/* Posição */}
        <View
          style={[
            styles.positionCircle,
            {
              backgroundColor: isTopThree ? getMedalColor(position) : "#F0F0F0",
            },
          ]}
        >
          <Text
            style={[
              styles.positionText,
              isTopThree && styles.positionTextHighlight,
            ]}
          >
            {position}
          </Text>
        </View>

        {/* Nome + prêmio */}
        <View style={styles.userInfo}>
          <Text
            style={[styles.username, isTopThree && styles.usernameHighlight]}
            numberOfLines={1}
          >
            {item.username}
          </Text>
          {reward != null && (
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>+{reward}</Text>
              <MaterialCommunityIcons
                name="diamond-stone"
                size={14}
                color="#8B5CF6"
              />
            </View>
          )}
        </View>

        {/* Pontos */}
        <Text style={styles.points}>
          {item.points.toLocaleString("pt-BR")} pts
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Text style={styles.screenTitle}>Ranking</Text>

      {/* Abas */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "weekly" && styles.tabActive]}
          onPress={() => setActiveTab("weekly")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "weekly" && styles.tabTextActive,
            ]}
          >
            Semanal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "annual" && styles.tabActive]}
          onPress={() => setActiveTab("annual")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "annual" && styles.tabTextActive,
            ]}
          >
            Anual
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 12,
  },

  // Abas
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: ColorScheme.MainColor,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },

  // Lista
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // Linha
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  rowHighlight: {
    borderColor: ColorScheme.BorderColor,
  },
  rowFirst: {
    borderColor: ColorScheme.MainColor,
  },

  // Posição
  positionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    fontSize: 13,
    fontWeight: "bold",
    color: ColorScheme.SecondaryTextColor,
  },
  positionTextHighlight: {
    color: "#FFFFFF",
  },

  // Info
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
    color: ColorScheme.TextColor,
  },
  usernameHighlight: {
    fontWeight: "bold",
  },
  rewardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8B5CF6",
  },

  // Pontos
  points: {
    fontSize: 13,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
    marginLeft: 8,
  },
});

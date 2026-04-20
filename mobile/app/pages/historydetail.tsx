import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

type CardType = "common" | "rare" | "epic";

const CARD_STYLES: Record<
  CardType,
  { label: string; color: string; borderColor: string }
> = {
  common: { label: "Comum", color: "#3B82F6", borderColor: "#2563EB" },
  rare: { label: "Rara", color: "#F97316", borderColor: "#EA580C" },
  epic: { label: "Épica", color: "#8B5CF6", borderColor: "#7C3AED" },
};

// Mock: cartas usadas no palpite
interface UsedCard {
  id: string;
  type: CardType;
  name: string;
}
const USED_CARDS: Record<string, UsedCard[]> = {
  h1: [
    { id: "c1", type: "common", name: "Ataque Certeiro" },
    { id: "e1", type: "epic", name: "Hat-trick" },
  ],
  h2: [
    { id: "c2", type: "common", name: "Defesa Sólida" },
    { id: "r1", type: "rare", name: "Contra-ataque" },
  ],
  h3: [],
  h4: [{ id: "c1", type: "common", name: "Ataque Certeiro" }],
};

// ── Badge do time ──────────────────────────────────────────────────────────────

const BADGE_SIZE = 64;
const INNER_SIZE = Math.ceil(BADGE_SIZE * 1.5);

function TeamBadge({ colors }: { colors: string[] }) {
  const offset = (BADGE_SIZE - INNER_SIZE) / 2;
  return (
    <View style={styles.teamBadge}>
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
        {colors.map((color, index) => (
          <View key={index} style={{ flex: 1, backgroundColor: color }} />
        ))}
      </View>
    </View>
  );
}

// ── Resultado do palpite ───────────────────────────────────────────────────────

function getGuessResult(
  guessHome: number,
  guessAway: number,
  homeScore: number,
  awayScore: number,
) {
  if (guessHome === homeScore && guessAway === awayScore)
    return {
      label: "Placar Exato",
      bg: "#E6F9E6",
      text: "#2E7D32",
      icon: "check-decagram" as const,
    };

  const guessW =
    guessHome > guessAway ? "h" : guessHome < guessAway ? "a" : "d";
  const realW = homeScore > awayScore ? "h" : homeScore < awayScore ? "a" : "d";
  if (guessW === realW)
    return {
      label: "Acertou Vencedor",
      bg: "#FFF3E0",
      text: "#E65100",
      icon: "check-circle-outline" as const,
    };

  return {
    label: "Errou",
    bg: "#FEE2E2",
    text: "#DC2626",
    icon: "close-circle-outline" as const,
  };
}

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function HistoryDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    homeTeamName: string;
    homeTeamColors: string;
    awayTeamName: string;
    awayTeamColors: string;
    homeScore: string;
    awayScore: string;
    guessHome: string;
    guessAway: string;
    cardCommon: string;
    cardRare: string;
    cardEpic: string;
    pointsEarned: string;
    coinsEarned: string;
    date: string;
  }>();

  const homeTeamColors = JSON.parse(params.homeTeamColors || "[]");
  const awayTeamColors = JSON.parse(params.awayTeamColors || "[]");
  const homeScore = parseInt(params.homeScore || "0", 10);
  const awayScore = parseInt(params.awayScore || "0", 10);
  const guessHome = parseInt(params.guessHome || "0", 10);
  const guessAway = parseInt(params.guessAway || "0", 10);
  const pointsEarned = parseInt(params.pointsEarned || "0", 10);
  const coinsEarned = parseInt(params.coinsEarned || "0", 10);

  const result = getGuessResult(guessHome, guessAway, homeScore, awayScore);
  const usedCards = USED_CARDS[params.id] ?? [];

  // Build 3 slots from usedCards
  const slots: (UsedCard | null)[] = [null, null, null];
  usedCards.forEach((c, i) => {
    if (i < 3) slots[i] = c;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={ColorScheme.TextColor}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Detalhe do Palpite</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Resultado badge ─────────────────────────────────────────── */}
        <View style={[styles.resultBanner, { backgroundColor: result.bg }]}>
          <MaterialCommunityIcons
            name={result.icon}
            size={22}
            color={result.text}
          />
          <Text style={[styles.resultBannerText, { color: result.text }]}>
            {result.label}
          </Text>
        </View>

        {/* ── Card: Placar + Palpite ─────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Resultado da Partida</Text>
            <Text style={styles.dateLabel}>{params.date}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.teamsArea}>
            <View style={styles.teamContainer}>
              <TeamBadge colors={homeTeamColors} />
              <Text style={styles.teamName} numberOfLines={2}>
                {params.homeTeamName}
              </Text>
            </View>

            <View style={styles.scoresCenter}>
              <View style={styles.scoreDisplay}>
                <Text style={styles.scoreBig}>{homeScore}</Text>
                <Text style={styles.vsText}>X</Text>
                <Text style={styles.scoreBig}>{awayScore}</Text>
              </View>
              <View
                style={[
                  styles.guessBadge,
                  {
                    backgroundColor:
                      guessHome === homeScore && guessAway === awayScore
                        ? "#E6F9E6"
                        : "#FEE2E2",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.guessBadgeText,
                    {
                      color:
                        guessHome === homeScore && guessAway === awayScore
                          ? "#2E7D32"
                          : "#DC2626",
                    },
                  ]}
                >
                  Palpite: {guessHome} – {guessAway}
                </Text>
              </View>
            </View>

            <View style={styles.teamContainer}>
              <TeamBadge colors={awayTeamColors} />
              <Text style={styles.teamName} numberOfLines={2}>
                {params.awayTeamName}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Card: PitaCards usados ───────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PitaCards Utilizados</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.slotsRow}>
            {slots.map((slot, index) => {
              const cs = slot ? CARD_STYLES[slot.type] : null;
              return (
                <View
                  key={index}
                  style={[
                    styles.slotBox,
                    {
                      backgroundColor: cs ? cs.color : "#E5E5E5",
                      borderColor: cs ? cs.borderColor : "#D1D5DB",
                    },
                  ]}
                >
                  {slot ? (
                    <View style={styles.slotFilled}>
                      <MaterialCommunityIcons
                        name="cards"
                        size={28}
                        color="#FFFFFF"
                      />
                      <Text style={styles.slotFilledLabel}>{cs?.label}</Text>
                      <Text style={styles.slotFilledName} numberOfLines={1}>
                        {slot.name}
                      </Text>
                    </View>
                  ) : (
                    <MaterialCommunityIcons
                      name="card-off-outline"
                      size={28}
                      color="#9CA3AF"
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Card: Pontos e moedas ganhos ─────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recompensas do Palpite</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rewardsArea}>
            {/* Pontos */}
            <View style={styles.rewardBox}>
              <View
                style={[
                  styles.rewardIconCircle,
                  { backgroundColor: "#FEF3C7" },
                ]}
              >
                <MaterialCommunityIcons
                  name="star-circle"
                  size={28}
                  color="#F59E0B"
                />
              </View>
              <Text style={styles.rewardValue}>+{pointsEarned}</Text>
              <Text style={styles.rewardLabel}>Pontos</Text>
            </View>

            {/* Separador vertical */}
            <View style={styles.rewardDivider} />

            {/* Moedas */}
            <View style={styles.rewardBox}>
              <View
                style={[
                  styles.rewardIconCircle,
                  { backgroundColor: "#FEF3C7" },
                ]}
              >
                <MaterialCommunityIcons
                  name="circle-multiple"
                  size={28}
                  color="#F59E0B"
                />
              </View>
              <Text style={styles.rewardValue}>+{coinsEarned}</Text>
              <Text style={styles.rewardLabel}>PitaCoins</Text>
            </View>
          </View>
        </View>

        {/* ── Botão voltar ─────────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.backButtonLarge}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonLargeText}>Voltar ao Histórico</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "transparent" },

  // Header
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ColorScheme.BackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },

  // Result banner
  resultBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  resultBannerText: { fontSize: 15, fontWeight: "bold" },

  // Card
  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  dateLabel: { fontSize: 12, color: ColorScheme.SecondaryTextColor },
  divider: { height: 1, backgroundColor: ColorScheme.LineColor },

  // Teams area
  teamsArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  teamContainer: { alignItems: "center", width: 80 },
  teamBadge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "600",
    color: ColorScheme.TextColor,
    marginTop: 8,
    textAlign: "center",
  },

  // Score display
  scoresCenter: { alignItems: "center", gap: 8 },
  scoreDisplay: { flexDirection: "row", alignItems: "center", gap: 12 },
  scoreBig: { fontSize: 28, fontWeight: "bold", color: ColorScheme.TextColor },
  vsText: {
    fontSize: 16,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
  },
  guessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  guessBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  // PitaCards slots
  slotsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  slotBox: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  slotFilled: { alignItems: "center", justifyContent: "center", gap: 2 },
  slotFilledLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  slotFilledName: { fontSize: 10, color: "rgba(255,255,255,0.8)" },

  // Rewards area
  rewardsArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  rewardBox: { flex: 1, alignItems: "center", gap: 6 },
  rewardIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  rewardLabel: { fontSize: 12, color: ColorScheme.SecondaryTextColor },
  rewardDivider: {
    width: 1,
    height: 60,
    backgroundColor: ColorScheme.LineColor,
  },

  // Back button
  backButtonLarge: {
    backgroundColor: ColorScheme.BackgroundColor,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    marginTop: 4,
  },
  backButtonLargeText: {
    color: ColorScheme.SecondaryTextColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

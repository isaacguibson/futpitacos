import ColorScheme from "@/components/ui/color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

interface Team {
  name: string;
  colors: string[];
}

interface HistoryMatch {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  guessHome: number;
  guessAway: number;
  cards: { common: boolean; rare: boolean; epic: boolean };
  pointsEarned: number;
  coinsEarned: number;
  date: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const HISTORY: HistoryMatch[] = [
  {
    id: "h1",
    homeTeam: { name: "Flamengo", colors: ["#C8102E", "#000000"] },
    awayTeam: { name: "Vasco", colors: ["#000000", "#FFFFFF"] },
    homeScore: 2,
    awayScore: 1,
    guessHome: 2,
    guessAway: 1,
    cards: { common: true, rare: false, epic: true },
    pointsEarned: 150,
    coinsEarned: 30,
    date: "18/03/2026",
  },
  {
    id: "h2",
    homeTeam: { name: "Palmeiras", colors: ["#006437", "#FFFFFF"] },
    awayTeam: { name: "São Paulo", colors: ["#FF0000", "#FFFFFF", "#000000"] },
    homeScore: 1,
    awayScore: 1,
    guessHome: 2,
    guessAway: 0,
    cards: { common: true, rare: true, epic: false },
    pointsEarned: 20,
    coinsEarned: 5,
    date: "15/03/2026",
  },
  {
    id: "h3",
    homeTeam: { name: "Corinthians", colors: ["#000000", "#FFFFFF"] },
    awayTeam: { name: "Santos", colors: ["#FFFFFF", "#000000"] },
    homeScore: 0,
    awayScore: 3,
    guessHome: 0,
    guessAway: 2,
    cards: { common: false, rare: false, epic: false },
    pointsEarned: 60,
    coinsEarned: 10,
    date: "12/03/2026",
  },
  {
    id: "h4",
    homeTeam: { name: "Botafogo", colors: ["#000000", "#FFFFFF"] },
    awayTeam: { name: "Fluminense", colors: ["#880038", "#006437", "#FFFFFF"] },
    homeScore: 3,
    awayScore: 2,
    guessHome: 1,
    guessAway: 1,
    cards: { common: true, rare: false, epic: false },
    pointsEarned: 10,
    coinsEarned: 2,
    date: "08/03/2026",
  },
];

// ── Badge do time ──────────────────────────────────────────────────────────────

const BADGE_SIZE = 40;
const INNER_SIZE = Math.ceil(BADGE_SIZE * 1.5);
const COIN_IMAGE = require("@/assets/images/coin.png");

function TeamBadge({ colors }: { colors: string[] }) {
  const offset = (BADGE_SIZE - INNER_SIZE) / 2;

  return (
    <View style={styles.teamBadgeShadow}>
      <View
        style={[
          styles.teamBadge,
          {
            borderColor: colors[0],
          },
        ]}
      >
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
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor: color,
              }}
            />
          ))}
        </View>
        <View style={styles.teamBadgeHighlight} pointerEvents="none" />
      </View>
    </View>
  );
}

// ── Resultado do palpite ───────────────────────────────────────────────────────

function getGuessResult(match: HistoryMatch) {
  const exactMatch =
    match.guessHome === match.homeScore && match.guessAway === match.awayScore;
  if (exactMatch) return { label: "Exato", bg: "#E6F9E6", text: "#2E7D32", hasHit: true, hasPartial: false };

  const guessWinner =
    match.guessHome > match.guessAway
      ? "home"
      : match.guessHome < match.guessAway
        ? "away"
        : "draw";
  const realWinner =
    match.homeScore > match.awayScore
      ? "home"
      : match.homeScore < match.awayScore
        ? "away"
        : "draw";

  if (guessWinner === realWinner)
    return { label: "Parcial", bg: "#FFF3E0", text: "#E65100", hasHit: false, hasPartial: true };
  return { label: "Errou", bg: "#FEE2E2", text: "#DC2626", hasHit: false, hasPartial: false };
}

// ── Card de histórico ──────────────────────────────────────────────────────────

function MatchHistoryCard({ guess, onPress }: { guess: HistoryMatch; onPress: () => void }) {
  const result = getGuessResult(guess);
  return (
    <View style={styles.card}>
      {/* Inner shadow overlay for convex relief */}
      <View style={styles.cardInnerShadow} pointerEvents="none" />
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
            <Text style={{color: ColorScheme.WhiteColor}}>22/05/2026 - 15h00</Text>
        </View>
        <View
          style={[
            styles.guessBadge,
            {
              backgroundColor: result.hasHit ? ColorScheme.GreenBadgeBackgroundColor : result.hasPartial ? ColorScheme.SecondaryBadgeBackgroundColor : ColorScheme.RedBadgeBackgroundColor,
              borderColor: result.hasHit ? ColorScheme.GreenBadgeBackgroundText : result.hasPartial ? ColorScheme.SecondaryTextColor : ColorScheme.RedBadgeBackgroundText,
            },
          ]}
        >
          <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
          <Text
            style={[
              styles.guessBadgeText,
              {
                color: result.hasHit
                  ? ColorScheme.GreenBadgeBackgroundText
                  : result.hasPartial
                    ? ColorScheme.SecondaryTextColor
                    : ColorScheme.RedBadgeBackgroundText,
              },
            ]}
          >
            {result.label}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <View style={styles.cardBody}>
        <LinearGradient
              // Background Linear Gradient
              colors={[ColorScheme.CardBackgroundColor, ColorScheme.CardLinearBackColor]}
              style={styles.linearGradient}
        />
        <View style={styles.teamsRow}>
          <View style={styles.teamContainer}>
            <TeamBadge colors={guess.homeTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {guess.homeTeam.name}
            </Text>
          </View>

          <View style={styles.scoresCenter}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {guess.homeScore}
              </Text>
              <Text style={styles.vsText}>X</Text>
              <Text style={styles.scoreText}>
                {guess.awayScore}
              </Text>
            </View>
              <View
                style={[
                  styles.guessPalpiteBadge,
                  {
                    backgroundColor: result.hasHit
                      ? ColorScheme.GreenBadgeBackgroundColor
                      : result.hasPartial
                        ? ColorScheme.SecondaryBadgeBackgroundColor
                        : ColorScheme.RedBadgeBackgroundColor,
                    borderColor: result.hasHit
                      ? ColorScheme.GreenBadgeBackgroundText
                      : result.hasPartial
                        ? ColorScheme.SecondaryTextColor
                        : ColorScheme.RedBadgeBackgroundText,
                  },
                ]}
              >
                <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
                <Text
                  style={[
                    styles.guessPalpiteText,
                    {
                      color: result.hasHit ? 
                          ColorScheme.GreenBadgeBackgroundText
                          : result.hasPartial
                            ? ColorScheme.SecondaryTextColor
                            : ColorScheme.RedBadgeBackgroundText,
                    },
                  ]}
                >
                  Palpite: {guess.guessHome} – {guess.guessAway}
                </Text>
              </View>
          </View>

          <View style={styles.teamContainer}>
            <TeamBadge colors={guess.awayTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {guess.awayTeam.name}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardFooter}>
        <View style={{marginTop: 0, display: "flex", flexDirection: "row", gap: 10}}>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
              <View style={{zIndex: 10}}>
                  <Image
                      source={COIN_IMAGE}
                      style={{width: 30, height: 30}}
                      resizeMode="cover"
                  />
              </View>
              <View style={{width: 80, height: 25, marginLeft: -20, backgroundColor: "#353535", justifyContent: "center", alignItems: "center", borderRadius: 5}}>
                  <Text style={{color: "#FFF", fontWeight: "bold",}}>x2</Text>
              </View>
          </View>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 4}}>
              <View style={{zIndex: 10}}>
                  <Image
                      source={COIN_IMAGE}
                      style={{width: 30, height: 30}}
                      resizeMode="cover"
                  />
              </View>
              <View style={{width: 80, height: 25, marginLeft: -20, backgroundColor: "#353535", justifyContent: "center", alignItems: "center", borderRadius: 5}}>
                  <Text style={{color: "#FFF", fontWeight: "bold"}}>x2</Text>
              </View>
          </View>
      </View>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonShiny]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={styles.shinyHighlight} />
          <Text style={[styles.actionButtonText, { color: "#FFFFFF" }]}>
            Ver Palpite
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Tela ───────────────────────────────────────────────────────────────────────

export default function HistoryScreen() {
  const router = useRouter();

  const navigateToDetail = (match: HistoryMatch) => {
    router.push({
      pathname: "/pages/historydetail",
      params: {
        id: match.id,
        homeTeamName: match.homeTeam.name,
        homeTeamColors: JSON.stringify(match.homeTeam.colors),
        awayTeamName: match.awayTeam.name,
        awayTeamColors: JSON.stringify(match.awayTeam.colors),
        homeScore: String(match.homeScore),
        awayScore: String(match.awayScore),
        guessHome: String(match.guessHome),
        guessAway: String(match.guessAway),
        cardCommon: String(match.cards.common),
        cardRare: String(match.cards.rare),
        cardEpic: String(match.cards.epic),
        pointsEarned: String(match.pointsEarned),
        coinsEarned: String(match.coinsEarned),
        date: match.date,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchHistoryCard guess={item} onPress={() => navigateToDetail(item)} />
        )}
        ListHeaderComponent={
          <ImageBackground
            source={require("@/assets/images/banner_historico.png")}
            style={styles.bannerHeader}
            resizeMode="center"
          >
            <Text style={styles.bannerHeaderTitle}>Histórico</Text>
          </ImageBackground>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="history"
              size={48}
              color={ColorScheme.LineColor}
            />
            <Text style={styles.emptyText}>
              Seu histórico de palpites aparecerá aqui.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "transparent" },
  screenHeader: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },

  // Card
  card: {
    backgroundColor: ColorScheme.CardBackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    // External shadow
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },

  // Header
  dateText: {
    fontSize: 12,
    color: ColorScheme.WhiteColor,
    fontWeight: "500",
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultBadgeText: { fontSize: 11, fontWeight: "600" },
  divider: { height: 1, backgroundColor: ColorScheme.LineColor },

  // Body
  cardBody: { paddingHorizontal: 16, paddingVertical: 14 },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamContainer: { alignItems: "center", width: 70 },
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
  teamName: {
    fontSize: 12,
    fontWeight: "700",
    color: ColorScheme.WhiteColor,
    marginTop: 6,
    textAlign: "center",
  },

  // Scores
  scoresBlock: { alignItems: "center", gap: 6 },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // Footer
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  rewardsRow: { flexDirection: "row", gap: 10 },
  rewardChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  rewardText: {
    fontSize: 12,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
  },
  viewButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorScheme.MainColor,
    backgroundColor: ColorScheme.BackgroundColor,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: ColorScheme.MainColor,
  },

  // Empty
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: ColorScheme.SecondaryTextColor,
    textAlign: "center",
  },
  bannerHeader: {
    height: 65,
    marginTop: 30,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerHeaderTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginTop: 5,
  },
  cardInnerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 11,
    borderWidth: 6,
    borderTopColor: "rgba(0,0,0,0.01)",
    borderLeftColor: "rgba(0,0,0,0.1)",
    borderRightColor: "rgba(0,0,0,0.1)",
    borderBottomColor: "rgba(0,0,0,0.2)",
    zIndex: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  guessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
  },
  guessBadgeShinyHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  guessBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 155,
  },
  scoresCenter: {
    alignItems: "center",
    gap: 6,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreText: {
    fontSize: 26,
    fontWeight: "bold",
    color: ColorScheme.WhiteColor,
    minWidth: 24,
    textAlign: "center",
  },
  vsText: {
    fontSize: 22,
    fontWeight: "bold",
    color: ColorScheme.WhiteColor    ,
  },
  guessPalpiteBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2
  },
  guessPalpiteText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  actionButtonShiny: {
    backgroundColor: ColorScheme.MainColor,
    borderWidth: 3,
    borderColor: "#CC0000",
    shadowColor: ColorScheme.MainColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    width: 120,
    height: 40,
  },
  shinyHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

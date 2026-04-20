import ColorScheme from "@/components/ui/color-scheme";
import AppText from "@/components/text";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Match from "@/models/Match";

const Text = AppText;

// ── Dados fixos (mock) ─────────────────────────────────────────────────────────

const MATCHES: Match[] = [
  {
    id: "1",
    homeTeam: { name: "Flamengo", colors: ["#C8102E", "#000000"] },
    awayTeam: { name: "Vasco", colors: ["#000000", "#FFFFFF"] },
    homeScore: 2,
    awayScore: 1,
    guessHome: 2,
    guessAway: 1,
    status: "Finalizado",
    hasGuess: true,
    cards: { common: true, rare: false, epic: true },
  },
  {
    id: "2",
    homeTeam: { name: "Palmeiras", colors: ["#006437", "#FFFFFF"] },
    awayTeam: { name: "São Paulo", colors: ["#FF0000", "#FFFFFF", "#000000"] },
    status: "Iniciado",
    hasGuess: false,
    cards: { common: false, rare: false, epic: false },
  },
  {
    id: "3",
    homeTeam: { name: "Corinthians", colors: ["#000000", "#FFFFFF"] },
    awayTeam: { name: "Santos", colors: ["#000000", "#FFFFFF"] },
    guessHome: 1,
    guessAway: 0,
    status: "Em espera",
    hasGuess: true,
    cards: { common: true, rare: true, epic: false },
  },
  {
    id: "4",
    homeTeam: { name: "Botafogo", colors: ["#000000", "#FFFFFF"] },
    awayTeam: { name: "Fluminense", colors: ["#006437", "#880038", "#FFFFFF"] },
    status: "Em espera",
    hasGuess: false,
    cards: { common: false, rare: false, epic: false },
  },
];

// ── Componente: Badge do time (círculo com listras diagonais) ──────────────────

const BADGE_SIZE = 48;
const INNER_SIZE = Math.ceil(BADGE_SIZE * 1.5);

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

// ── Componente: Badge de status da partida ─────────────────────────────────────

function MatchStatusBadge({ status }: { status: Match["status"] }) {
  const statusConfig = {
    "Em espera": { bg: ColorScheme.SecondaryBadgeBackgroundColor, text: ColorScheme.SecondaryTextColor },
    Iniciado: { bg: ColorScheme.GreenBadgeBackgroundColor, text: ColorScheme.GreenBadgeBackgroundText },
    Finalizado: { bg: ColorScheme.RedBadgeBackgroundColor, text: ColorScheme.RedBadgeBackgroundText },
  };

  const config = statusConfig[status];

  return (
    <View style={[styles.matchStatusBadge, { backgroundColor: config.bg, borderWidth: 2, borderColor: config.text }]}>
      <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
      <Text style={[styles.matchStatusText, { color: config.text }]}>
        {status}
      </Text>
    </View>
  );
}

// ── Componente: Card de partida ────────────────────────────────────────────────

function FloatingCardSlot({
  active,
  bgColor,
  borderColor,
  glowColor,
  delay,
  children,
}: {
  active: boolean;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  delay: number;
  children?: React.ReactNode;
}) {
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
        styles.cardSlotOuter,
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

function MatchCard({ match, onPress }: { match: Match; onPress: () => void }) {
  const isFinished = match.status === "Finalizado";

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
              backgroundColor: match.hasGuess ? ColorScheme.GreenBadgeBackgroundColor : ColorScheme.SecondaryBadgeBackgroundColor,
              borderColor: match.hasGuess ? ColorScheme.GreenBadgeBackgroundText : ColorScheme.SecondaryTextColor,
            },
          ]}
        >
          <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
          <Text
            style={[
              styles.guessBadgeText,
              {
                color: match.hasGuess
                  ? ColorScheme.GreenBadgeBackgroundText
                  : ColorScheme.SecondaryTextColor,
              },
            ]}
          >
            {match.hasGuess ? "Palpitado" : "Sem palpite"}
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
            <TeamBadge colors={match.homeTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {match.homeTeam.name}
            </Text>
          </View>

          <View style={styles.scoresCenter}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {isFinished ? match.homeScore : "-"}
              </Text>
              <Text style={styles.vsText}>X</Text>
              <Text style={styles.scoreText}>
                {isFinished ? match.awayScore : "-"}
              </Text>
            </View>
            {match.hasGuess && (
              <View
                style={[
                  styles.guessPalpiteBadge,
                  {
                    backgroundColor: isFinished
                      ? match.guessHome === match.homeScore &&
                        match.guessAway === match.awayScore
                        ? ColorScheme.GreenBadgeBackgroundColor
                        : ColorScheme.RedBadgeBackgroundColor
                      : ColorScheme.SecondaryBadgeBackgroundColor,
                    borderColor: isFinished
                      ? match.guessHome === match.homeScore &&
                        match.guessAway === match.awayScore
                        ? ColorScheme.GreenBadgeBackgroundText
                        : ColorScheme.RedBadgeBackgroundText
                      : ColorScheme.SecondaryTextColor,
                  },
                ]}
              >
                <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
                <Text
                  style={[
                    styles.guessPalpiteText,
                    {
                      color: isFinished
                        ? match.guessHome === match.homeScore &&
                          match.guessAway === match.awayScore
                          ? ColorScheme.GreenBadgeBackgroundText
                          : ColorScheme.RedBadgeBackgroundText
                        : ColorScheme.SecondaryTextColor,
                    },
                  ]}
                >
                  Palpite: {match.guessHome} – {match.guessAway}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.teamContainer}>
            <TeamBadge colors={match.awayTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {match.awayTeam.name}
            </Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <MatchStatusBadge status={match.status} />
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardFooter}>
        <View style={styles.cardsRow}>
          <FloatingCardSlot
            active={!!match.cards.common}
            bgColor={match.cards.common ? "#3B82F6" : "#D1D5DB"}
            borderColor={match.cards.common ? "#2563EB" : "#D1D5DB"}
            glowColor="#3B82F6"
            delay={0}
          >
            {match.cards.common && <View style={styles.cardSlotHighlight} />}
          </FloatingCardSlot>
          <FloatingCardSlot
            active={!!match.cards.rare}
            bgColor={match.cards.rare ? "#F97316" : "#D1D5DB"}
            borderColor={match.cards.rare ? "#EA580C" : "#D1D5DB"}
            glowColor="#F97316"
            delay={150}
          >
            {match.cards.rare && <View style={styles.cardSlotHighlight} />}
          </FloatingCardSlot>
          <FloatingCardSlot
            active={!!match.cards.epic}
            bgColor={match.cards.epic ? "#8B5CF6" : "#D1D5DB"}
            borderColor={match.cards.epic ? "#7C3AED" : "#D1D5DB"}
            glowColor="#8B5CF6"
            delay={300}
          >
            {match.cards.epic && <View style={styles.cardSlotHighlight} />}
          </FloatingCardSlot>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonShiny]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={styles.shinyHighlight} />
          <Text style={[styles.actionButtonText, { color: "#FFFFFF" }]}>
            Palpitar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Tela principal ─────────────────────────────────────────────────────────────

export default function MatchListScreen() {
  const router = useRouter();

  const navigateToDetail = (match: Match) => {
    router.push({
      pathname: "/pages/matchdetail",
      params: {
        id: match.id,
        homeTeamName: match.homeTeam.name,
        homeTeamColors: JSON.stringify(match.homeTeam.colors),
        awayTeamName: match.awayTeam.name,
        awayTeamColors: JSON.stringify(match.awayTeam.colors),
        status: match.status,
        hasGuess: String(match.hasGuess),
        homeScore: String(match.homeScore ?? 0),
        awayScore: String(match.awayScore ?? 0),
        guessHome: String(match.guessHome ?? 0),
        guessAway: String(match.guessAway ?? 0),
        cardCommon: String(match.cards.common),
        cardRare: String(match.cards.rare),
        cardEpic: String(match.cards.epic),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={MATCHES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard match={item} onPress={() => navigateToDetail(item)} />
        )}
        ListHeaderComponent={
          <ImageBackground
            source={require("@/assets/images/banner_partidas.png")}
            style={styles.bannerHeader}
            resizeMode="center"
          >
            <Text style={styles.bannerHeaderTitle}>Partidas</Text>
          </ImageBackground>
        }
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
    marginTop: -20,
  },
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
  divider: {
    height: 3,
    backgroundColor: ColorScheme.LineCardColor,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamContainer: {
    alignItems: "center",
    width: 80,
  },
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
    fontSize: 14,
    fontWeight: "700",
    color: ColorScheme.WhiteColor,
    marginTop: 6,
    textAlign: "center",
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
    fontSize: 38,
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
  matchStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
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
  cardsRow: {
    flexDirection: "row",
    gap: 8,
  },
  cardSlotOuter: {
    width: 28,
    height: 36,
    borderRadius: 6,
    borderWidth: 3,
  },
  cardSlotInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
    overflow: "hidden",
  },
  cardSlotHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    height: 45,
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
    fontSize: 14,
    fontWeight: "bold",
  },
  linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 200,
  }
});

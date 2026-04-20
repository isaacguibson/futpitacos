import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorScheme from "../../components/ui/color-scheme";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

interface Team {
  name: string;
  colors: string[]; // cores para as listras diagonais do badge
}

interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: "Em espera" | "Iniciado" | "Finalizado";
  hasGuess: boolean;
  cards: {
    common: boolean;
    rare: boolean;
    epic: boolean;
  };
}

// ── Dados fixos (mock) ─────────────────────────────────────────────────────────

const MATCHES: Match[] = [
  {
    id: "1",
    homeTeam: { name: "Flamengo", colors: ["#C8102E", "#000000"] },
    awayTeam: { name: "Vasco", colors: ["#000000", "#FFFFFF"] },
    homeScore: 2,
    awayScore: 1,
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
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: color,
            }}
          />
        ))}
      </View>
    </View>
  );
}

// ── Componente: Badge de status da partida ─────────────────────────────────────

function MatchStatusBadge({ status }: { status: Match["status"] }) {
  const statusConfig = {
    "Em espera": { bg: "#F0F0F0", text: ColorScheme.SecondaryTextColor },
    Iniciado: { bg: "#E6F9E6", text: "#2E7D32" },
    Finalizado: { bg: "#FFF3E0", text: "#E65100" },
  };

  const config = statusConfig[status];

  return (
    <View style={[styles.matchStatusBadge, { backgroundColor: config.bg }]}>
      <Text style={[styles.matchStatusText, { color: config.text }]}>
        {status}
      </Text>
    </View>
  );
}

// ── Componente: Card de partida ────────────────────────────────────────────────

function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === "Finalizado";

  return (
    <View style={styles.card}>
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }} />
        <View
          style={[
            styles.guessBadge,
            {
              backgroundColor: match.hasGuess ? "#E6F9E6" : "#F0F0F0",
            },
          ]}
        >
          <Text
            style={[
              styles.guessBadgeText,
              {
                color: match.hasGuess
                  ? "#2E7D32"
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
        {/* Times + Placar */}
        <View style={styles.teamsRow}>
          {/* Time da casa */}
          <View style={styles.teamContainer}>
            <TeamBadge colors={match.homeTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {match.homeTeam.name}
            </Text>
          </View>

          {/* Placar central */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {isFinished ? match.homeScore : "-"}
            </Text>
            <Text style={styles.vsText}>X</Text>
            <Text style={styles.scoreText}>
              {isFinished ? match.awayScore : "-"}
            </Text>
          </View>

          {/* Time visitante */}
          <View style={styles.teamContainer}>
            <TeamBadge colors={match.awayTeam.colors} />
            <Text style={styles.teamName} numberOfLines={2}>
              {match.awayTeam.name}
            </Text>
          </View>
        </View>

        {/* Status da partida */}
        <View style={styles.statusRow}>
          <MatchStatusBadge status={match.status} />
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardFooter}>
        {/* Cartas de vantagem */}
        <View style={styles.cardsRow}>
          <View
            style={[
              styles.cardSlot,
              {
                backgroundColor: match.cards.common ? "#3B82F6" : "#D1D5DB",
                borderColor: match.cards.common ? "#2563EB" : "#D1D5DB",
              },
            ]}
          />
          <View
            style={[
              styles.cardSlot,
              {
                backgroundColor: match.cards.rare ? "#F97316" : "#D1D5DB",
                borderColor: match.cards.rare ? "#EA580C" : "#D1D5DB",
              },
            ]}
          />
          <View
            style={[
              styles.cardSlot,
              {
                backgroundColor: match.cards.epic ? "#8B5CF6" : "#D1D5DB",
                borderColor: match.cards.epic ? "#7C3AED" : "#D1D5DB",
              },
            ]}
          />
        </View>

        {/* Botão de ação */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: match.hasGuess
                ? ColorScheme.BackgroundColor
                : ColorScheme.MainColor,
              borderWidth: match.hasGuess ? 1 : 0,
              borderColor: match.hasGuess
                ? ColorScheme.MainColor
                : "transparent",
            },
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              {
                color: match.hasGuess ? ColorScheme.MainColor : "#FFFFFF",
              },
            ]}
          >
            {match.hasGuess ? "Ver Palpite" : "Palpitar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Tela principal ─────────────────────────────────────────────────────────────

export default function MatchListScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Partidas</Text>
      </View>

      <FlatList
        data={MATCHES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
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

  // Card
  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },

  // Header
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
  },
  guessBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
  },

  // Body
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  teamContainer: {
    alignItems: "center",
    width: 80,
  },
  teamBadge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    overflow: "hidden",
    borderWidth: 1,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "600",
    color: ColorScheme.TextColor,
    marginTop: 6,
    textAlign: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
    minWidth: 24,
    textAlign: "center",
  },
  vsText: {
    fontSize: 16,
    fontWeight: "600",
    color: ColorScheme.SecondaryTextColor,
  },
  statusRow: {
    flexDirection: "row",
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

  // Footer
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 8,
  },
  cardSlot: {
    width: 28,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import AppText from "../../components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorScheme from "../../components/ui/color-scheme";
import {LinearGradient} from "expo-linear-gradient";

const Text = AppText;

// ── Types ──────────────────────────────────────────────────────────────────────

type CardType = "common" | "rare" | "epic";

const CARD_STYLES: Record<
  CardType,
  { label: string; color: string; borderColor: string; backgroundColor: string }
> = {
  common: {
    label: "COMUM",
    color: ColorScheme.CommonCardTextColor,
    borderColor: "#2563EB",
    backgroundColor: ColorScheme.CommonCardBackgroundColor,
  },
  rare: {
    label: "RARA",
    color: ColorScheme.RareCardTextColor,
    borderColor: "#EA580C",
    backgroundColor: ColorScheme.RareCardBackgroundColor,
  },
  epic: {
    label: "ÉPICA",
    color: ColorScheme.EpicCardTextColor,
    borderColor: "#7C3AED",
    backgroundColor: ColorScheme.EpicCardBackgroundColor,
  },
};

// Mock: cartas que o usuário possui (futuramente virá da API)
interface UserCard {
  id: string;
  type: CardType;
  name: string;
}

const USER_CARDS: UserCard[] = [
  { id: "c1", type: "common", name: "Ataque Certeiro" },
  { id: "c2", type: "common", name: "Defesa Sólida" },
  { id: "c3", type: "rare", name: "Goleiro Inspirado" },
  { id: "r1", type: "rare", name: "Contra-ataque" },
  { id: "e1", type: "epic", name: "Hat-trick" },
  { id: "e2", type: "epic", name: "Gol de Placa" },
];

const SAMPLE_CARD_IMAGE = require("@/assets/images/cards/cover_tudo_em_dobro.png");
const COIN_IMAGE = require("@/assets/images/coin.png");
const CARD_EFFECT_IMAGE = require("@/assets/images/effect_white.png");

// ── Componente: Badge do time ──────────────────────────────────────────────────

const BADGE_SIZE = 64;
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

// ── Componente: Seletor de placar ──────────────────────────────────────────────

function ScorePicker({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <View style={styles.scorePicker}>
      <TouchableOpacity
            style={{padding: 10}}
            activeOpacity={0.6}
            onPress={onIncrement}
      >
            <ImageBackground
                source={require("@/assets/images/arrow_red.png")}
                style={{height: 30, width: 30}}
                resizeMode="contain"
            />
      </TouchableOpacity>

      <View style={styles.scoreValueContainer}>
        <Text style={styles.scoreValue}>{value}</Text>
      </View>

      <TouchableOpacity
        style={{padding: 10}}
        onPress={onDecrement}
        activeOpacity={0.6}
      >
          <ImageBackground
              source={require("@/assets/images/arrow_red.png")}
              style={{height: 30, width: 30, transform: [{ rotate: "180deg" }]}}
              resizeMode="contain"
          />
      </TouchableOpacity>
    </View>
  );
}

// ── Tela principal ─────────────────────────────────────────────────────────────

export default function MatchDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    homeTeamName: string;
    homeTeamColors: string;
    awayTeamName: string;
    awayTeamColors: string;
    status: string;
    hasGuess: string;
    homeScore: string;
    awayScore: string;
    guessHome: string;
    guessAway: string;
    cardCommon: string;
    cardRare: string;
    cardEpic: string;
  }>();
  const match = {
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
  };

  const homeTeamColors = JSON.parse(params.homeTeamColors || "[]");
  const awayTeamColors = JSON.parse(params.awayTeamColors || "[]");
  const hasGuess = params.hasGuess === "true";
  const isFinished = params.status === "Finalizado";
    const isIniciado = params.status === "Iniciado";

  const realHomeScore = parseInt(params.homeScore || "0", 10);
  const realAwayScore = parseInt(params.awayScore || "0", 10);
  const guessHome = parseInt(params.guessHome || "0", 10);
  const guessAway = parseInt(params.guessAway || "0", 10);

  const initialHome = hasGuess ? guessHome : 0;
  const initialAway = hasGuess ? guessAway : 0;

  const [homeScore, setHomeScore] = useState(initialHome);
  const [awayScore, setAwayScore] = useState(initialAway);

  const isExactGuess =
    isFinished && guessHome === realHomeScore && guessAway === realAwayScore;

  // Slots: 3 espaços, cada um pode ter uma carta ou null
  const buildInitialSlots = (): (UserCard | null)[] => {
    const slots: (UserCard | null)[] = [null, null, null];
    let slotIdx = 0;
    if (params.cardCommon === "true" && slotIdx < 3) {
      slots[slotIdx] = USER_CARDS.find((c) => c.type === "common") || null;
      slotIdx++;
    }
    if (params.cardRare === "true" && slotIdx < 3) {
      slots[slotIdx] = USER_CARDS.find((c) => c.type === "rare") || null;
      slotIdx++;
    }
    if (params.cardEpic === "true" && slotIdx < 3) {
      slots[slotIdx] = USER_CARDS.find((c) => c.type === "epic") || null;
      slotIdx++;
    }
    return slots;
  };

  const [cardSlots, setCardSlots] =
    useState<(UserCard | null)[]>(buildInitialSlots);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelection, setTempSelection] = useState<UserCard | null>(null);

  const openSlotModal = (index: number) => {
    setActiveSlotIndex(index);
    setTempSelection(cardSlots[index]);
    setModalVisible(true);
  };

  const confirmSelection = () => {
    if (activeSlotIndex !== null) {
      setCardSlots((prev) => {
        const next = [...prev];
        next[activeSlotIndex] = tempSelection;
        return next;
      });
    }
    setModalVisible(false);
    setActiveSlotIndex(null);
    setTempSelection(null);
  };

  const cancelSelection = () => {
    setModalVisible(false);
    setActiveSlotIndex(null);
    setTempSelection(null);
  };

  // Cartas já usadas em outros slots (para evitar duplicação)
  const usedCardIds = cardSlots
    .filter((c, i) => c !== null && i !== activeSlotIndex)
    .map((c) => c!.id);

  const handleSave = () => {
    // Futuramente: salvar via API
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  // ── Status badge ──

  const statusConfig: Record<string, { bg: string; text: string }> = {
      "Em espera": { bg: ColorScheme.SecondaryBadgeBackgroundColor, text: ColorScheme.SecondaryTextColor },
      Iniciado: { bg: ColorScheme.GreenBadgeBackgroundColor, text: ColorScheme.GreenBadgeBackgroundText },
      Finalizado: { bg: ColorScheme.RedBadgeBackgroundColor, text: ColorScheme.RedBadgeBackgroundText },
  };

  const statusStyle = statusConfig[params.status] || statusConfig["Em espera"];

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header da tela ──────────────────────────────────────────────── */}
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
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Card do placar ────────────────────────────────────────────── */}
          <View style={styles.card}>
              {/*<LinearGradient
                // Background Linear Gradient
                colors={[ColorScheme.CardBackgroundColor, ColorScheme.CardLinearBackColor]}
                style={styles.linearGradient}
            />*/}
            <View style={styles.cardInnerShadow} pointerEvents="none" />
            {/* Status badge */}
            <View style={styles.cardHeaderRow}>
              <View
                style={[
                  styles.matchStatusBadge,
                  { backgroundColor: statusStyle.bg,
                    borderColor: statusStyle.text
                  },
                ]}
              >
                <View style={styles.guessBadgeShinyHighlight} pointerEvents="none" />
                <Text
                  style={[styles.matchStatusText, { color: statusStyle.text }]}
                >
                  {params.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Times e placar */}
            <View style={styles.teamsRow}>
                  <View style={styles.teamContainer}>
                      <TeamBadge colors={match.homeTeam.colors} />
                      <Text style={styles.teamName} numberOfLines={2}>
                          {match.homeTeam.name}
                      </Text>
                  </View>

                  <View style={styles.scoresCenter}>
                      {(isFinished || isIniciado) && (<View style={styles.scoreContainer}>
                          <Text style={styles.scoreText}>
                              {isFinished ? match.homeScore : "-"}
                          </Text>
                          <Text style={styles.vsText}>X</Text>
                          <Text style={styles.scoreText}>
                              {isFinished ? match.awayScore : "-"}
                          </Text>
                      </View>)}
                      {(!isFinished && !isIniciado) && (
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 12}}>
                            <ScorePicker
                                value={homeScore}
                                onIncrement={() => setHomeScore((h) => Math.min(h + 1, 99))}
                                onDecrement={() => setHomeScore((h) => Math.max(h - 1, 0))} />
                            <Text style={styles.vsText}>X</Text>
                            <ScorePicker
                                value={awayScore}
                                onIncrement={() => setAwayScore((h) => Math.min(h + 1, 99))}
                                onDecrement={() => setAwayScore((h) => Math.max(h - 1, 0))} />
                        </View>
                      )}
                      {match.hasGuess && isFinished && (
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
            <View style={{width: "80%", alignSelf: "center"}}>
                <ImageBackground
                    source={require("@/assets/images/panelEpic_purple.png")}
                    style={styles.bannerHeader}
                    resizeMode="stretch"
                >
                    <Text style={styles.bannerHeaderTitle}>Pitacards</Text>
                </ImageBackground>
            </View>
            <View style={styles.slotsRow}>
                  {cardSlots.map((slot, index) => {
                      return (
                          <TouchableOpacity
                              key={index}
                              style={[
                                  styles.slotBox,
                                  slot
                                      ? {
                                          borderColor: CARD_STYLES[slot.type].borderColor,
                                          borderWidth: 4,
                                      }
                                      : styles.emptySlotBox,
                              ]}
                              onPress={() => openSlotModal(index)}
                              activeOpacity={0.8}
                              disabled={(isFinished || isIniciado)}
                          >
                              {!slot && (
                                  <View
                                      style={styles.emptySlotHighlight}
                                      pointerEvents="none"
                                  />
                              )}
                              {slot ? (
                                  <View style={styles.slotFilled}>
                                      <Image
                                          source={SAMPLE_CARD_IMAGE}
                                          style={styles.slotFilledImage}
                                          resizeMode="cover"
                                      />
                                  </View>
                              ) : (
                                  <MaterialCommunityIcons
                                      name="plus"
                                      size={32}
                                      color="#6B7280"
                                  />
                              )}
                          </TouchableOpacity>
                      );
                  })}
            </View>
          </View>

          {/* ── Bottom Sheet Modal ────────────────────────────────────────── */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={cancelSelection}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground
                source={require("@/assets/images/darkModal_dark.png")}
                style={styles.modalSheet}
                imageStyle={styles.modalSheetBackgroundImage}
                resizeMode="stretch"
              >
                {/* Modal header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Pitacards</Text>
                  <TouchableOpacity
                    onPress={cancelSelection}
                    style={styles.modalCloseButton}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={22}
                      color={ColorScheme.SecondaryTextColor}
                    />
                  </TouchableOpacity>
                </View>

                {/* Lista de cartas */}
                <ScrollView
                  style={styles.modalList}
                  showsVerticalScrollIndicator={false}
                >
                  {USER_CARDS.map((card) => {
                    const style = CARD_STYLES[card.type];
                    const isUsed = usedCardIds.includes(card.id);
                    const isSelected = tempSelection?.id === card.id;

                    return (
                      <TouchableOpacity
                        key={card.id}
                        style={[
                          styles.modalCardItem,
                          isSelected && styles.modalCardItemSelected,
                          isUsed && styles.modalCardItemDisabled,
                        ]}
                        onPress={() => {
                          if (!isUsed) {
                            setTempSelection(isSelected ? null : card);
                          }
                        }}
                        activeOpacity={isUsed ? 1 : 0.7}
                        disabled={isUsed}
                      >
                        <Image
                           style={{flex: 1, height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                           source={SAMPLE_CARD_IMAGE}
                           resizeMode="stretch"
                        />
                        <View
                          style={[
                            styles.modalCardInfo,
                            { backgroundColor: style.backgroundColor },
                          ]}
                        >
                          <Image
                            source={CARD_EFFECT_IMAGE}
                            style={styles.modalCardInfoEffect}
                            resizeMode="cover"
                          />
                          <View style={styles.modalCardInfoContent}>
                           <Text
                             style={[
                               styles.modalCardName,
                               isUsed && { color: "#BCBCBC" },
                             ]}
                           >
                             {card.name}
                           </Text>
                           <Text
                             style={[
                               styles.modalCardType,
                               { color: isUsed ? "#D1D5DB" : style.color },
                             ]}
                           >
                             {style.label}
                             {isUsed ? " · Em uso" : ""}
                           </Text>
                           <View>
                               <Text style={{color: "#FFF"}}>
                                   Aqui vai uma boa descrição do que essa carta faz.
                               </Text>
                           </View>
                           <View style={{marginTop: 20, display: "flex", flexDirection: "row", gap: 20}}>
                               <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 4}}>
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
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Botão confirmar */}
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.modalConfirmButton}
                    onPress={confirmSelection}
                    activeOpacity={0.7}
                  >
                    <View style={styles.shinyHighlight} />
                    <Text style={styles.modalConfirmText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          {/* ── Botões de ação ────────────────────────────────────────────── */}
          <View style={styles.actionsArea}>
            {(!isFinished && !isIniciado) && (
              <TouchableOpacity
                style={[styles.saveButton, styles.actionButtonShiny]}
                onPress={handleSave}
                activeOpacity={0.7}
              >
                <View style={styles.shinyHighlight} />
                <Text style={styles.saveButtonText}>Salvar Palpite</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Card container
  card: {
    backgroundColor: ColorScheme.CardBackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10
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

  // Card header
  cardHeaderRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "flex-end",
  },
  matchStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
  },
  matchStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  divider: {
    height: 3,
    backgroundColor: ColorScheme.LineCardColor,
  },

  // Teams area
  teamsArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
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

  // Score picker
  scoreArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scorePicker: {
    alignItems: "center",
    gap: 2,
  },
  arrowButton: {
    width: 40,
    height: 36,
    borderRadius: 8,
    backgroundColor: ColorScheme.BackgroundColor,
    borderWidth: 1,
    borderColor: ColorScheme.BorderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValueContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: ColorScheme.BorderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  vsText: {
    marginHorizontal: 4,
    fontSize: 22,
    fontWeight: "bold",
    color: ColorScheme.WhiteColor,
  },

  // Finished score (read-only)
  finishedScoreCenter: {
    alignItems: "center",
    gap: 8,
  },
  finishedScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  finishedScoreBig: {
    fontSize: 28,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
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

  // PitaCards section
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: ColorScheme.SecondaryTextColor,
    marginTop: 2,
  },
  slotsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    marginBottom: 20,
  },
  slotBox: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  emptySlotBox: {
    backgroundColor: "#E5E7EB",
    borderWidth: 4,
    borderColor: "#D1D5DB",
    shadowColor: "#9CA3AF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  emptySlotHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  slotFilled: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slotFilledImage: {
    width: "100%",
    height: "100%",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get("window").height * 0.65,
    overflow: "hidden",
  },
  modalSheetBackgroundImage: {
    transform: [{ rotate: "180deg" }],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: ColorScheme.WhiteColor,
    backgroundColor: "transparent",
    marginLeft: 20,
    marginTop: 10
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginTop: 10,
  },
  modalList: {
    paddingHorizontal: 26,
  },
  modalCardItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#FAFAFA",
    borderWidth: 3,
    borderColor: ColorScheme.LineColor,
  },
  modalCardItemSelected: {
    borderColor: ColorScheme.GreenSelectedColor,
    backgroundColor: "#FFF5F5",
  },
  modalCardItemDisabled: {
    opacity: 0.45,
  },
  modalCardIcon: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
    borderWidth: 1
  },
  modalCardIconImage: {
    width: "100%",
    height: "100%",
  },
  modalCardInfo: {
    flex: 2,
    borderLeftWidth: 3,
    borderLeftColor: "#c6c6c6",
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    position: "relative",
    overflow: "hidden",
  },
  modalCardInfoEffect: {
    opacity: 0.06,
    position: "absolute",
    bottom: -250,
    left: -100,
    width: 450,
    height: 450,
  },
  modalCardInfoContent: {
    flex: 1,
    zIndex: 1,
   },
   modalCardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.WhiteColor,
  },
  modalCardType: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  modalConfirmButton: {
    backgroundColor: ColorScheme.MainColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalConfirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  // Action buttons
  actionsArea: {
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: ColorScheme.MainColor,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: ColorScheme.BackgroundColor,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
  },
  cancelButtonText: {
    color: ColorScheme.SecondaryTextColor,
    fontSize: 16,
    fontWeight: "600",
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
  linearGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 500,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    bannerHeader: {
        height: 65,
        marginTop: 30,
        marginBottom: 10,
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
    actionButtonShiny: {
        backgroundColor: ColorScheme.MainColor,
        borderWidth: 3,
        borderColor: "#CC0000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
});

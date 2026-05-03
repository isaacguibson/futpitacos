import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "@/components/text";
import ColorScheme from "@/components/ui/color-scheme";
import globalStyles from "@/constants/globalStyles";
import TeamBadge from "@/components/TeamBadge";
import MatchStatusBadge from "@/components/MatchStatusBadge";
import FloatingCardSlot from "@/components/FloatingCardSlot";
import Match from "@/models/Match";
import Partida from "@/models/Partida";
import StatusPartidaEnum from "@/models/StatusPartidaEnum";
import TipoRaridade from "@/models/TipoRaridade";
import Pitacard from "@/models/Pitacard";

const Text = AppText;

interface MatchCardProps {
  partida: Partida;
  onPress: () => void;
}

export default function MatchCard({ partida, onPress }: MatchCardProps) {
  const isFinished = partida.status === StatusPartidaEnum.FINALIZADA.id;

  function obterPitacardDoIndex(index: number): Pitacard | null {
    if (!partida.palpite?.pitacards) return null;
    return partida.palpite.pitacards[index] || null;
  }

  function obterCorPitacardIndex(index: number): string {
    const pitacard = obterPitacardDoIndex(index);
    if (!pitacard) return ColorScheme.PitacardVazia;
    switch (pitacard.tipoRaridade) {
      case TipoRaridade.COMUM.id:
        return ColorScheme.PitacardComum;
      case TipoRaridade.RARA.id:
        return ColorScheme.PitacardRaro;
      case TipoRaridade.EPICA.id:
        return ColorScheme.PitacardEpico;
      default:
        return ColorScheme.PitacardVazia;
    }
  }

  function obterBordaPitacardIndex(index: number): string {
    const pitacard = obterPitacardDoIndex(index);
    if (!pitacard) return ColorScheme.PitacardVazia;
    switch (pitacard.tipoRaridade) {
      case TipoRaridade.COMUM.id:
        return ColorScheme.BordaPitacardComum;
      case TipoRaridade.RARA.id:
        return ColorScheme.BordaPitacardRaro;
      case TipoRaridade.EPICA.id:
        return ColorScheme.BordaPitacardEpico;
      default:
        return ColorScheme.PitacardVazia;
    }
  }

  return (
    <View style={globalStyles.cardDark}>
      {/* Inner shadow overlay for convex relief */}
      <View style={globalStyles.cardInnerShadow} pointerEvents="none" />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <View style={globalStyles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: ColorScheme.WhiteColor }}>22/05/2026 - 15h00</Text>
        </View>
        <View
          style={[
            globalStyles.badge,
            {
              backgroundColor: partida.palpite 
                ? ColorScheme.GreenBadgeBackgroundColor
                : ColorScheme.SecondaryBadgeBackgroundColor,
              borderColor: partida.palpite
                ? ColorScheme.GreenBadgeBackgroundText
                : ColorScheme.SecondaryTextColor,
            },
          ]}
        >
          <View style={globalStyles.badgeShinyHighlight} pointerEvents="none" />
          <Text
            style={[
              globalStyles.badgeText,
              {
                color: partida.palpite
                  ? ColorScheme.GreenBadgeBackgroundText
                  : ColorScheme.SecondaryTextColor,
              },
            ]}
          >
            {partida.palpite ? "Palpitado" : "Sem palpite"}
          </Text>
        </View>
      </View>

      <View style={globalStyles.dividerThick} />

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <View style={globalStyles.cardBody}>
        <LinearGradient
          colors={[ColorScheme.CardBackgroundColor, ColorScheme.CardLinearBackColor]}
          style={styles.linearGradient}
        />
        <View style={globalStyles.teamsRow}>
          <View style={globalStyles.teamContainer}>
            <TeamBadge colors={partida.clubeCasa?.cores} />
            <Text style={globalStyles.teamName} numberOfLines={2}>
              {partida.clubeCasa?.nome}
            </Text>
          </View>

          <View style={globalStyles.scoresCenter}>
            <View style={globalStyles.scoreContainer}>
              <Text style={globalStyles.scoreText}>
                {isFinished ? partida.golsCasa : "-"}
              </Text>
              <Text style={globalStyles.vsText}>X</Text>
              <Text style={globalStyles.scoreText}>
                {isFinished ? partida.golsVisitante : "-"}
              </Text>
            </View>
            {partida.palpite && (
              <View
                style={[
                  styles.guessPalpiteBadge,
                  {
                    backgroundColor: isFinished
                      ? partida.palpite.golsCasa === partida.golsCasa &&
                        partida.palpite.golsVisitante === partida.golsVisitante
                        ? ColorScheme.GreenBadgeBackgroundColor
                        : ColorScheme.RedBadgeBackgroundColor
                      : ColorScheme.SecondaryBadgeBackgroundColor,
                    borderColor: isFinished
                      ? partida.palpite.golsCasa === partida.golsCasa &&
                        partida.palpite.golsVisitante === partida.golsVisitante
                        ? ColorScheme.GreenBadgeBackgroundText
                        : ColorScheme.RedBadgeBackgroundText
                      : ColorScheme.SecondaryTextColor,
                  },
                ]}
              >
                <View style={globalStyles.badgeShinyHighlight} pointerEvents="none" />
                <Text
                  style={[
                    styles.guessPalpiteText,
                    {
                      color: isFinished
                        ? partida.palpite.golsCasa === partida.golsCasa &&
                          partida.palpite.golsVisitante === partida.golsVisitante
                          ? ColorScheme.GreenBadgeBackgroundText
                          : ColorScheme.RedBadgeBackgroundText
                        : ColorScheme.SecondaryTextColor,
                    },
                  ]}
                >
                  Palpite: {partida.palpite.golsCasa} – {partida.palpite.golsVisitante}
                </Text>
              </View>
            )}
          </View>

          <View style={globalStyles.teamContainer}>
            <TeamBadge colors={partida.clubeVisitante?.cores} />
            <Text style={globalStyles.teamName} numberOfLines={2}>
              {partida.clubeVisitante?.nome}
            </Text>
          </View>
        </View>

        <View style={globalStyles.statusRow}>
          <MatchStatusBadge status={partida.status??0} />
        </View>
      </View>

      <View style={globalStyles.dividerThick} />

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <View style={styles.cardFooter}>
        <View style={globalStyles.cardsRow}>
          <FloatingCardSlot
            active={obterPitacardDoIndex(0) !== null}
            bgColor={obterCorPitacardIndex(0)}
            borderColor={obterBordaPitacardIndex(0)}
            glowColor={ColorScheme.PitacardComum}
            delay={0}
          >
            <View style={globalStyles.cardSlotHighlight} />
          </FloatingCardSlot>
          <FloatingCardSlot
            active={obterPitacardDoIndex(1) !== null}
            bgColor={obterCorPitacardIndex(1)}
            borderColor={obterBordaPitacardIndex(1)}
            glowColor={ColorScheme.PitacardRaro}
            delay={150}
          >
            <View style={globalStyles.cardSlotHighlight} />
          </FloatingCardSlot>
          <FloatingCardSlot
            active={obterPitacardDoIndex(2) !== null}
            bgColor={obterCorPitacardIndex(2)}
            borderColor={obterBordaPitacardIndex(2)}
            glowColor={ColorScheme.PitacardEpico}
            delay={300}
          >
            <View style={globalStyles.cardSlotHighlight} />
          </FloatingCardSlot>
        </View>

        <TouchableOpacity
          style={[globalStyles.actionButton, globalStyles.actionButtonShiny]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={globalStyles.shinyHighlight} />
          <Text style={[globalStyles.actionButtonText, { color: "#FFFFFF" }]}>
            Palpitar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  guessPalpiteBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
  },
  guessPalpiteText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
});

import ColorScheme from "@/components/ui/color-scheme";
import AppText from "@/components/text";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Match from "@/models/Match";
import Partida from "@/models/Partida";
import PartidasService from "@/services/PartidasService";
import globalStyles from "@/constants/globalStyles";
import MatchCard from "@/components/MatchCard";
import StatusPartidaEnum from "@/models/StatusPartidaEnum";
import TipoRaridade from "@/models/TipoRaridade";

const Text = AppText;

// ── Tela principal ─────────────────────────────────────────────────────────────

export default function MatchListScreen() {
  const router = useRouter();
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPartidas = (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    const service = new PartidasService();
    service.getPartidas().then((data) => {
      setPartidas((data as Partida[]));
    }).finally(() => {
      setLoading(false);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    fetchPartidas();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[globalStyles.safeArea, globalStyles.centered]}>
        <ActivityIndicator size="large" color={ColorScheme.MainColor} />
      </SafeAreaView>
    );
  }

  const navigateToDetail = (partida: Partida) => {
    router.push({
      pathname: "/pages/matchdetail",
      params: {
        id: partida.id,
        homeTeamName: partida.clubeCasa?.nome,
        homeTeamColors: JSON.stringify(partida.clubeCasa?.cores),
        awayTeamName: partida.clubeVisitante?.nome,
        awayTeamColors: JSON.stringify(partida.clubeVisitante?.cores),
        status: partida.status,
        hasGuess: String(partida.palpite ? true : false),
        homeScore: String(partida.golsCasa ?? 0),
        awayScore: String(partida.golsVisitante ?? 0),
        guessHome: String(partida.palpite?.golsCasa ?? 0),
        guessAway: String(partida.palpite?.golsVisitante ?? 0),
        cardCommon: String(partida.palpite?.pitacards?.[0]?.tipoRaridade === TipoRaridade.COMUM.id ? 1 : 0),
        cardRare: String(partida.palpite?.pitacards?.[1]?.tipoRaridade === TipoRaridade.RARA.id ? 1 : 0),
        cardEpic: String(partida.palpite?.pitacards?.[2]?.tipoRaridade === TipoRaridade.EPICA.id ? 1 : 0),
      },
    });
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["top"]}>
      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <MatchCard partida={item} onPress={() => navigateToDetail(item)} />
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
        contentContainerStyle={globalStyles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchPartidas(true)}
            tintColor={ColorScheme.MainColor}
            colors={[ColorScheme.MainColor]}
          />
        }
      />
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
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
});

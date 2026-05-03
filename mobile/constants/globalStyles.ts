import { StyleSheet } from "react-native";
import ColorScheme from "@/components/ui/color-scheme";

/**
 * Estilos globais reutilizáveis em toda a aplicação.
 * Importe apenas o que precisar em cada componente/tela.
 */
const globalStyles = StyleSheet.create({
  // ── Layout ────────────────────────────────────────────────────────────────────

  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // ── Header de tela ────────────────────────────────────────────────────────────

  screenHeader: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },

  screenHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  screenTitleSmall: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorScheme.TextColor,
  },

  // ── Botão voltar ──────────────────────────────────────────────────────────────

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

  // ── Card ──────────────────────────────────────────────────────────────────────

  card: {
    backgroundColor: ColorScheme.BackgroundColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorScheme.LineColor,
    overflow: "hidden",
  },

  cardDark: {
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

  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  // ── Divisor ───────────────────────────────────────────────────────────────────

  divider: {
    height: 1,
    backgroundColor: ColorScheme.LineColor,
  },

  dividerThick: {
    height: 3,
    backgroundColor: ColorScheme.LineCardColor,
  },

  // ── Badge (palpite / status) ──────────────────────────────────────────────────

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
  },

  badgeShinyHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },

  badgeTextSmall: {
    fontSize: 11,
    fontWeight: "600",
  },

  // ── Times / Placar ────────────────────────────────────────────────────────────

  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  teamContainer: {
    alignItems: "center",
    width: 80,
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
    color: ColorScheme.WhiteColor,
  },

  // ── Cartas (slots) ────────────────────────────────────────────────────────────

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

  // ── Botão de ação (shiny) ─────────────────────────────────────────────────────

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

  // ── Linha de status da partida ────────────────────────────────────────────────

  statusRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  matchStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },

  matchStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
});

export default globalStyles;

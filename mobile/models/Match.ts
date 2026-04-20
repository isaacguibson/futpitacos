import Team from "@/models/Team";

export default interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore?: number;
    awayScore?: number;
    guessHome?: number;
    guessAway?: number;
    status: "Em espera" | "Iniciado" | "Finalizado";
    hasGuess: boolean;
    cards: {
        common: boolean;
        rare: boolean;
        epic: boolean;
    };
}
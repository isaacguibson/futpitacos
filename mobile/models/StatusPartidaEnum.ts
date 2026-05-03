import ColorScheme from "@/components/ui/color-scheme";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default Object.freeze({
    EM_ESPERA: {id: 1, nome: "Em Espera", bg: ColorScheme.SecondaryBadgeBackgroundColor, text: ColorScheme.SecondaryTextColor},
    EM_ANDAMENTO: {id: 2, nome: "Em Andamento", bg: ColorScheme.GreenBadgeBackgroundColor, text: ColorScheme.GreenBadgeBackgroundText},
    FINALIZADA: {id: 3, nome: "Finalizada", bg: ColorScheme.RedBadgeBackgroundColor, text: ColorScheme.RedBadgeBackgroundText},
    getById(id: number) {
        const values = Object.values(this) as any[];
        for (const val of values) {
            if (val.id === id) return val;
        }
        return this.EM_ESPERA;
    }
});


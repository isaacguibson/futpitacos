# Usando a Fonte Schoolbell do Google Fonts

## Como foi configurado?

A fonte **Schoolbell** do Google Fonts foi adicionada à aplicação usando `expo-font`. 

### Arquivos modificados:
1. **`app/_layout.tsx`** - Carrega a fonte na inicialização da aplicação
2. **`hooks/use-fonts.ts`** - Hook helper para carregar fontes (opcional)

## Como usar a fonte nos componentes

Para usar a fonte Schoolbell em qualquer Text ou componente com estilo, adicione a propriedade `fontFamily`:

```typescriptreact
import { Text, StyleSheet } from 'react-native';

export default function MyComponent() {
  return <Text style={styles.schoolbellText}>Olá Mundo!</Text>;
}

const styles = StyleSheet.create({
  schoolbellText: {
    fontFamily: 'Schoolbell',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## Exemplos de uso

### Usando no título da página:
```typescriptreact
<Text style={{ fontFamily: 'Schoolbell', fontSize: 32, fontWeight: 'bold' }}>
  Bem-vindo ao FutPitacos
</Text>
```

### Usando em um badge:
```typescriptreact
<View style={styles.badge}>
  <Text style={{ fontFamily: 'Schoolbell', fontSize: 14 }}>
    Palpite: 2 - 1
  </Text>
</View>
```

### Usando em um botão:
```typescriptreact
<TouchableOpacity style={styles.button}>
  <Text style={{ fontFamily: 'Schoolbell', fontSize: 16, fontWeight: 'bold' }}>
    Palpitar
  </Text>
</TouchableOpacity>
```

## Mais sobre a fonte

- **Nome**: Schoolbell
- **Fonte**: Google Fonts
- **URL**: https://fonts.google.com/specimen/Schoolbell
- **Estilo**: Handwriting/Script
- **Casos de uso**: Títulos, destaque, elementos decorativos

## Desempenho

A fonte é carregada na inicialização da aplicação (no `_layout.tsx`) de forma assíncrona, sem bloquear a UI. A tela de splash é mantida visível enquanto a fonte está sendo carregada.

## Se precisar mudar a fonte

Para usar uma fonte diferente do Google Fonts, simplesmente altere o URL no arquivo `app/_layout.tsx`:

```typescript
await Font.loadAsync({
  'NovaFonte': 'https://fonts.gstatic.com/s/...',
});
```

E use-a nos componentes com `fontFamily: 'NovaFonte'`.


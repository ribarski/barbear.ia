import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
// Se você quiser um tema escuro como base, importe MD3DarkTheme
// import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme, // Estende o tema claro padrão do MD3
  // Você pode especificar a versão do MD3, se necessário, mas geralmente não é preciso.
  // version: 3,
  colors: {
    ...DefaultTheme.colors, // Mantém as cores padrão e sobrescreve/adiciona as que você quer
    primary: '#6200EE', // Cor primária principal (ex: botões, abas ativas)
    onPrimary: '#FFFFFF', // Cor do texto/ícones em cima da cor primária

    primaryContainer: '#EADDFF', // Um tom mais claro ou container para elementos primários
    onPrimaryContainer: '#21005D', // Cor do texto/ícones em cima do primaryContainer

    secondary: '#03DAC6', // Cor secundária (ex: Floating Action Buttons, seleções)
    onSecondary: '#000000', // Cor do texto/ícones em cima da cor secundária

    secondaryContainer: '#CCF7F1',
    onSecondaryContainer: '#00201D',

    tertiary: '#03A9F4', // Uma terceira cor, se necessário
    onTertiary: '#FFFFFF',

    tertiaryContainer: '#C9E6FF',
    onTertiaryContainer: '#001E2F',

    error: '#B00020', // Cor para erros
    onError: '#FFFFFF',

    errorContainer: '#F8DADA',
    onErrorContainer: '#4F000B',

    background: '#F5F5F5', // Cor de fundo principal do app
    onBackground: '#1C1B1F', // Cor do texto/ícones em cima da cor de fundo

    surface: '#FFFFFF', // Cor de superfícies de componentes como Cards, Menus
    onSurface: '#1C1B1F', // Cor do texto/ícones em cima de superfícies

    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',

    outline: '#79747E',
    // ... e outras cores que você queira personalizar do esquema MD3.
    // Consulte a documentação do react-native-paper para todas as opções de cores do MD3.
  },
  // Você também pode personalizar fontes, arredondamento de bordas, etc.
  // Exemplo de fontes (requer que as fontes estejam carregadas no seu projeto):
  /*
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'SeuAppFont-Regular', // Substitua pelo nome da sua fonte
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SeuAppFont-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'SeuAppFont-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SeuAppFont-Thin',
      fontWeight: 'normal',
    },
  },
  */
  // Exemplo de arredondamento
  /*
  roundness: 4, // Valor padrão é 4. Aumente para bordas mais arredondadas.
  */
};
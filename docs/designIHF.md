# 🎨 Design System — Impact Hub Floripa

> **Fonte de Verdade** para a identidade visual do Impact Hub Floripa.
> Tokens extraídos do **código-fonte CSS** de [floripa.impacthub.net](https://floripa.impacthub.net/) em 15/09/2026.
> Tema: **Labbo Digital** (`labbotheme`) · Framework: **Bootstrap 5** · Cache: **WP Rocket**

> [!CAUTION]
> **Revisão v2 (15/09/2026)**: Este documento foi completamente reescrito com base no CSS inline
> extraído via `wpr-usedcss` (WP Rocket). Todas as variáveis CSS, cores, fontes e componentes
> agora refletem os valores **reais** do código-fonte, e não estimativas visuais.

---

## 1. Paleta de Cores

### 1.1 Variáveis CSS Reais do Tema (`labbotheme`)

Estas são as variáveis declaradas no `:root` do tema, **exatamente como aparecem no código-fonte**:

```css
:root {
  /* Cores principais */
  --branco:         #ffffff;
  --branco-2:       #f7f6f2;      /* Off-white quente */
  --vermelho:       #812926;      /* Bordô/borgonha — COR PRIMÁRIA DA MARCA */
  --preto:          #000000;
  --preto-2:        #333;         /* Preto suave (bordas escuras, footer lines) */
  --preto-3:        #212020;      /* Preto principal (backgrounds escuros, footer) */

  /* Blues — Azuis (SIM, a marca usa azul) */
  --azul:           #1c395c;      /* Azul-marinho corporativo (Bento Grid métricas) */
  --azul-2:         #41bed0;      /* Ciano/Teal vibrante (CTAs de download, formulários) */
  --azul-claro:     #e1e5ea;      /* Azul cinza claro (badges de categoria) */
  --azul-claro-2:   #abb5c2;      /* Azul cinza médio (texto em cards azuis, subtítulos) */
  --azul-claro-3:   #cfeff3;      /* Ciano pastel (ícones circulares, badges) */
  --azul-claro-4:   #e2f5f8;      /* Ciano super claro (fundo de card métrico) */

  /* Tons quentes */
  --laranja:        #fde2ce;      /* Pêssego claro (texto em cards bordô, destaques) */
  --marrom-claro:   #f2eae9;      /* Bege rosado (backgrounds sutis) */

  /* Cinzas */
  --cinza:          #c1c1c1;      /* Cinza médio (placeholders, texto muted do footer) */
  --cinza-escuro:   #414141;      /* Cinza escuro */
  --cinza-escuro-2: #484848;      /* Cinza escuro alternativo */
  --cinza-claro:    #f3f4f5;      /* Fundo cinza claro (seção materiais, depoimentos) */
  --cinza-claro-2:  #e5e5e5;      /* Bordas e divisores */

  /* Tipografia */
  --poppins:        "Poppins", sans-serif;
  --GT-Walsheim:    "GT Walsheim", sans-serif;
}
```

> [!IMPORTANT]
> Também presente no CSS do Incuca (plugin WordPress):
> `--incuca-primary-color: #972f27;` — Este é um tom de vermelho **diferente** do `--vermelho` e aparece em contextos do plugin, não do tema visual.

### 1.2 Cores da Marca — Mapeamento Semântico para v2

| Token v2                  | Valor Real        | Variável Original    | Aplicação no Site                                      |
|---------------------------|-------------------|----------------------|--------------------------------------------------------|
| `--ihf-brand-primary`     | `#812926`         | `--vermelho`         | Logo, títulos, botões, links de nav, CTA principal     |
| `--ihf-brand-forest`      | `#063b27`         | (inline no HTML)     | Fundo da seção Hub de Inovação Climática               |
| `--ihf-brand-lime`        | `#b9ee8d`         | (inline no CSS)      | Badge "PROGRAMA DESTAQUE", hover de links verdes       |
| `--ihf-brand-navy`        | `#1c395c`         | `--azul`             | Bento Grid de métricas, seção estatísticas             |
| `--ihf-brand-cyan`        | `#41bed0`         | `--azul-2`           | Botões de download, CTAs de formulário, accents        |
| `--ihf-brand-peach`       | `#fde2ce`         | `--laranja`          | Texto em cards bordô, acentos quentes                  |

### 1.3 Superfícies e Fundos

| Token v2                  | Valor Real                         | Variável Original   | Aplicação                                    |
|---------------------------|------------------------------------|---------------------|----------------------------------------------|
| `--ihf-bg-primary`        | `#f7f6f2`                          | `--branco-2`        | Fundo principal do site (off-white quente)   |
| `--ihf-bg-white`          | `#ffffff`                          | `--branco`          | Cards, header, áreas de conteúdo             |
| `--ihf-bg-light`          | `#f3f4f5`                          | `--cinza-claro`     | Seção materiais, depoimentos, alternâncias   |
| `--ihf-bg-dark`           | `#212020`                          | `--preto-3`         | Footer principal, seção blog/conteúdos       |
| `--ihf-bg-dark-line`      | `#333`                             | `--preto-2`         | Bordas/divisores no footer, cards escuros    |
| `--ihf-bg-hero-card`      | `rgba(255, 255, 255, 0.1)`         | (inline)            | Glassmorphism **branco** com blur(12px)      |
| `--ihf-bg-navy-card`      | `#1c395c`                          | `--azul`            | Bento box de estatísticas                    |
| `--ihf-bg-cyan-card`      | `#e2f5f8`                          | `--azul-claro-4`    | Card métrico de destaque                     |

> [!WARNING]
> **Correção crítica**: O card do Hero **NÃO** é glassmorphism escuro.
> O CSS real é `background: rgba(255,255,255,.1); backdrop-filter: blur(12px)` — glass branco sobre imagem.
> No mobile, o fallback é `background: var(--cinza-claro)` com texto em `var(--preto-3)`.

### 1.4 Cores de Texto

| Token v2                  | Valor Real                     | Variável Original   | Aplicação                                       |
|---------------------------|--------------------------------|---------------------|-------------------------------------------------|
| `--ihf-text-primary`      | `#212020`                      | `--preto-3`         | Texto principal em fundo claro                  |
| `--ihf-text-heading`      | `#812926`                      | `--vermelho`        | Títulos, links de navegação                     |
| `--ihf-text-body`         | `#333`                         | `--preto-2`         | Texto de corpo/parágrafo                        |
| `--ihf-text-body-alt`     | `#484848`                      | `--cinza-escuro-2`  | Texto de aceitação, footnotes                   |
| `--ihf-text-muted`        | `#c1c1c1`                      | `--cinza`           | Placeholders, texto do footer, labels muted     |
| `--ihf-text-on-dark`      | `#ffffff`                      | `--branco`          | Texto sobre fundo escuro                        |
| `--ihf-text-on-brand`     | `#fde2ce`                      | `--laranja`         | Texto sobre cards bordô (métricas)              |
| `--ihf-text-link-nav`     | `#812926`                      | `--vermelho`        | Links de navegação header (GT Walsheim 700)     |

### 1.5 Bordas e Divisores

| Token v2                  | Valor Real                     | Aplicação                                        |
|---------------------------|--------------------------------|--------------------------------------------------|
| `--ihf-border-light`      | `#e5e5e5`  (`--cinza-claro-2`) | Divisores em fundo claro, bordas de input        |
| `--ihf-border-dark`       | `#333`  (`--preto-2`)          | Divisores no footer e seções escuras             |
| `--ihf-border-dark-subtle`| `rgba(255, 255, 255, 0.1)`     | Bordas de itens de menu móvel                    |
| `--ihf-border-input`      | `1.5px solid #e5e5e5`          | Bordas de campos de formulário                   |

---

## 2. Tipografia

### 2.1 Famílias Tipográficas

O site utiliza **duas famílias** principais:

```css
/* Títulos, botões, UI */
--poppins: "Poppins", sans-serif;

/* Corpo, descrições, labels, footer */
--GT-Walsheim: "GT Walsheim", sans-serif;
```

| Fonte          | Tipo             | Pesos Carregados | Carregamento                                                                          |
|----------------|------------------|------------------|---------------------------------------------------------------------------------------|
| **Poppins**    | Google Fonts     | 400, 500, 600, 700 | CDN do cache WP (`/wp-content/cache/fonts/1/google-fonts/fonts/s/poppins/`)        |
| **GT Walsheim**| Font Custom Local| 400, 600, 700    | Arquivo local (`/wp-content/themes/labbotheme/assets/fonts/GT-Walsheim/`)            |

#### Regras de `@font-face` reais (GT Walsheim):
```css
@font-face {
  font-family: "GT Walsheim";
  src: url(".../GTWalsheim-Regular.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "GT Walsheim";
  src: url(".../GTWalsheimMedium.woff2") format("woff2");
  font-weight: 600; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "GT Walsheim";
  src: url(".../GTWalsheimBold.woff2") format("woff2");
  font-weight: 700; font-style: normal; font-display: swap;
}
```

> [!CAUTION]
> **Correção crítica**: A versão anterior deste documento dizia "Montserrat".
> **ERRADO**. A fonte principal é **Poppins** (headings/UI) e **GT Walsheim** (corpo/labels).
> Montserrat **não aparece** em nenhum lugar do código-fonte.

### 2.2 Escala Tipográfica e Hierarquia (Dados Reais do CSS)

| Elemento             | Font Family   | Desktop           | Weight | Line Height | Letter Spacing | Transform   |
|----------------------|---------------|-------------------|--------|-------------|----------------|-------------|
| **Watermark**        | GT Walsheim   | `160.782px`       | `400`  | `150.733px` | `-4.02px`      | `uppercase` |
| **H2 Seção**         | Poppins       | `48px`            | `700`  | `48px`      | `-0.96px`      | `none`      |
| **H2 Alternativo**   | Poppins       | `36px`            | `700`  | `42px`      | `-0.72px`      | `none`      |
| **Hero CTA Title**   | Poppins       | `36px`            | `700`  | `42px`      | `-0.72px`      | `none`      |
| **Ticker H3**        | Poppins       | `72px`            | `400`  | `70px`      | `-1.44px`      | `none`      |
| **Card Title H2**    | Poppins       | `36px`            | `400`  | `42px`      | `-0.72px`      | `none`      |
| **Card Unit Title**  | Poppins       | `20px`            | `700`  | `26px`      | `normal`       | `none`      |
| **Typing (header)**  | Poppins       | `26px`            | `700`  | `34px`      | `-0.9px`       | `none`      |
| **Nav Link**         | GT Walsheim   | `16px`            | `700`  | `22px`      | `normal`       | `none`      |
| **Body (seção)**     | GT Walsheim   | `18px`            | `600`  | `24px`      | `normal`       | `none`      |
| **Body (p)**         | GT Walsheim   | `14px`            | `400`  | `20px`      | `normal`       | `none`      |
| **Label/Badge**      | GT Walsheim   | `10px`            | `700`  | `normal`    | `3px`          | `uppercase` |
| **Counter Número**   | System        | `60px`            | `400`  | `60px`      | `-1.2px`       | `none`      |
| **Footer text**      | GT Walsheim   | `14px`            | `400`  | `20px`      | `normal`       | `none`      |

### 2.3 Estilos de Texto Especiais

#### Watermark "IMPACTO QUE IMPORTA"

```css
.banner .container-fluid h1 {
  font-size: 160.782px;
  font-weight: 400;         /* Regular, NÃO ExtraBold */
  line-height: 150.733px;
  letter-spacing: -4.02px;
  text-transform: uppercase;
  color: var(--preto-3);    /* #212020 — Preto */
  font-family: var(--GT-Walsheim);
}
/* Efeito split-color: span com metade branca sobreposta */
.banner .container-fluid h1 span {
  color: var(--branco);     /* #ffffff */
  position: absolute;
  top: 0; right: 0;
  height: 50%;              /* Corta na metade → metade escura, metade branca */
  overflow: hidden;
  font-family: var(--GT-Walsheim);
}
```

> [!NOTE]
> O texto NÃO usa `text-stroke` ou `outlined`. O efeito visual de "bicolor" é obtido com um
> `<span>` branco posicionado absolutamente com `height: 50%` e `overflow: hidden`, criando
> um corte horizontal que deixa a metade superior branca (sobre a imagem) e inferior escura.

#### Badge "PROGRAMA DESTAQUE"

```css
.program .container-fluid .col-lg-7 span {
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: var(--GT-Walsheim);
  /* Cor definida inline: background-color: #b9ee8d */
}
```

#### Ticker / Marquee Tipográfico

```css
.beneficts-slider h3 {
  font-size: 72px;
  font-weight: 400;
  line-height: 70px;
  letter-spacing: -1.44px;
  text-align: center;
  margin-bottom: 10px;
}
.benefct-dot {
  font-size: 72px;
  color: var(--vermelho);   /* #812926 */
  margin-inline: 50px;
}
```

Conteúdo: `Conexões • Negócios • Inclusão Produtiva • Coworking • Inovação • Aceleração • Empreendedorismo • Ecossistemas • Hub de inovação`

---

## 3. Espaçamento (Spacing)

### 3.1 Escala de Espaçamento (Padronizada em Grade de 4px com Equivalência em Rem)

| Token             | Valor (px) | Valor (rem) | Aplicação Real no Site e na Aplicação                            |
|-------------------|------------|-------------|-----------------------------------------------------------------|
| `--ihf-space-1`   | `4px`      | `0.25rem`   | Gaps mínimos, separação de badges, micro-ícones                  |
| `--ihf-space-2`   | `8px`      | `0.5rem`    | Padding vertical de badges, gap entre ícone e texto (`gap: 8px`) |
| `--ihf-space-3`   | `12px`     | `0.75rem`   | Padding interno de inputs compactos, gap de botões (`gap: 12px`) |
| `--ihf-space-4`   | `16px`     | `1.0rem`    | Padding padrão de cards internos, gutter secundário (`gap: 16px`)|
| `--ihf-space-5`   | `20px`     | `1.25rem`   | Padding vertical de botões primários (`padding: 20px 40px`)     |
| `--ihf-space-6`   | `24px`     | `1.5rem`    | Margem entre blocos, padding do container (`--bs-gutter-x`)      |
| `--ihf-space-7`   | `28px`     | `1.75rem`   | Padding lateral de botões médios e tags de destaque              |
| `--ihf-space-8`   | `32px`     | `2.0rem`    | Padding de cards (`.number1 { padding: 30px 32px }`)            |
| `--ihf-space-10`  | `40px`     | `2.5rem`    | Padding horizontal de botões e boxes (`padding: 30px 40px`)     |
| `--ihf-space-12`  | `48px`     | `3.0rem`    | Gap do footer (`.container-fluid { gap: 48px }`)                |
| `--ihf-space-16`  | `64px`     | `4.0rem`    | Padding da CTA banner (`padding: 56px 64px 48px`)               |
| `--ihf-space-20`  | `80px`     | `5.0rem`    | Padding de seções escuras (`.container-fluid { padding: 80px }`)|
| `--ihf-space-32`  | `140px`    | `8.75rem`   | Padding vertical de grandes blocos (`padding: 140px 0`)         |

> [!NOTE]
> A escala acima harmoniza as medidas utilizadas no código-fonte CSS do tema com a arquitetura de tokens
> do **iHubFiscal**, cobrindo expressamente os valores de padding de botões (`12px`, `20px`, `28px`, `40px`)
> e garantindo conversão fluida para unidades relativas (`rem`).

### 3.2 Grid e Container

```css
/* Container principal */
.container-1465px {
  width: 100%;
  max-width: calc(1465px + 1.5rem);     /* NÃO 1200px! */
  padding: 0 calc(1.5rem / 2);
  margin: 0 auto;
}

/* Container expandido (footer, seções full) */
#main-footer .container-fluid {
  max-width: 1615px;
}

/* Grid Bootstrap 5 (col-2, col-4, col-5, col-6, col-10, col-12) */
/* Gutter padrão: --bs-gutter-x: 1.5rem (24px) */
```

- Framework: **Bootstrap 5** (grid 12 colunas, flexbox, breakpoints padrão)
- Cards de programas: grid de **2 colunas** no desktop (`grid-template-columns: auto auto; grid-gap: 72px`)
- Seções de coworkings: layout em **4 colunas** com staggers verticais
- Logos de parceiros: **carrossel horizontal** (Slick Carousel)
- Hero: **Swiper.js** com slides full-width

---

## 4. Componentes UI

### 4.1 Botões (Buttons & CTAs) — Estilos Reais do CSS

#### Botão Primário "Saiba Mais" (`.btn-learn-more`)
```css
.btn-learn-more {
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 100px;                 /* Pill shape */
  background: var(--vermelho, #812926);
  color: var(--branco, #fff);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  width: fit-content;
  text-decoration: none;
  transition: .3s ease-in-out;
}
.btn-learn-more:hover {
  color: var(--branco);
}
/* Ícone seta desliza 10px para a direita */
.btn-learn-more:hover img {
  transform: translateX(10px);
}
```

#### Botão Outline "Entre em Contato" (`.btn-join`)
```css
.btn-join {
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 100px;
  border: 1.5px solid var(--vermelho, #812926);
  color: var(--vermelho, #812926);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  width: fit-content;
  text-decoration: none;
  transition: .3s ease-in-out;
}
.btn-join svg path {
  transition: .3s ease-in-out;
  stroke: var(--vermelho, #812926);
}
.btn-join:hover {
  border: 1.5px solid var(--preto-3, #212020);
  color: var(--preto-3, #212020);        /* Muda para preto, NÃO para bordô sólido */
}
.btn-join:hover svg path {
  stroke: var(--preto-3);
}
```

#### Botão Padrão Genérico (`.default-btn`)
```css
.default-btn {
  font-family: var(--poppins);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  border-radius: 100px;
  border: 1px solid transparent;
  padding: 20px 40px;
  gap: 20px;
  transition: all .3s;
  display: inline-flex;
}
.default-btn > svg { width: 24px; height: 24px; transition: all .3s; }

/* Variante Vermelha */
.default-btn.btn-vermelho {
  color: var(--branco);
  background-color: var(--vermelho);
}
.default-btn.btn-vermelho:hover {
  color: var(--azul);               /* Muda para AZUL MARINHO */
  border: 1px solid var(--azul);
  background-color: var(--branco);  /* Inversão completa */
}

/* Variante Thin (headers, menores) */
.default-btn.btn-thin {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  padding: 15px 20px;
  gap: 10px;
}
```

#### Botão de Download (`.btn-download`)
```css
.btn-download {
  display: flex;
  padding: 14px 22px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(--azul-2, #41bed0);   /* Ciano, não bordô! */
  color: var(--branco, #fff);
  font-family: var(--GT-Walsheim);
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
}
.btn-download:hover img {
  animation: 1s infinite downloadAnimation;
}
@keyframes downloadAnimation {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}
```

#### Botão CTA Header ("Entre em Contato")
```css
.top-menu li.entre-em-contato a {
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: .5px;
  color: var(--branco);
  background-color: var(--vermelho);
  border-radius: 100px;
  border: 1px solid var(--vermelho);
  padding: 8px 20px;
}
.top-menu li.entre-em-contato a:hover {
  color: var(--vermelho);
  background-color: transparent;         /* Inversão: bordô → transparente */
}
```

#### Botão Header Outline ("Impacta Mais")
```css
.top-menu > li:nth-child(8) > a {
  border: 1px solid #393939;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: .5px;
  color: #393939;
  border-radius: 100px;
  padding: 8px 20px;
}
.top-menu > li:nth-child(8) > a:hover {
  padding: 8px 20px;
  background-color: #393939;
  color: #fff;
}
```

#### Links de Lista Verde (Hub Inovação Climática)
```css
.program-content a {
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  text-decoration: none;
  transition: .3s ease-in-out;
  /* color e border-bottom definidos inline: color: #b9ee8d; border-bottom: 1.5px solid #b9ee8d */
}
.program-content a:hover {
  background-color: #b9ee8d;            /* Lime preenche */
  color: #fff !important;               /* Texto fica branco */
}
.program-content a:hover svg {
  filter: brightness(0) invert(1) !important;
}
```

#### FAB "Acesso Rápido"
```css
.nav--button {
  position: fixed;
  bottom: 100px;
  right: 50px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  z-index: 666;
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  background: var(--vermelho);
  border: 3px solid var(--branco);
  cursor: pointer;
}
/* Ícone "+" vira "×" com rotação de 45° via checkbox hack */
.nav--checkbox:checked ~ .nav--button span {
  transform: rotate(45deg);
}
/* Tooltip "Acesso Rápido" abaixo */
.tooltip-access {
  font-size: 14px;
  font-weight: 700;
  font-family: var(--GT-Walsheim);
}
```

### 4.2 Navegação do Header

```css
/* Estilo padrão dos links de navegação */
.top-menu > li > a {
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  text-decoration: none;
  padding: 12px 0 10px;
  border-bottom: 2px solid var(--branco);   /* Invisível (branco sobre branco) */
  color: var(--vermelho);                    /* Bordô por padrão */
  font-family: var(--GT-Walsheim);
  transition: all .3s;
}
.top-menu > li:not(.entre-em-contato) > a:hover {
  color: var(--preto);                       /* Muda para preto */
  padding: 12px 0 10px;
  border-bottom: 2px solid var(--preto);     /* Underline aparece em preto */
}

/* Submenu dropdown */
.submenu {
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease, visibility .3s ease;
  position: absolute;
  top: 44px;
  right: 0;
  padding: 10px 24px;
}
.top-menu li:hover .submenu {
  opacity: 1;
  visibility: visible;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  background: var(--preto-3, #212020);       /* Dropdown escuro */
}
.submenu li a {
  color: var(--branco);
  font-family: var(--GT-Walsheim);
}
.submenu li a:hover {
  text-decoration: underline;
}
```

> [!WARNING]
> **Correção**: O hover dos nav links NÃO usa pseudo-elemento `::after` com underline animado.
> O efeito real é simples: `border-bottom: 2px solid var(--preto)` + `color: var(--preto)`.

---

## 5. Sombras (Shadows)

| Token                      | Valor                                  | Aplicação Real                           |
|----------------------------|----------------------------------------|------------------------------------------|
| `--ihf-shadow-none`        | `none`                                 | Reset                                    |
| `--ihf-shadow-fab`         | `0 0 10px rgba(0, 0, 0, .5)`          | FAB "Acesso Rápido"                      |
| `--ihf-shadow-bs-sm`       | `0 0.125rem 0.25rem rgba(0,0,0,.075)` | Bootstrap `--bs-box-shadow-sm`           |
| `--ihf-shadow-bs-md`       | `0 0.5rem 1rem rgba(0,0,0,.15)`       | Bootstrap `--bs-box-shadow`              |
| `--ihf-shadow-bs-lg`       | `0 1rem 3rem rgba(0,0,0,.175)`        | Bootstrap `--bs-box-shadow-lg`           |
| `--ihf-shadow-lity`        | `0 0 8px rgba(0, 0, 0, .6)`           | Modal Lity (lightbox de vídeo/imagem)    |

> [!NOTE]
> O tema `labbotheme` utiliza muito poucas sombras. As sombras são majoritariamente herdadas
> do **Bootstrap 5** (`--bs-box-shadow-*`). Cards de conteúdo não possuem sombra própria —
> usam `border: 1.5px solid var(--cinza-claro)` em vez disso.

---

## 6. Border Radius

| Token                      | Valor       | Aplicação Real                                     |
|----------------------------|-------------|---------------------------------------------------|
| `--ihf-radius-sm`          | `4px`       | Inputs de formulário                               |
| `--ihf-radius-md`          | `8px`       | Cards, containers, footer, imagens, dropdowns      |
| `--ihf-radius-lg`          | `16px`      | Badges/pills de categoria                          |
| `--ihf-radius-full`        | `100px`     | Botões (pill shape), FAB, badges circulares        |
| `--ihf-radius-circle`      | `50%`       | Ícones circulares, avatares                        |

> [!NOTE]
> O CSS real usa `border-radius: 100px` (não `9999px`) para o pill shape dos botões.
> É equivalente visualmente, mas o valor real do código-fonte é `100px`.

---

## 7. Transições e Animações

### 7.1 Durações e Easing

| Token                       | Valor                        | Aplicação                              |
|-----------------------------|------------------------------|----------------------------------------|
| `--ihf-transition-fast`     | `.15s ease-in-out`           | Nav links, dropdowns Bootstrap         |
| `--ihf-transition-normal`   | `.3s ease`                   | Botões, submenu, img hover             |
| `--ihf-transition-normal-io`| `.3s ease-in-out`            | Botões com efeito de entrada/saída     |
| `--ihf-transition-slide`    | `.5s cubic-bezier(.6,-.5,.4,1.5)` | Expansão dos sub-menus FAB      |
| `--ihf-transition-swiper`   | `.6s ease-in-out`            | Transição do carrossel Swiper          |
| `--ihf-transition-shiftnav` | `.5s transform`              | Menu móvel lateral (ShiftNav)          |

### 7.2 Animações por Componente

#### Botões
| Componente                 | Efeito no hover                                              | CSS                                   |
|----------------------------|--------------------------------------------------------------|---------------------------------------|
| **"Saiba Mais" (primário)**| Seta `→` desliza 10px para a direita                         | `transform: translateX(10px)`         |
| **"Entre em Contato" (outline)**| Cor muda para preto, stroke do SVG muda               | `color: var(--preto-3)`               |
| **CTA Header (bordô)**    | Inversão: fundo transparente, texto bordô                    | `background: transparent`             |
| **"Impacta Mais" (header)**| Inversão: fundo `#393939`, texto branco                      | `background-color: #393939`           |
| **Btn Vermelho (genérico)**| Inversão: fundo branco, texto/borda azul marinho             | `color/border: var(--azul)`           |
| **Download (ciano)**       | Ícone de download salta infinitamente                        | `@keyframes downloadAnimation`        |
| **Lista Verde (Climática)**| Fundo lime `#b9ee8d`, texto branco, SVG invertido            | `background-color: #b9ee8d`           |
| **FAB (+)**                | Rotação 45° (`+` → `×`) via checkbox CSS hack                | `transform: rotate(45deg)`            |

#### Navegação e Links
| Componente                | Efeito                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------|
| **Links do header**       | Cor muda de `var(--vermelho)` para `var(--preto)` + `border-bottom: 2px solid var(--preto)` |
| **Submenu dropdown**      | `opacity: 0 → 1` + `visibility: hidden → visible` (fade-in `0.3s ease`)                   |
| **Img-submenu chevron**   | `transform: rotate(180deg)` + fundo muda para `var(--preto-3)` + ícone fica branco          |
| **Links do footer**       | `text-decoration: underline` no hover                                                       |
| **Ícones sociais (footer)**| `opacity: .5` no hover (**apenas opacidade**, sem translateY ou scale)                     |

> [!WARNING]
> **Correção**: Ícones sociais do footer usam APENAS `opacity: .5` no hover.
> A versão anterior dizia `translateY(-3px) + scale(1.15)` — isso estava ERRADO.

#### Seções e Cards
| Componente                | Efeito                                                                       |
|---------------------------|-------------------------------------------------------------------------------|
| **Hero Banner**           | Carrossel Swiper com slides automáticos, transição `0.6s ease-in-out`        |
| **Fotos de programas**    | `filter: opacity(.5)` no hover                                               |
| **Depoimentos setas**     | Botões circulares bordô, `.slick-disabled` fica branco com borda cinza       |
| **Logos de Parceiros**    | Carrossel Slick com auto-scroll                                               |
| **Contadores Numéricos**  | Números grandes (`60px`) com animação de contagem via JS                      |
| **Ticker/Marquee**        | Scroll horizontal contínuo com CSS (`.beneficts-slider`)                      |

### 7.3 Keyframes Definidos

```css
@keyframes downloadAnimation {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

@keyframes linkAnimation {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px) translateX(4px); }
  100% { transform: translateY(0); }
}

@keyframes spin {
  0%   { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}
```

---

## 8. Ícones e Grafismos

### 8.1 Sistema de Ícones

O site utiliza **SVGs inline/customizados** e **FontAwesome 4** (via ShiftNav plugin).

| Ícone                  | Caminho Real                                              | Uso                                  |
|------------------------|-----------------------------------------------------------|--------------------------------------|
| Seta Direita (CTA)     | `/wp-content/themes/labbotheme/assets/svg/arrow-btn.svg`  | "Saiba mais →" / "Conheça nossas soluções →" |
| Seta Direita (CTA link)| `/wp-content/themes/labbotheme/assets/svg/arrow-right-cta.svg` | Links "Entre em contato →"      |
| Seta Esquerda          | `/wp-content/themes/labbotheme/assets/svg/arrow-left.svg` | Navegação carrossel (prev)           |
| Seta Direita           | `/wp-content/themes/labbotheme/assets/svg/arrow-right.svg`| Navegação carrossel (next)           |
| Chevron Down           | `/wp-content/themes/labbotheme/assets/svg/chevron-down.svg`| Submenu dropdown                    |
| Add (+)                | `/wp-content/themes/labbotheme/assets/svg/add.svg`        | FAB "Acesso Rápido"                  |
| Mail                   | `/wp-content/themes/labbotheme/assets/svg/mail.svg`       | Input de email no footer             |
| Idioma                 | `/wp-content/themes/labbotheme/assets/svg/icone-lang.svg` | Seletor de idioma                    |
| Seta Diagonal ↗        | SVG inline (`M7 17L17 7M17 7H7M17 7V17`)                  | Botões outline "Entre em contato"    |

> [!NOTE]
> Referência anterior ao arquivo `/assets/svg/arrow-right-blue.svg` era uma SUPOSIÇÃO incorreta.
> Não há "blue" nos nomes de arquivo SVG. A seta diagonal ↗ é um SVG inline no HTML.

### 8.2 Ícones de Métricas (Bento Grid)

Os ícones circulares na seção de números são SVGs carregados de:
- `/wp-content/uploads/2023/12/Events.svg` — Eventos
- `/wp-content/uploads/2023/12/People.svg` — Pessoas
- `/wp-content/uploads/2023/12/People1.svg` — Pessoas (variação)

---

## 9. Componentes Estruturais

### 9.1 Hero Banner com Carrossel

```
┌─────────────────────────────────────────────────────────────┐
│  [Swiper Carousel - Full Width]                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │  Banner Image (.webp, border-radius: 8px)              │   │
│  │                                                         │   │
│  │  ┌──────────────────────────┐                          │   │
│  │  │  CTA Card (Glass branco) │  ← bottom:295px left:100│   │
│  │  │  rgba(255,255,255,.1)    │                          │   │
│  │  │  backdrop-filter: blur   │                          │   │
│  │  │  ┌──────────────────┐   │                          │   │
│  │  │  │ H2: "Seja parte  │   │                          │   │
│  │  │  │ da mudança"      │   │                          │   │
│  │  │  ├──────────────────┤   │                          │   │
│  │  │  │ p: Descrição     │   │                          │   │
│  │  │  ├──────────────────┤   │                          │   │
│  │  │  │ [BTN Bordô →]    │   │                          │   │
│  │  │  └──────────────────┘   │                          │   │
│  │  └──────────────────────────┘       [◄] ⁄ [►] Arrows  │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
│  IMPACTO   ← Split-color h1 (GT Walsheim 160px, bicolor)    │
│  QUE                                                          │
│  IMPORTA                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Ticker / Marquee Tipográfico

```
──────────────────────────────────────────────────────────────
 Conexões • Negócios • Inclusão Produtiva • Coworking • ...
──────────────────────────────────────────────────────────────
  border-top: 2px solid var(--cinza-claro-2)
  padding: 100px 0
  font: 72px/70px Poppins, weight 400
  Dot: color var(--vermelho), margin-inline: 50px
```

### 9.3 Bento Grid de Métricas (Seção "Números de Impacto")

```
┌─────────────┬───────────────────┬──────────────┬──────────────┐
│ Card Branco │ "Números de       │ Card Azul    │ Card Ciano   │
│ +7,6 mil    │  impacto dos      │ Marinho      │ Claro        │
│ (--branco)  │  programas"       │ +420         │ (--azul-     │
│ Foto small  │                   │ (--azul)     │  claro-4)    │
│             │ Card Bordô        │              │              │
│             │ 72%               │ Foto small   │ Card Preto   │
│             │ (--vermelho)      │              │ (--preto-3)  │
│             │ Foto + ícone      │              │              │
└─────────────┴───────────────────┴──────────────┴──────────────┘

  Layout: 4 blocos responsivos (22% / 28% / 28% / 22%)
  Background: var(--branco-2, #f7f6f2) com border-radius: 8px
  Números: 60px, weight 400, letter-spacing: -1.2px
  Cores dos números: --vermelho, --laranja, --azul-claro-2, --azul, --branco
```

### 9.4 Seção de Contato Pré-Footer

```
┌─────────────────────────────────────────────────────────────┐
│  Footer (.container-fluid, bg: --preto-3, border-radius:8px)│
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Newsletter (border-bottom: 1.5px solid --preto-2)      │  │
│  │ [H3] + [p] | [Email input (pill)] [Submit btn]         │  │
│  │ Input: border: 2px solid --branco, border-radius:100px │  │
│  │ Ícone mail.svg à esquerda do input                     │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Unidades (5 colunas responsivas)                       │  │
│  │ Cada unidade: [h3 bold branco] + [p cinza GT Walsheim] │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Links de política | Redes sociais | Copyright          │  │
│  │ border-bottom: 1px solid --preto-2                     │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 9.5 Seção de Programa Destaque (Hub Inovação Climática)

```
┌─────────────────────────────────────────────────────────────┐
│  bg: #063b27 (verde escuro), border-radius: 8px             │
│  ┌───────────────────────────┬─────────────────────────────┐│
│  │ col-lg-7                  │ col-lg-5                    ││
│  │ padding: 115px 140px      │ img: object-fit: cover      ││
│  │ [Badge: PROGRAMA DESTAQUE]│                             ││
│  │  bg:#b9ee8d, radius:16px  │                             ││
│  │ [Logo img max-w:200px]    │                             ││
│  │ [p: GT Walsheim 18px 600] │                             ││
│  │ ───────────────────────── │                             ││
│  │ > Conheça o programa ↗    │                             ││
│  │ > Como fazemos acontecer ↗│                             ││
│  │ > Entre em contato ↗      │                             ││
│  │  color:#b9ee8d, border-   │                             ││
│  │  bottom: 1.5px solid      │                             ││
│  └───────────────────────────┴─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Tokens de Interface & Aplicação Financeira (iHubFiscal)

### 10.1 Cores Semânticas de Status & Ciclo de Vida Fiscal

O portal institucional do Impact Hub Floripa é voltado à divulgação institucional e não possuía estados de transação financeira. Para o **iHubFiscal**, definimos tokens semânticos rigorosos, garantindo conformidade com a WCAG 2.1 (contraste AAA/AA) e distinção inequívoca entre fases:

| Token Semântico           | Cor Principal | Fundo Sutil (`bg`) | Borda (`border`) | Aplicação no iHubFiscal                                         |
|---------------------------|---------------|--------------------|------------------|-----------------------------------------------------------------|
| `--ihf-status-error`      | `#DC2626`     | `#FEF2F2`          | `#FCA5A5`        | Nota duplicada, divergência matemática, recusa de gestor        |
| `--ihf-status-warning`    | `#D97706`     | `#FFFBEB`          | `#FCD34D`        | Leitura incerta de IA, vencimento em até 48h, triagem pendente  |
| `--ihf-status-success`    | `#16A34A`     | `#F0FDF4`          | `#86EFAC`        | Validação matemática 100%, pagamento liquidado (`PAGO`)         |
| `--ihf-status-info`       | `#1C395C`     | `#E2F5F8`          | `#9EEAF9`        | Protocolo gerado, metadados informativos, links de auditoria    |
| `--ihf-status-neutral`    | `#495057`     | `#F8F9FA`          | `#DEE2E6`        | Estados inativos, rascunhos, badges informativas neutras        |

#### Mapeamento das 5 Fases Operacionais do Kanban (`invoices.status`):

| Fase Operacional        | Badge Background | Badge Texto | Borda       | Ícone Recomendado | Significado Operacional                           |
|-------------------------|------------------|-------------|-------------|-------------------|---------------------------------------------------|
| `TRIAGEM`               | `#FFFBEB`        | `#B45309`   | `#FDE68A`   | `alert-circle`    | Nota submetida aguardando resolução de divergência|
| `AGUARDANDO_APROVACAO`  | `#E2F5F8`        | `#1C395C`   | `#9EEAF9`   | `clock`           | Validada aguardando alçada técnica do gestor      |
| `RECUSADO`              | `#FEF2F2`        | `#B91C1C`   | `#FECACA`   | `x-circle`        | Devolvida ao fornecedor com justificativa formal  |
| `AGENDADO_PAGAMENTO`    | `#EDE9FE`        | `#5B21B6`   | `#DDD6FE`   | `calendar-check`  | Aprovada, autorizada na esteira de liquidação     |
| `PAGO`                  | `#F0FDF4`        | `#15803D`   | `#BBF7D0`   | `check-circle-2`  | Baixa realizada com anexo de comprovante bancário |

---

### 10.2 Escala de Z-Index (Camadas e Sobreposição)

Evita sobreposição incorreta entre o Header corporativo fixo, dropdowns de filtros, overlays de carregamento e modais de aprovação:

| Token             | Valor  | Aplicação na Interface                                                |
|-------------------|--------|-----------------------------------------------------------------------|
| `--ihf-z-deep`    | `-1`   | Marca d'água ("IMPACTO QUE IMPORTA") e texturas decorativas de fundo  |
| `--ihf-z-base`    | `1`    | Elementos de conteúdo padrão e cards flutuantes                       |
| `--ihf-z-sticky`  | `1020` | Header corporativo fixo (`sticky-top`), cabeçalhos fixos de Datagrids |
| `--ihf-z-dropdown`| `1000` | Menus dropdown de perfil, filtros e select de centros de custo        |
| `--ihf-z-drawer`  | `1040` | Painéis laterais expansíveis (Offcanvas de auditoria e logs)          |
| `--ihf-z-backdrop`| `1050` | Overlay escurecido do modal (`background: rgba(33, 32, 32, 0.6)`)     |
| `--ihf-z-modal`   | `1055` | Modal de justificativa de devolução e formulário de baixa bancária    |
| `--ihf-z-popover` | `1070` | Popovers de detalhamento de retenções tributárias                     |
| `--ihf-z-tooltip` | `1080` | Tooltips de ajuda e dicas de campos tributários                       |
| `--ihf-z-toast`   | `1090` | Notificações de confirmação de cópia de chave Pix e emissão de lote  |

---

### 10.3 Componente Dropzone / Upload de NFS-e (Portal do Fornecedor `/upload`)

O envio sem login exige uma área de arrastar-e-soltar intuitiva, limpa e responsiva:

```css
.dropzone-container {
  border: var(--ihf-dropzone-border);
  background-color: var(--ihf-bg-primary);
  border-radius: var(--ihf-radius-lg);
  padding: 40px 24px;
  text-align: center;
  transition: all var(--ihf-transition-normal);
  cursor: pointer;
}

.dropzone-container:hover {
  background-color: var(--ihf-bg-warm);
  border-color: var(--ihf-brand-primary);
}

.dropzone-container.dragover {
  background-color: var(--ihf-brand-cyan-light);
  border-color: var(--ihf-brand-cyan);
  box-shadow: 0 0 0 4px rgba(65, 190, 208, 0.15);
}
```

- `--ihf-dropzone-border`: `2px dashed #abb5c2;`
- `--ihf-dropzone-border-hover`: `2px dashed #812926;`
- `--ihf-dropzone-border-active`: `2px dashed #41bed0;`
- `--ihf-dropzone-bg`: `#f7f6f2;`
- `--ihf-dropzone-bg-hover`: `#f2eae9;`
- `--ihf-dropzone-bg-active`: `#e2f5f8;`

---

### 10.4 Estados de Input & Indicador de Confiança Cromática da IA (Human-in-the-Loop)

Na tela `/conferencia/:id`, cada campo lido pelo pipeline multimodal recebe um indicador visual de acurácia:

```css
/* Estado Base de Inputs */
.form-input {
  width: 100%;
  height: 46px;
  padding: 12px 16px;
  border-radius: var(--ihf-radius-sm);
  border: 1.5px solid var(--ihf-border-input);
  background-color: var(--ihf-bg-white);
  font-family: var(--ihf-font-body);
  font-size: 15px;
  color: var(--ihf-text-primary);
  transition: all var(--ihf-transition-fast);
}

/* Foco */
.form-input:focus {
  outline: none;
  border-color: var(--ihf-brand-primary);
  box-shadow: var(--ihf-shadow-focus);
}

/* Desabilitado / Somente Leitura */
.form-input:disabled,
.form-input[readonly] {
  background-color: var(--ihf-bg-light);
  border-color: var(--ihf-border-light);
  color: #6c757d;
  cursor: not-allowed;
}

/* Confiança Alta da IA (>= 90%) — Verde Seguro */
.field-confidence-high {
  border-color: var(--ihf-status-success) !important;
  background-color: #f0fdf4 !important;
}

/* Confiança Baixa ou Dado Incerto (< 90%) — Amarelo Pulsante */
.field-confidence-low {
  border-color: var(--ihf-status-warning) !important;
  background-color: #fffbeb !important;
  animation: pulseWarning 2s infinite ease-in-out;
}

@keyframes pulseWarning {
  0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
  50% { box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.15); }
}

/* Campo com Divergência Matemática / Erro */
.field-divergent {
  border-color: var(--ihf-status-error) !important;
  background-color: #fef2f2 !important;
}
```

---

### 10.5 Estilos de Tabelas Financeiras (Datagrid para `/pagamentos` e `/fechamento`)

Tabelas contábeis exigem legibilidade de linhas, contraste e alinhamento numérico tabular:

```css
.table-finance {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: var(--ihf-radius-md);
  overflow: hidden;
  border: 1px solid var(--ihf-border-light);
  background-color: var(--ihf-bg-white);
}

.table-finance thead th {
  background-color: var(--ihf-brand-navy);
  color: var(--ihf-text-on-dark);
  font-family: var(--ihf-font-heading);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 16px;
  position: sticky;
  top: 0;
  z-index: var(--ihf-z-base);
}

.table-finance tbody tr {
  transition: background-color var(--ihf-transition-fast);
}

.table-finance tbody tr:nth-child(even) {
  background-color: #fcfcfb;
}

.table-finance tbody tr:hover {
  background-color: var(--ihf-bg-warm);
}

.table-finance td {
  padding: 14px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--ihf-border-light);
  color: var(--ihf-text-primary);
  vertical-align: middle;
}

/* Células de valores monetários com alinhamento à direita e fonte tabular */
.table-finance td.amount,
.table-finance th.amount {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
```

---

### 10.6 Modais, Overlays & Diálogos

Utilizados na justificativa de recusa do gestor e na confirmação de baixa:

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--ihf-z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(33, 32, 32, 0.65);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

.modal-dialog {
  background-color: var(--ihf-bg-white);
  border-radius: var(--ihf-radius-lg);
  max-width: 540px;
  width: 100%;
  padding: 32px;
  box-shadow: var(--ihf-shadow-modal);
  border: 1px solid var(--ihf-border-light);
  animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
```

---

### 10.7 Escala Tipográfica Fluida e Line-Heights

Para garantir responsividade perfeita e acessibilidade sem quebras de layout:

| Token                | Valor Base (px) | Valor Relativo | Clamp Fluido                                  | Line-Height Token    |
|----------------------|-----------------|----------------|-----------------------------------------------|----------------------|
| `--ihf-text-xs`      | `11px`          | `0.6875rem`    | `clamp(10px, 0.65rem + 0.1vw, 11px)`          | `--ihf-lh-tight: 1.2`|
| `--ihf-text-sm`      | `14px`          | `0.875rem`     | `clamp(13px, 0.8rem + 0.2vw, 14px)`           | `--ihf-lh-snug: 1.35`|
| `--ihf-text-base`    | `16px`          | `1.0rem`       | `clamp(15px, 0.95rem + 0.25vw, 16px)`         | `--ihf-lh-base: 1.5` |
| `--ihf-text-md`      | `18px`          | `1.125rem`     | `clamp(16px, 1.05rem + 0.3vw, 18px)`          | `--ihf-lh-base: 1.5` |
| `--ihf-text-lg`      | `20px`          | `1.25rem`      | `clamp(18px, 1.15rem + 0.4vw, 20px)`          | `--ihf-lh-heading: 1.3`|
| `--ihf-text-xl`      | `24px`          | `1.5rem`       | `clamp(20px, 1.35rem + 0.5vw, 24px)`          | `--ihf-lh-heading: 1.2`|
| `--ihf-text-2xl`     | `36px`          | `2.25rem`      | `clamp(26px, 2.0rem + 0.8vw, 36px)`           | `--ihf-lh-heading: 1.15`|
| `--ihf-text-3xl`     | `48px`          | `3.0rem`       | `clamp(32px, 2.6rem + 1.2vw, 48px)`           | `--ihf-lh-tight: 1.0`|
| `--ihf-text-display` | `72px`          | `4.5rem`       | `clamp(42px, 3.5rem + 2.5vw, 72px)`           | `--ihf-lh-tight: 1.0`|

---

### 10.8 Auditoria Técnica & Comparação com a Análise Externa

Avaliamos criteriosamente cada apontamento da `<analise>` enviada, confrontando as suposições com o código-fonte CSS extraído em tempo de execução via WP Rocket (`wpr-usedcss`):

| Ponto Levantado pela Análise | Veredito | Justificativa com Base no Código-Fonte Real |
|---|:---:|---|
| **1. Falta de tokens semânticos de status (Erro, Alerta, Sucesso, Info)** | ✅ **Correto & Adotado** | O site original é institucional e não possui regras contábeis. Incorporamos a paleta semântica completa na Seção 10.1, mapeando inclusive os 5 estados do ciclo de vida das notas (`TRIAGEM` a `PAGO`). |
| **2. Escala de Z-Index ausente** | ✅ **Correto & Adotado** | Fundamental para a aplicação iHubFiscal não colidir dropdowns, headers fixos e modais de recusa. Tokenizado na Seção 10.2. |
| **3. Tokens de Dropzone e Estados de Inputs de IA** | ✅ **Correto & Adotado** | Essencial para o Human-in-the-Loop em `/upload` e `/conferencia/:id`. Adicionados com animação pulsante nas Seções 10.3 e 10.4. |
| **4. Estilos de Tabelas Financeiras (Datagrids) e Modais** | ✅ **Correto & Adotado** | Adicionados nas Seções 10.5 e 10.6, com zebra-striping institucional e backdrop blur. |
| **5. Escala Tipográfica Fluida e Line-Heights** | ✅ **Correto & Adotado** | Normalizamos todas as medidas com conversão de `px` para `rem` e `clamp()` na Seção 10.7. |
| **6. Suposição de que o Hero Card é "bloco bordô sólido `#7A221E`"** | ❌ **Alucinação da IA Externa** | **Código real comprova:** `.cta-banner { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); }`. O card é de fato **glassmorphism translúcido branco**, com o botão interno em bordô. No mobile, o fallback é `.cta-banner { background: var(--cinza-claro); }`. |
| **7. Suposição de que a Watermark tem contorno vazado (`text-stroke`)** | ❌ **Alucinação da IA Externa** | **Código real comprova:** `.banner .container-fluid h1 { color: var(--preto-3); }` e o `<span>` filho tem `color: var(--branco); height: 50%; overflow: hidden;`. Não existe `-webkit-text-stroke`; é um efeito de meio-corte sólido preto/branco. |
| **8. Alegação de que a marca não usa Azul** | ❌ **Alucinação da IA Externa** | O `:root` original define 6 variáveis de azul: `--azul: #1c395c;`, `--azul-2: #41bed0;`, `--azul-claro: #e1e5ea;`, `--azul-claro-2: #abb5c2;`, `--azul-claro-3: #cfeff3;`, `--azul-claro-4: #e2f5f8;`. Usados extensivamente nas métricas e botões. |
| **9. Suposição do Hover Primário ser `#5E1A17`** | ⚠️ **Parcialmente Incorreto** | No CSS real, botões `.default-btn.btn-vermelho:hover` invertem para texto e borda `--azul` (`#1c395c`) sobre fundo branco, e `.entre-em-contato a:hover` fica com fundo transparente. Para a aplicação corporativa, padronizamos `--ihf-brand-primary-hover: #5e1a17` para ações padrão e inversão institucional para botões de destaque. |

---

## 11. Referência Rápida Completa — CSS Variables (`:root`)

Este bloco deve ser copiado diretamente para `portal/ihub/css/variables.css`:

```css
:root {
  /* ═══ 1. CORES DA MARCA (Valores Reais do Tema Labbo) ═══ */
  --ihf-brand-primary:         #812926;     /* Bordô oficial da marca */
  --ihf-brand-primary-hover:   #5e1a17;     /* Hover escurecido institucional */
  --ihf-brand-navy:            #1c395c;     /* Azul-marinho corporativo */
  --ihf-brand-cyan:            #41bed0;     /* Ciano vibrante de ação e download */
  --ihf-brand-cyan-light:      #e2f5f8;     /* Ciano suave para destaques e hover */
  --ihf-brand-peach:           #fde2ce;     /* Pêssego/Laranja pálido institucional */
  --ihf-brand-forest:          #063b27;     /* Verde floresta para sustentabilidade */
  --ihf-brand-lime:            #b9ee8d;     /* Verde limão de realce e badges */

  /* ═══ 2. SUPERFÍCIES E FUNDOS ═══ */
  --ihf-bg-primary:            #f7f6f2;     /* Off-white quente de fundo de tela */
  --ihf-bg-white:              #ffffff;     /* Branco puro para cards e tabelas */
  --ihf-bg-light:              #f3f4f5;     /* Cinza claro para áreas de apoio */
  --ihf-bg-warm:               #f2eae9;     /* Bege rosado suave para hover de linhas */
  --ihf-bg-dark:               #212020;     /* Preto institucional do rodapé */
  --ihf-bg-dark-line:          #333333;     /* Divisores sobre fundo escuro */
  --ihf-bg-hero-glass:         rgba(255, 255, 255, 0.1);

  /* ═══ 3. TEXTO E TIPOGRAFIA ═══ */
  --ihf-text-primary:          #212020;     /* Texto principal em fundo claro */
  --ihf-text-heading:          #812926;     /* Títulos e destaques bordô */
  --ihf-text-body:             #333333;     /* Texto de parágrafos */
  --ihf-text-muted:            #c1c1c1;     /* Placeholders e legendas */
  --ihf-text-on-dark:          #ffffff;     /* Texto sobre fundo escuro ou marinho */
  --ihf-text-on-brand:         #fde2ce;     /* Texto sobre superfícies bordô */

  --ihf-font-heading:          'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --ihf-font-body:             'GT Walsheim', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Line Heights */
  --ihf-lh-tight:              1.15;
  --ihf-lh-heading:            1.25;
  --ihf-lh-base:               1.5;

  /* ═══ 4. ESPAÇAMENTO (Grade de 4px / Rem) ═══ */
  --ihf-space-1:               0.25rem;     /* 4px */
  --ihf-space-2:               0.5rem;      /* 8px */
  --ihf-space-3:               0.75rem;     /* 12px */
  --ihf-space-4:               1.0rem;      /* 16px */
  --ihf-space-5:               1.25rem;     /* 20px */
  --ihf-space-6:               1.5rem;      /* 24px */
  --ihf-space-7:               1.75rem;     /* 28px */
  --ihf-space-8:               2.0rem;      /* 32px */
  --ihf-space-10:              2.5rem;      /* 40px */
  --ihf-space-12:              3.0rem;      /* 48px */
  --ihf-space-16:              4.0rem;      /* 64px */
  --ihf-space-20:              5.0rem;      /* 80px */
  --ihf-space-32:              8.75rem;     /* 140px */

  /* ═══ 5. BORDAS E RAIOS ═══ */
  --ihf-border-light:          #e5e5e5;
  --ihf-border-dark:           #333333;
  --ihf-border-input:          #e5e5e5;
  --ihf-border-focus:          #812926;

  --ihf-radius-sm:             4px;
  --ihf-radius-md:             8px;
  --ihf-radius-lg:             16px;
  --ihf-radius-full:           100px;       /* Padrão Pill Shape do tema */
  --ihf-radius-circle:         50%;

  /* ═══ 6. SOMBRAS E ELEVAÇÕES ═══ */
  --ihf-shadow-sm:             0 1px 3px rgba(0, 0, 0, 0.08);
  --ihf-shadow-md:             0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --ihf-shadow-lg:             0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --ihf-shadow-modal:          0 20px 25px -5px rgba(0, 0, 0, 0.2);
  --ihf-shadow-fab:            0 0 10px rgba(0, 0, 0, 0.5);
  --ihf-shadow-focus:          0 0 0 3px rgba(129, 41, 38, 0.2);

  /* ═══ 7. TRANSIÇÕES E ANIMAÇÕES ═══ */
  --ihf-transition-fast:       0.15s ease-in-out;
  --ihf-transition-normal:     0.25s cubic-bezier(0.16, 1, 0.3, 1);
  --ihf-transition-smooth:     0.3s ease-in-out;

  /* ═══ 8. LAYOUT & CONTAINERS ═══ */
  --ihf-container-max:         1465px;
  --ihf-container-wide:        1615px;
  --ihf-gutter:                24px;

  /* ═══ 9. STATUS SEMÂNTICOS FINANCEIROS ═══ */
  --ihf-status-error:          #dc2626;
  --ihf-status-error-bg:       #fef2f2;
  --ihf-status-error-border:   #fca5a5;

  --ihf-status-warning:        #d97706;
  --ihf-status-warning-bg:     #fffbeb;
  --ihf-status-warning-border: #fcd34d;

  --ihf-status-success:        #16a34a;
  --ihf-status-success-bg:     #f0fdf4;
  --ihf-status-success-border: #86efac;

  --ihf-status-info:           #1c395c;
  --ihf-status-info-bg:        #e2f5f8;
  --ihf-status-info-border:    #9eeaf9;

  /* ═══ 10. CAMADAS (Z-INDEX) ═══ */
  --ihf-z-deep:                -1;
  --ihf-z-base:                1;
  --ihf-z-dropdown:            1000;
  --ihf-z-sticky:              1020;
  --ihf-z-drawer:              1040;
  --ihf-z-backdrop:            1050;
  --ihf-z-modal:               1055;
  --ihf-z-popover:             1070;
  --ihf-z-tooltip:             1080;
  --ihf-z-toast:               1090;

  /* ═══ 11. DROPZONE DE UPLOAD ═══ */
  --ihf-dropzone-border:       2px dashed #abb5c2;
  --ihf-dropzone-border-hover: 2px dashed #812926;
  --ihf-dropzone-border-active:2px dashed #41bed0;
  --ihf-dropzone-bg:           #f7f6f2;
  --ihf-dropzone-bg-hover:     #f2eae9;
  --ihf-dropzone-bg-active:    #e2f5f8;
}
```

---

## 12. Capturas de Referência e Evidências Visuais

> As capturas do site original foram homologadas com base no HTML/CSS do tema e nas gravações do browser subagent:
> - **Hero Banner + CTA Card**: Frosted glass branco (`rgba(255,255,255,0.1)` com `blur(12px)`) sobre imagem de fundo e botão bordô com seta que desliza em hover.
> - **Watermark Tipográfica**: GT Walsheim Regular com técnica de meio-corte preto (`#212020`) na parte inferior e branco (`#ffffff`) na metade superior.
> - **Bento Grid**: Composição moderna combinando blocos `#1c395c` (azul marinho), `#812926` (bordô), `#e2f5f8` (ciano suave) e `#212020` (preto).
> - **Programa Destaque**: Bloco verde floresta `#063b27` com badge limão `#b9ee8d`.
> - **Footer Institucional**: Fundo `#212020` com newsletter pill-shaped, grid de unidades e redes sociais.

---

> ⚠️ **Nota de Governança**: Este documento é a **fonte de verdade** do design system para o desenvolvimento do **iHubFiscal v2**. Toda implementação de front-end deve seguir estritamente os tokens e padrões aqui especificados.
> **Versão Homologada**: 15 de setembro de 2026.


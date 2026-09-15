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

### 3.1 Escala de Espaçamento

| Token            | Valor    | Aplicação Real                                                  |
|------------------|----------|-----------------------------------------------------------------|
| `--ihf-space-xs`  | `4px`    | Gaps mínimos, separação de ícones inline                        |
| `--ihf-space-sm`  | `8px`    | Padding interno de badges, gaps menores, `gap: 8px`             |
| `--ihf-space-md`  | `16px`   | Padding de cards internos, gap entre elementos, `gap: 16px`     |
| `--ihf-space-lg`  | `24px`   | Margem entre blocos, `margin-bottom: 24px`, `padding: 24px`     |
| `--ihf-space-xl`  | `30px`   | Padding de cards (`.number1 { padding: 30px 32px }`), gaps      |
| `--ihf-space-2xl` | `40px`   | Padding de boxes bordô (`.bottom-box { padding: 30px 40px }`)   |
| `--ihf-space-3xl` | `48px`   | Gap do footer (`.container-fluid { gap: 48px; padding: 48px }`)|
| `--ihf-space-4xl` | `75px`   | Padding horizontal do footer (`padding: 48px 75px`)             |
| `--ihf-space-5xl` | `80px`   | Padding de seções escuras (`.container-fluid { padding: 80px }`) |
| `--ihf-space-6xl` | `140px`  | Padding vertical de seções grandes (`.partners { padding: 140px 0 }`) |

> [!NOTE]
> O CSS real usa valores como `12px`, `28px`, `40px`, `56px`, `64px`, `115px`, `140px`, `145px`, `262px`
> que não seguem uma escala matemática rígida. A escala acima é uma **aproximação tokenizada**.

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

## 10. Regras e Recomendações para o iHubFiscal (v2)

### 10.1 Cores Semânticas de Status (Adicionar para App Financeiro)

O site original é institucional e **não possui** cores de status. Para a aplicação iHubFiscal, mapear assim:

| Status         | Token Recomendado         | Valor Sugerido  | Derivação                                         |
|----------------|---------------------------|-----------------|---------------------------------------------------|
| **Erro**       | `--ihf-status-error`      | `#DC2626`       | Bootstrap `--bs-danger`  (próximo ao --vermelho)   |
| **Alerta**     | `--ihf-status-warning`    | `#F59E0B`       | Âmbar (harmoniza com --laranja `#fde2ce`)          |
| **Sucesso**    | `--ihf-status-success`    | `#16A34A`       | Verde (distinto do --vermelho para contraste)      |
| **Info**       | `--ihf-status-info`       | `#1c395c`       | Reutilizar `--azul` da paleta real                 |
| **Info Light** | `--ihf-status-info-light` | `#e2f5f8`       | Reutilizar `--azul-claro-4`                        |

### 10.2 Regras de Uso

1. **Prioridade tipográfica**: Use **Poppins** para títulos e UI; **GT Walsheim** para corpo e labels.
2. **Pill shape**: Botões usam `border-radius: 100px` (não 9999px).
3. **Container principal**: `max-width: 1465px` (não 1200px).
4. **Cores de botão**: Hover do btn-vermelho inverte para **azul marinho** (`--azul`), não para branco.
5. **Azul marinho existe**: `#1c395c` é uma cor oficial da marca, usada em métricas e hover de botões.
6. **Ciano existe**: `#41bed0` é a cor oficial de CTAs de download e formulários.
7. **Pêssego/laranja existe**: `#fde2ce` é usado como texto sobre superfícies bordô.
8. **Bootstrap 5 é o framework**: Respeite os breakpoints (576, 768, 992, 1200, 1400px).
9. **body zoom: 0.8**: O site real aplica `zoom: 0.8` no body (reseta para `1` em mobile ≤991px).
10. **Evite sombras customizadas pesadas**: O tema real usa bordas (`border: 1.5px solid`) em vez de box-shadow na maioria dos cards.

### 10.3 Bibliotecas JavaScript do Tema

| Biblioteca      | Uso                                    | Versão        |
|-----------------|----------------------------------------|---------------|
| jQuery          | Base para plugins                      | 3.7.1         |
| Bootstrap 5     | Grid, modais, dropdowns, tooltips      | 5.x           |
| Swiper          | Carrossel do Hero                      | Latest        |
| Slick Carousel  | Parceiros, depoimentos, benefícios     | Latest        |
| Lity            | Lightbox para vídeos/modais            | Latest        |
| jQuery Mask      | Máscara de telefone em formulários     | Latest        |
| ShiftNav        | Menu móvel lateral (hamburger)         | Latest        |

---

## 11. Referência Rápida — CSS Variables (v2)

```css
:root {
  /* ═══ MARCA (valores reais do tema) ═══ */
  --ihf-brand-primary:   #812926;     /* var(--vermelho) */
  --ihf-brand-forest:    #063b27;     /* Seção Hub Inovação Climática */
  --ihf-brand-lime:      #b9ee8d;     /* Badge destaque, hover links verdes */
  --ihf-brand-navy:      #1c395c;     /* var(--azul) — Bento Grid */
  --ihf-brand-cyan:      #41bed0;     /* var(--azul-2) — Download CTAs */
  --ihf-brand-peach:     #fde2ce;     /* var(--laranja) — Texto em cards bordô */

  /* ═══ SUPERFÍCIES ═══ */
  --ihf-bg-primary:      #f7f6f2;     /* var(--branco-2) */
  --ihf-bg-white:        #ffffff;
  --ihf-bg-light:        #f3f4f5;     /* var(--cinza-claro) */
  --ihf-bg-warm:         #f2eae9;     /* var(--marrom-claro) */
  --ihf-bg-dark:         #212020;     /* var(--preto-3) */
  --ihf-bg-dark-line:    #333;        /* var(--preto-2) */

  /* ═══ TEXTO ═══ */
  --ihf-text-primary:    #212020;     /* var(--preto-3) */
  --ihf-text-heading:    #812926;     /* var(--vermelho) */
  --ihf-text-body:       #333;        /* var(--preto-2) */
  --ihf-text-muted:      #c1c1c1;     /* var(--cinza) */
  --ihf-text-on-dark:    #ffffff;
  --ihf-text-on-brand:   #fde2ce;     /* var(--laranja) */

  /* ═══ BORDAS ═══ */
  --ihf-border-light:    #e5e5e5;     /* var(--cinza-claro-2) */
  --ihf-border-dark:     #333;        /* var(--preto-2) */
  --ihf-border-input:    #e5e5e5;

  /* ═══ TIPOGRAFIA ═══ */
  --ihf-font-heading:    'Poppins', sans-serif;
  --ihf-font-body:       'GT Walsheim', sans-serif;

  /* ═══ ESPAÇAMENTO ═══ */
  --ihf-space-xs:        4px;
  --ihf-space-sm:        8px;
  --ihf-space-md:        16px;
  --ihf-space-lg:        24px;
  --ihf-space-xl:        32px;
  --ihf-space-2xl:       48px;
  --ihf-space-3xl:       64px;
  --ihf-space-4xl:       80px;
  --ihf-space-5xl:       120px;

  /* ═══ BORDER RADIUS ═══ */
  --ihf-radius-sm:       4px;
  --ihf-radius-md:       8px;
  --ihf-radius-lg:       16px;
  --ihf-radius-full:     100px;       /* NÃO 9999px */
  --ihf-radius-circle:   50%;

  /* ═══ TRANSIÇÕES ═══ */
  --ihf-transition-fast:   .15s ease-in-out;
  --ihf-transition-normal: .3s ease;
  --ihf-transition-normal-io: .3s ease-in-out;
  --ihf-transition-slow:   .5s ease;

  /* ═══ LAYOUT ═══ */
  --ihf-container-max:     1465px;     /* NÃO 1200px */
  --ihf-container-wide:    1615px;     /* Footer e seções expandidas */
  --ihf-container-padding: 24px;
  --ihf-gutter:            24px;       /* --bs-gutter-x: 1.5rem */

  /* ═══ STATUS (para iHubFiscal) ═══ */
  --ihf-status-error:    #DC2626;
  --ihf-status-warning:  #F59E0B;
  --ihf-status-success:  #16A34A;
  --ihf-status-info:     #1c395c;
}
```

---

## 12. Capturas de Referência

> As capturas do site original estão armazenadas nos screenshots do browser subagent.
> - **Hero + CTA Card**: Glass branco sobre imagem, seta CTA bordô.
> - **Ticker/Marquee**: Faixa horizontal com pontos bordô.
> - **Bento Grid**: Layout assimétrico com cards azul-marinho, bordô, ciano.
> - **Programa Destaque**: Seção verde escuro com links lime.
> - **Footer**: Rodapé `#212020` com newsletter, unidades, social.

---

> ⚠️ **Nota**: Este documento é a **fonte de verdade** do design system para a v2 do portal.
> Toda decisão de cor, tipografia, espaçamento e componente deve referenciar este arquivo.
> **Revisão v2**: 15 de setembro de 2026 — Reescrito com dados do código-fonte CSS real.

# 🎨 Design System — Impact Hub Floripa

> **Fonte de Verdade** para a identidade visual do Impact Hub Floripa.
> Tokens extraídos de [floripa.impacthub.net](https://floripa.impacthub.net/) em 15/09/2026.
> Tema desenvolvido por **Labbo Digital** (`labbotheme`).

---

## 1. Paleta de Cores

### 1.1 Cores da Marca (Brand)

| Token                  | HEX         | RGB                  | Aplicação                                                        |
|------------------------|-------------|----------------------|------------------------------------------------------------------|
| `--ihf-brand-primary`  | `#7A221E`   | `rgb(122, 34, 30)`   | Logotipo, títulos H2, botões primários, links de destaque        |
| `--ihf-brand-dark`     | `#6B1D19`   | `rgb(107, 29, 25)`   | Hover de botões primários, estados ativos                        |
| `--ihf-brand-forest`   | `#09392B`   | `rgb(9, 57, 43)`     | Cards de programas (Inovação Climática), seções de destaque      |
| `--ihf-brand-lime`     | `#CBE98D`   | `rgb(203, 233, 141)` | Badges/pills de destaque, acentos em superfícies escuras         |
| `--ihf-brand-lime-alt` | `#CFE899`   | `rgb(207, 232, 153)` | Variação suave do lime, hover de badges                          |

### 1.2 Superfícies e Fundos (Backgrounds)

| Token                     | HEX         | Aplicação                                              |
|---------------------------|-------------|--------------------------------------------------------|
| `--ihf-bg-primary`        | `#F9F9F6`   | Fundo principal do site (off-white quente)              |
| `--ihf-bg-white`          | `#FFFFFF`   | Cards, header fixo, áreas de conteúdo                  |
| `--ihf-bg-light`          | `#F5F5F2`   | Seções alternadas, backgrounds sutis                    |
| `--ihf-bg-dark`           | `#1F1F1F`   | Rodapé principal, seções escuras                        |
| `--ihf-bg-dark-alt`       | `#1C1C1C`   | Variação do dark, overlays                             |
| `--ihf-bg-hero-overlay`   | `rgba(20, 20, 20, 0.65)` | Glassmorphism do card hero com `backdrop-filter: blur(12px)` |

### 1.3 Cores de Texto (Typography Colors)

| Token                     | HEX         | Aplicação                                               |
|---------------------------|-------------|---------------------------------------------------------|
| `--ihf-text-primary`      | `#1C1C1C`   | Texto primário grafite (corpo sobre fundo claro)         |
| `--ihf-text-heading`      | `#7A221E`   | Títulos de seção (H2, H3) em bordô/borgonha              |
| `--ihf-text-body`         | `#333333`   | Texto de corpo/parágrafo padrão                          |
| `--ihf-text-body-alt`     | `#444444`   | Texto de corpo em cards e descrições                     |
| `--ihf-text-muted`        | `#666666`   | Labels, subtítulos, texto secundário                     |
| `--ihf-text-label`        | `#888888`   | Tags de categoria, metadados ("MARCAS QUE IMPACTAM")     |
| `--ihf-text-on-dark`      | `#FFFFFF`   | Texto sobre fundo escuro (hero, footer, cards escuros)   |
| `--ihf-text-on-dark-muted`| `rgba(255,255,255,0.7)` | Texto secundário em fundo escuro             |
| `--ihf-text-link`         | `#7A221E`   | Links inline (herda da cor primária)                     |

### 1.4 Cores de Feedback e Divisores

| Token                     | Valor                       | Aplicação                                    |
|---------------------------|-----------------------------|----------------------------------------------|
| `--ihf-border-light`      | `#E5E5E5`                   | Bordas e divisores em fundo claro             |
| `--ihf-border-on-dark`    | `rgba(255, 255, 255, 0.2)`  | Divisores em fundo escuro (hero, footer)      |
| `--ihf-border-input`      | `#CCCCCC`                   | Bordas de campos de formulário                |
| `--ihf-border-input-focus`| `#7A221E`                   | Bordas de campos em foco                      |

---

## 2. Tipografia

### 2.1 Família Tipográfica

```css
--ihf-font-primary: 'Montserrat', 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- **Montserrat** — Fonte principal. Sans-serif geométrica, moderna, limpa.
- **Outfit** — Fallback primário. Semelhante em peso e proporção.
- **Plus Jakarta Sans** — Fallback secundário.
- Stack de sistema como último fallback.

> 📝 **Carregamento**: Google Fonts via `<link>`. Pesos carregados: **400**, **500**, **600**, **700**, **800**.

### 2.2 Escala Tipográfica e Hierarquia

| Elemento             | Desktop          | Mobile           | Weight     | Line Height | Letter Spacing | Transform    |
|----------------------|------------------|------------------|------------|-------------|----------------|--------------|
| **Display (D'água)** | `80px – 120px`   | `48px – 64px`    | `800`      | `1.0`       | `0.05em`       | `uppercase`  |
| **Hero Title (H1)**  | `40px – 48px`    | `28px – 32px`    | `700`      | `1.15`      | `normal`       | `none`       |
| **Seção Title (H2)** | `28px – 36px`    | `22px – 26px`    | `700`      | `1.25`      | `normal`       | `none`       |
| **Card Title (H3)**  | `20px – 24px`    | `18px – 20px`    | `600–700`  | `1.3`       | `normal`       | `none`       |
| **Subtítulo (H4)**   | `18px – 20px`    | `16px – 18px`    | `600`      | `1.35`      | `normal`       | `none`       |
| **Body (p)**         | `15px – 16px`    | `14px – 15px`    | `400`      | `1.6`       | `normal`       | `none`       |
| **Body Small**       | `13px – 14px`    | `12px – 13px`    | `400`      | `1.5`       | `normal`       | `none`       |
| **Label / Badge**    | `11px – 12px`    | `10px – 11px`    | `700`      | `1.2`       | `0.08em`       | `uppercase`  |
| **Caption**          | `11px – 12px`    | `10px – 11px`    | `400`      | `1.4`       | `0.02em`       | `none`       |

### 2.3 Estilos de Texto Especiais

```
"IMPACTO QUE IMPORTA" — Texto d'água (watermark)
  Font Size: 80px – 120px
  Font Weight: 800 (ExtraBold)
  Text Transform: uppercase
  Letter Spacing: 0.05em
  Color: rgba(0, 0, 0, 0.06) ou outlined
  Posição: Lateral direita, sobreposta ao conteúdo

"MARCAS QUE IMPACTAM" — Label de seção
  Font Size: 12px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.15em
  Color: #888888

"PROGRAMA DESTAQUE" — Badge/pill
  Font Size: 11px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.08em
  Color: #09392B
  Background: #CBE98D
  Border Radius: 9999px
  Padding: 6px 16px
```

---

## 3. Espaçamento (Spacing)

### 3.1 Escala de Espaçamento

| Token            | Valor    | Aplicação                                         |
|------------------|----------|---------------------------------------------------|
| `--ihf-space-xs`  | `4px`    | Gaps mínimos, separação de ícones inline           |
| `--ihf-space-sm`  | `8px`    | Padding interno de badges, gaps menores            |
| `--ihf-space-md`  | `16px`   | Padding de cards, gap entre elementos              |
| `--ihf-space-lg`  | `24px`   | Margem entre blocos, padding de seções internas    |
| `--ihf-space-xl`  | `32px`   | Separação entre seções de conteúdo                 |
| `--ihf-space-2xl` | `48px`   | Padding vertical de seções maiores                 |
| `--ihf-space-3xl` | `64px`   | Margem de seções principais                        |
| `--ihf-space-4xl` | `80px`   | Padding vertical de seções hero/footer             |
| `--ihf-space-5xl` | `120px`  | Espaçamento máximo entre seções de topo            |

### 3.2 Grid e Container

```css
--ihf-container-max: 1200px;
--ihf-container-padding: 24px;        /* Mobile */
--ihf-container-padding-lg: 48px;     /* Desktop */
--ihf-gutter: 24px;                   /* Gap entre colunas */
```

- Layout predominante em **CSS Grid** e **Flexbox**.
- Grid de 12 colunas para seções de conteúdo.
- Cards de programas: grid de **2 a 3 colunas** no desktop, **1 coluna** no mobile.
- Seção de coworkings: grid de **3 colunas** no desktop.
- Logos de parceiros: **carrossel horizontal** com auto-scroll.

---

## 4. Componentes UI

### 4.1 Botões (Buttons & CTAs)

#### Botão Primário Sólido
```css
.btn-primary {
  background-color: #7A221E;
  color: #FFFFFF;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border: none;
  border-radius: 9999px;          /* Pill shape */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.btn-primary:hover {
  background-color: #6B1D19;
  transform: translateY(-1px);
}
/* Ícone: seta direita → */
```

#### Botão Outline Secundário
```css
.btn-outline {
  background-color: transparent;
  color: #7A221E;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border: 1px solid #7A221E;
  border-radius: 9999px;          /* Pill shape */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}
.btn-outline:hover {
  background-color: #7A221E;
  color: #FFFFFF;
}
/* Ícone: seta diagonal ↗ */
```

#### Botão de Navegação (Header)
```css
.btn-nav {
  background-color: transparent;
  color: #1C1C1C;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  transition: color 0.2s ease;
}
.btn-nav:hover {
  color: #7A221E;
}
```

#### Botão CTA Header ("Entre em Contato")
```css
.btn-cta-header {
  background-color: #7A221E;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
}
```

#### Botão CTA Header Outline ("Impacta Mais")
```css
.btn-cta-header-outline {
  background-color: transparent;
  color: #1C1C1C;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border: 1px solid #1C1C1C;
  border-radius: 9999px;
}
```

### 4.2 Floating Action Button (FAB)

```css
.fab-acesso-rapido {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: #7A221E;
  color: #FFFFFF;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;
}
/* Legenda "Acesso Rápido" abaixo, font-size: 10px, font-weight: 600 */
```

### 4.3 Cards

#### Card Padrão (Programas, Blog)
```css
.card {
  background-color: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 24px;
}
.card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

#### Card Glassmorphism (Hero Overlay)
```css
.card-glass {
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 32px;
  color: #FFFFFF;
}
```

#### Card de Destaque (Verde Floresta)
```css
.card-highlight {
  background-color: #09392B;
  border-radius: 20px;
  padding: 40px;
  color: #FFFFFF;
}
.card-highlight .divider {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 4.4 Header / Navegação

```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #FFFFFF;
  padding: 12px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
}
```

- **Logo**: Bloco vermelho `#7A221E` com texto branco "IMPACT HUB" em caixa alta.
- **Links de navegação**: `font-size: 14px`, `font-weight: 500`, `color: #1C1C1C`.
- **Dropdown**: Hover revela submenu com `padding: 12px 0`, fundo branco.

### 4.5 Footer

```css
.footer {
  background-color: #1F1F1F;
  color: #FFFFFF;
  padding: 64px 48px 24px;
}
.footer-heading {
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 12px;
}
.footer-text {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}
.footer-link {
  color: #7A221E;         /* Links de telefone em bordô */
  text-decoration: underline;
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 24px;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-copyright {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
.footer-social-icon {
  width: 18px;
  height: 18px;
  color: #FFFFFF;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}
.footer-social-icon:hover {
  opacity: 1;
}
```

### 4.6 Formulários

```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #333333;
  background-color: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}
.form-input:focus {
  border-color: #7A221E;
  outline: none;
  box-shadow: 0 0 0 3px rgba(122, 34, 30, 0.1);
}
.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 6px;
}
.form-select {
  appearance: none;
  padding: 12px 40px 12px 16px;
  border-radius: 8px;
  border: 1px solid #CCCCCC;
  background-image: url("data:image/svg+xml,..."); /* Chevron */
}
```

### 4.7 Badges e Pills

```css
.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 16px;
  border-radius: 9999px;
}
.badge-highlight {
  background-color: #CBE98D;
  color: #09392B;
}
.badge-dark {
  background-color: #1C1C1C;
  color: #FFFFFF;
}
.badge-outline {
  background-color: transparent;
  border: 1px solid #7A221E;
  color: #7A221E;
}
```

---

## 5. Sombras (Shadows)

| Token                      | Valor                                  | Aplicação                         |
|----------------------------|----------------------------------------|-----------------------------------|
| `--ihf-shadow-none`        | `none`                                 | Reset                             |
| `--ihf-shadow-xs`          | `0px 1px 2px rgba(0, 0, 0, 0.04)`     | Inputs, elementos menores          |
| `--ihf-shadow-sm`          | `0px 2px 8px rgba(0, 0, 0, 0.04)`     | Header fixo                        |
| `--ihf-shadow-md`          | `0px 8px 24px rgba(0, 0, 0, 0.06)`    | Cards de conteúdo                  |
| `--ihf-shadow-lg`          | `0px 12px 32px rgba(0, 0, 0, 0.1)`    | Cards em hover                     |
| `--ihf-shadow-fab`         | `0px 4px 16px rgba(0, 0, 0, 0.15)`    | Floating Action Button             |
| `--ihf-shadow-focus`       | `0 0 0 3px rgba(122, 34, 30, 0.1)`    | Focus ring de inputs               |

---

## 6. Border Radius

| Token                      | Valor       | Aplicação                                    |
|----------------------------|-------------|----------------------------------------------|
| `--ihf-radius-none`        | `0px`       | Reset                                         |
| `--ihf-radius-sm`          | `4px`       | Tags pequenas, elementos inline               |
| `--ihf-radius-md`          | `8px`       | Inputs, botões de nav, dropdowns               |
| `--ihf-radius-lg`          | `16px`      | Cards padrão, glassmorphism hero               |
| `--ihf-radius-xl`          | `20px`      | Cards de destaque (verde floresta)              |
| `--ihf-radius-2xl`         | `24px`      | Seções arredondadas, cards grandes              |
| `--ihf-radius-full`        | `9999px`    | Botões (pill shape), badges, FAB, avatares     |

---

## 7. Transições e Animações

### 7.1 Durações

| Token                       | Valor   | Aplicação                                     |
|-----------------------------|---------|-----------------------------------------------|
| `--ihf-transition-fast`     | `0.15s` | Hover de links, mudança de cor                 |
| `--ihf-transition-normal`   | `0.3s`  | Hover de cards, botões, transições padrão      |
| `--ihf-transition-slow`     | `0.5s`  | Animações de entrada, slides                   |

### 7.2 Easing

```css
--ihf-ease-default: ease;
--ihf-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ihf-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 7.3 Padrões de Animação Observados

- **Hero Banner**: Carrossel com slides automáticos (auto-play), transição suave entre imagens (`fade` ou `slide`).
- **Cards em Hover**: `translateY(-4px)` com sombra ampliada.
- **Botões em Hover**: `translateY(-1px)` com cor mais escura.
- **Scroll Reveal**: Elementos aparecem com `fade-in` + `translateY(20px)` ao entrar no viewport.
- **Logos de Parceiros**: Carrossel horizontal com scroll automático infinito.
- **Contadores Numéricos**: Animação de contagem progressiva ao entrar no viewport.

---

## 8. Ícones e Grafismos

### 8.1 Sistema de Ícones

O site utiliza **SVGs inline/customizados** — não depende de bibliotecas de ícones externas (Font Awesome, Material Icons, etc.).

| Ícone                  | Arquivo / Descrição                              | Uso                                 |
|------------------------|--------------------------------------------------|-------------------------------------|
| Seta Direita `→`       | `/assets/svg/arrow-right-cta.svg`                | CTAs primários ("Conheça nossas soluções →") |
| Seta Diagonal `↗`      | `/assets/svg/arrow-right-blue.svg` (variação)    | Links externos, botões outline      |
| Link Externo           | `/assets/svg/external-link.svg`                  | Materiais e downloads               |
| Facebook               | `Vector.svg`                                     | Rodapé - redes sociais              |
| Instagram              | `Vector1.svg`                                    | Rodapé - redes sociais              |
| LinkedIn               | `Vector2.svg`                                    | Rodapé - redes sociais              |
| WhatsApp               | `tabler_brand-whatsapp.svg`                      | Rodapé - redes sociais              |
| Email                  | PNG personalizado                                | Rodapé - contato                    |

### 8.2 Logotipo

```
┌──────────────┐
│   IMPACT     │
│    HUB       │  ← Bloco retangular vermelho (#7A221E)
└──────────────┘     Texto branco (#FFFFFF) em caixa alta
                     Font Weight: 800 (ExtraBold)
                     Seguido do nome da cidade: "Floripa", "São Paulo", etc.
                     Nome da cidade em peso 400–500, cor escura
```

- Variação **dark**: Bloco branco com texto vermelho (para uso em fundo escuro — visível no footer).
- Proporção do bloco: aproximadamente **quadrado** (1:1.1).

---

## 9. Layout e Breakpoints

### 9.1 Breakpoints

| Token                    | Valor      | Descrição                         |
|--------------------------|------------|-----------------------------------|
| `--ihf-breakpoint-sm`    | `576px`    | Mobile landscape                  |
| `--ihf-breakpoint-md`    | `768px`    | Tablet                            |
| `--ihf-breakpoint-lg`    | `992px`    | Desktop pequeno                   |
| `--ihf-breakpoint-xl`    | `1200px`   | Desktop padrão                    |
| `--ihf-breakpoint-2xl`   | `1400px`   | Desktop grande / widescreen       |

### 9.2 Padrões de Layout

| Seção                    | Desktop                         | Mobile                           |
|--------------------------|--------------------------------|----------------------------------|
| **Header**               | Flex horizontal, logo + nav + CTAs | Hamburger menu lateral           |
| **Hero**                 | Full-width, card glass à esquerda, watermark à direita | Full-width, card empilhado       |
| **Programas**            | Grid 2 colunas com imagem à esquerda | Stack vertical, 1 coluna          |
| **Métricas/Números**     | Grid 3–4 colunas              | Grid 2 colunas                    |
| **Parceiros**            | Carrossel horizontal           | Carrossel horizontal (menos itens)|
| **Coworkings**           | Grid 3 colunas                 | Stack vertical, 1 coluna          |
| **Blog**                 | Grid 3 colunas                 | Carrossel horizontal              |
| **Footer**               | Grid 5 colunas por hub         | Stack vertical                   |

---

## 10. Personalidade Visual e Tom

### 10.1 Princípios de Design

1. **Impacto com Elegância** — O borgonha `#7A221E` transmite seriedade, confiança e compromisso. Não é um vermelho gritante — é sofisticado, profundo.
2. **Natureza e Sustentabilidade** — O verde floresta `#09392B` com o lime `#CBE98D` reforçam o pilar ambiental sem serem "genéricos ecológicos".
3. **Modernidade Clean** — Espaçamentos generosos, cantos arredondados, glassmorphism sutil. Nada pesado ou poluído.
4. **Tipografia com Personalidade** — Montserrat dá um toque geométrico e amigável, sem ser informal. Pesos variados criam hierarquia clara.
5. **Pill Buttons** — Forma arredondada nos botões transmite acessibilidade e convite à ação.

### 10.2 O Que Evitar

- ❌ Cores primárias puras (vermelho, azul, verde puros)
- ❌ Cantos completamente retos em cards e botões
- ❌ Fontes serifadas ou manuscritas
- ❌ Excesso de sombras pesadas
- ❌ Backgrounds totalmente brancos sem variação de tom
- ❌ Ícones de bibliotecas genéricas (usar SVGs customizados)

---

## 11. Referência Rápida de CSS Variables

```css
:root {
  /* ═══ CORES DA MARCA ═══ */
  --ihf-brand-primary:     #7A221E;
  --ihf-brand-dark:        #6B1D19;
  --ihf-brand-forest:      #09392B;
  --ihf-brand-lime:        #CBE98D;
  --ihf-brand-lime-alt:    #CFE899;

  /* ═══ SUPERFÍCIES ═══ */
  --ihf-bg-primary:        #F9F9F6;
  --ihf-bg-white:          #FFFFFF;
  --ihf-bg-light:          #F5F5F2;
  --ihf-bg-dark:           #1F1F1F;
  --ihf-bg-dark-alt:       #1C1C1C;

  /* ═══ TEXTO ═══ */
  --ihf-text-primary:      #1C1C1C;
  --ihf-text-heading:      #7A221E;
  --ihf-text-body:         #333333;
  --ihf-text-body-alt:     #444444;
  --ihf-text-muted:        #666666;
  --ihf-text-label:        #888888;
  --ihf-text-on-dark:      #FFFFFF;

  /* ═══ BORDAS ═══ */
  --ihf-border-light:      #E5E5E5;
  --ihf-border-input:      #CCCCCC;
  --ihf-border-input-focus: #7A221E;

  /* ═══ TIPOGRAFIA ═══ */
  --ihf-font-primary:      'Montserrat', 'Outfit', 'Plus Jakarta Sans', -apple-system, sans-serif;
  --ihf-font-size-xs:      11px;
  --ihf-font-size-sm:      13px;
  --ihf-font-size-base:    15px;
  --ihf-font-size-md:      16px;
  --ihf-font-size-lg:      20px;
  --ihf-font-size-xl:      28px;
  --ihf-font-size-2xl:     36px;
  --ihf-font-size-3xl:     48px;
  --ihf-font-size-display: 80px;

  /* ═══ ESPAÇAMENTO ═══ */
  --ihf-space-xs:          4px;
  --ihf-space-sm:          8px;
  --ihf-space-md:          16px;
  --ihf-space-lg:          24px;
  --ihf-space-xl:          32px;
  --ihf-space-2xl:         48px;
  --ihf-space-3xl:         64px;
  --ihf-space-4xl:         80px;
  --ihf-space-5xl:         120px;

  /* ═══ SOMBRAS ═══ */
  --ihf-shadow-xs:         0px 1px 2px rgba(0, 0, 0, 0.04);
  --ihf-shadow-sm:         0px 2px 8px rgba(0, 0, 0, 0.04);
  --ihf-shadow-md:         0px 8px 24px rgba(0, 0, 0, 0.06);
  --ihf-shadow-lg:         0px 12px 32px rgba(0, 0, 0, 0.1);
  --ihf-shadow-fab:        0px 4px 16px rgba(0, 0, 0, 0.15);
  --ihf-shadow-focus:      0 0 0 3px rgba(122, 34, 30, 0.1);

  /* ═══ BORDER RADIUS ═══ */
  --ihf-radius-sm:         4px;
  --ihf-radius-md:         8px;
  --ihf-radius-lg:         16px;
  --ihf-radius-xl:         20px;
  --ihf-radius-2xl:        24px;
  --ihf-radius-full:       9999px;

  /* ═══ TRANSIÇÕES ═══ */
  --ihf-transition-fast:   0.15s ease;
  --ihf-transition-normal: 0.3s ease;
  --ihf-transition-slow:   0.5s ease;

  /* ═══ LAYOUT ═══ */
  --ihf-container-max:     1200px;
  --ihf-container-padding: 24px;
  --ihf-gutter:            24px;
}
```

---

## 12. Capturas de Referência

> As capturas do site original estão armazenadas nos screenshots do browser subagent para referência visual.
> - **Hero + Programas**: Vista completa da homepage com banner, glassmorphism card e seção de programas.
> - **Parceiros + Espaços**: Carrossel de logos e grid de coworkings com imagens.
> - **Footer**: Rodapé escuro com grid de unidades, redes sociais e copyright.

---

> ⚠️ **Nota**: Este documento é a **fonte de verdade** do design system para a v2 do portal.
> Toda decisão de cor, tipografia, espaçamento e componente deve referenciar este arquivo.
> Última atualização: **15 de setembro de 2026**.

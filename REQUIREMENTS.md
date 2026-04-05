# Especificações da Landing Page - Florianópolis Invest

## Correções do Usuário
- **Endereço 1**: Rio Branco (mantém as coordenadas -27.590, -48.552)
- **Endereço 2**: Osmar Cunha (corrigido de "Osmar Coimbra", coordenadas -27.592, -48.553)
- **Seção de Valorização**: Incluir "Marina e Píer" além dos itens existentes
- **Avisos Legais**: Adicionar texto "Imagens meramente ilustrativas" em todas as imagens

## Melhorias Implementadas (do PDF)

### 1. Animações e Interatividade com Framer Motion
- **Hero Section**: Zoom suave no background (10s)
- **Fade-in ao Scroll**: Todas as seções principais com animações de entrada
- **Hover Effects**: Cards de tipologias com movimento lateral
- **Scroll Indicator**: Animação pulsante no hero
- **Staggered Animations**: Elementos entram com delay para criar ritmo visual

### 2. Integração do Google Maps
- **MapView Component**: Integrado na seção de Localização
- **Coordenadas Precisas**: Rio Branco e Osmar Cunha
- **Marcadores Interativos**: Ambos os projetos aparecem no mapa
- **Zoom e Controles**: Mapa com zoom 15 e navegação

### 3. Formulário de Cadastro Aprimorado
- **Validação de Campos**: Todos os campos com `required`
- **Feedback Visual**: Transição de cor ao focar, placeholders descritivos
- **Confirmação de Envio**: Mensagem de sucesso com CheckCircle2
- **Design Responsivo**: Grid 2 colunas desktop, 1 coluna mobile
- **Acessibilidade**: Labels descritivos e semântica HTML correta

### 4. Design Visual Refinado
- **Header Dinâmico**: Transparente no topo, background/blur ao scroll
- **Tipografia Hierárquica**: Montserrat Bold para títulos, Inter Regular para corpo
- **Paleta de Cores**: Azul Corporativo #004065, Branco, Cinza Elegante
- **Espaçamento Generoso**: Padding e gaps aumentados para respiração visual
- **Badges e Tags**: Indicadores visuais para diferenciais
- **Cards com Sombras**: Profundidade visual com sombras sutis
- **Bordas Arredondadas**: Raio 0.5rem em todos os elementos

### 5. Seções Reorganizadas e Expandidas
- **Tipologias**: Numeração visual (01, 02, 03), cards com hover, descrições claras, badge "100% Equipado"
- **Localização**: Google Maps interativo, cards de projetos com ícones, tags de diferencial (Vista Mar, Ponte, Marina)
- **Marina**: Histórico de valorização em tabela, ícone de status "Próximo ao Futuro", narrativa de crescimento patrimonial
- **CTA (Call-to-Action)**: Seção em azul corporativo com padrão geométrico, benefícios com checkmarks, formulário destacado

### 6. Footer Completo e Profissional
- **4 Colunas**: Sobre, Projetos, Institucional, Contato
- **Links Internos e Externos**: Navegação facilitada
- **Ícones Sociais**: Placeholders para redes sociais
- **Copyright e Créditos**: Informações legais
- **Botão "Falar com Especialista"**: CTA secundário

### 7. Responsividade Completa
- **Mobile**: Stack vertical, fonte reduzida, navegação otimizada
- **Tablet**: Grid 1-2 colunas
- **Desktop**: Grid 2 colunas com layouts assimétricos
- **Elementos Responsivos**: Imagens com aspect-ratio mantido, tipografia escalável, espaçamento adaptativo

### 8. Acessibilidade e UX
- **Selection Styling**: Cores personalizadas para seleção de texto
- **Keyboard Navigation**: Links e botões navegáveis via teclado
- **Contraste**: Texto com contraste adequado (WCAG AA)
- **Semântica HTML**: Uso correto de headings, labels, etc.
- **Loading States**: Feedback visual em interações

### 9. Performance e Otimizações
- **Lazy Loading**: Imagens carregadas sob demanda
- **Viewport Triggers**: Animações acionadas apenas quando visíveis
- **CSS Otimizado**: Tailwind CSS com purge de classes não usadas
- **Framer Motion**: Transições GPU-aceleradas

### 10. Detalhes Técnicos
- **Dependências**: Framer Motion, Lucide React, Google Maps API
- **Componentes**: Map.tsx para integração de mapas
- **Estrutura**: Modular, reutilizável, bem documentada

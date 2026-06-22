# 📺 IPTV Player

Um player de IPTV moderno e funcional que funciona em múltiplas plataformas (Web, Desktop e Mobile).

## ✨ Características

- ✅ **Suporte a Playlists M3U** - Carregue suas playlists IPTV facilmente
- ✅ **Player de Vídeo Integrado** - Suporta HLS, DASH e HTTP streams
- ✅ **Múltiplas Plataformas** - Web, Desktop (Electron), Mobile (PWA)
- ✅ **Sistema de Favoritos** - Salve seus canais preferidos
- ✅ **Busca e Filtro** - Procure canais por nome ou categoria
- ✅ **Design Responsivo** - Adapta-se a qualquer tamanho de tela
- ✅ **Interface Moderna** - Dark mode elegante e intuitivo

## 🚀 Começar Rápido

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. **Clone ou acesse o diretório do projeto:**
```bash
cd D:\JEREMIAS\IPTV
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

O aplicativo abrirá em `http://localhost:5173`

## 📱 Como Usar

### 1. Carregar uma Playlist

Quando você abrir o app pela primeira vez, verá a tela de carregamento:

**Opção 1 - Usar Playlists Pré-configuradas** (Recomendado)
- Clique em "Brasil (IPTV-ORG)" para carregar canais brasileiros
- Ou clique em "Todos os Canais (IPTV-ORG)" para mais opções

**Opção 2 - Carregar sua Própria Playlist**
- Cole a URL de sua playlist M3U no campo
- Clique em "Carregar"

### 2. Assistir Canais

- Clique em qualquer canal na lista da direita para reproduzir
- Use os controles do vídeo para pausar, mudar volume, etc.
- O nome do canal aparece abaixo do player

### 3. Gerenciar Favoritos

- Clique na estrela ⭐ próximo ao nome do canal para adicionar/remover dos favoritos
- Seus favoritos são salvos automaticamente no navegador
- Favoritos aparecem no topo da lista quando você não está buscando

### 4. Buscar Canais

- Use a barra de busca no topo da lista para filtrar por nome
- Os resultados aparecem em tempo real

### 5. Trocar Playlist

- Clique em "⚙ Trocar Playlist" no canto superior direito
- Selecione uma nova playlist para carregá-la

## 🏗️ Estrutura do Projeto

```
IPTV/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Player.jsx       # Player de vídeo
│   │   ├── ChannelList.jsx  # Lista de canais
│   │   ├── PlaylistLoader.jsx # Carregador de playlist
│   │   └── SearchBar.jsx    # Barra de busca
│   ├── utils/
│   │   └── m3uParser.js     # Parser de playlists M3U
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos principais
│   ├── index.css            # Estilos globais
│   └── main.jsx             # Ponto de entrada do React
├── index.html               # HTML principal
├── vite.config.js           # Configuração do Vite
├── package.json             # Dependências do projeto
└── README.md                # Este arquivo
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói o projeto para produção (web)
- `npm run preview` - Visualiza o build de produção localmente
- `npm run electron` - Abre o app em Electron (requer build antes)
- `npm run electron-dev` - Inicia Electron com hot-reload
- `npm run electron-build` - Cria executável do Electron

## 📊 Playlists Recomendadas

### Gratuitas e Legais
1. **IPTV-ORG Brasil** (Padrão)
   - URL: `https://raw.githubusercontent.com/iptv-org/iptv/master/streams/br.m3u`
   - Canais públicos e legalmente disponíveis

2. **IPTV-ORG Completo**
   - URL: `https://raw.githubusercontent.com/iptv-org/iptv/master/index.m3u`
   - Canais de todo o mundo

### Adicionar sua Própria Playlist
- Você pode usar qualquer playlist M3U válida
- A playlist deve conter linhas no formato:
  ```
  #EXTINF:-1 tvg-logo="URL_LOGO" group-title="CATEGORIA", NOME_CANAL
  URL_DO_STREAM
  ```

## 🔧 Build para Produção

### Web (Recomendado)
```bash
npm run build
# Arquivos em dist-web/
```

### Desktop (Electron)
```bash
npm run electron-build
# Executável em dist/
```

## 🌐 Deploy

O app pode ser facilmente deployado em:
- **Vercel** - Drag & drop
- **Netlify** - Suporta React/Vite
- **GitHub Pages** - Build estático
- **Seu próprio servidor** - Servir arquivos estáticos

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal.

## ⚠️ Aviso Legal

- Respeite os direitos autorais ao adicionar playlists
- Use apenas conteúdo que você tem direito de acessar
- O desenvolvedor não é responsável por conteúdo ou uso indevido

## 💡 Dicas e Truques

- Favoritos são salvos no localStorage - não são perdidos ao recarregar
- O player suporta atalhos de teclado padrão (espaço para play/pause, etc)
- Use URLs HTTPS para evitar problemas de CORS
- Se um canal não funciona, pode ser que o link esteja expirado ou indisponível

## 🐛 Problemas Comuns

**"Erro ao carregar playlist"**
- Verifique se a URL está acessível
- Tente HTTPS em vez de HTTP
- Alguns provedores podem bloquear acesso direto

**"Vídeo não carrega"**
- O link pode estar expirado
- Verifique sua conexão com a internet
- Tente outro canal

**"Problema de CORS"**
- Alguns servidores bloqueiam requisições cross-origin
- Use uma playlist que suporte CORS

## 📞 Suporte

Para mais informações ou sugestões, você pode:
- Criar um issue no repositório
- Verificar a documentação do IPTV-ORG: https://github.com/iptv-org/iptv

---

**Aproveite seus programas favoritos! 📺✨**

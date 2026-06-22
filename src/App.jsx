import { useState, useEffect, useRef } from 'react'
import './App.css'
import Player from './components/Player'
import ChannelList from './components/ChannelList'
import PlaylistLoader from './components/PlaylistLoader'
import SearchBar from './components/SearchBar'

function App() {
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('iptv-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPlaylistLoader, setShowPlaylistLoader] = useState(!channels.length)

  useEffect(() => {
    localStorage.setItem('iptv-favorites', JSON.stringify(favorites))
  }, [favorites])

  const handlePlaylistLoaded = (loadedChannels) => {
    setChannels(loadedChannels)
    setShowPlaylistLoader(false)
    if (loadedChannels.length > 0) {
      setCurrentChannel(loadedChannels[0])
    }
  }

  const filteredChannels = channels.filter(ch =>
    ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.group?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFavorite = (channelName) => {
    setFavorites(prev =>
      prev.includes(channelName)
        ? prev.filter(fav => fav !== channelName)
        : [...prev, channelName]
    )
  }

  const isFavorite = currentChannel && favorites.includes(currentChannel.name)

  return (
    <div className="app">
      {showPlaylistLoader ? (
        <PlaylistLoader onPlaylistLoaded={handlePlaylistLoaded} />
      ) : (
        <>
          <div className="player-section">
            <Player channel={currentChannel} />
            {currentChannel && (
              <div className="channel-info">
                <h2>{currentChannel.name}</h2>
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(currentChannel.name)}
                  title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  ★
                </button>
              </div>
            )}
          </div>

          <div className="sidebar">
            <div className="sidebar-header">
              <h1>IPTV Player</h1>
              <button
                className="change-playlist-btn"
                onClick={() => setShowPlaylistLoader(true)}
              >
                ⚙ Trocar Playlist
              </button>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="channel-list-container">
              <div className="list-title">
                {favorites.length > 0 && !searchQuery && (
                  <>
                    <h3>⭐ Favoritos ({favorites.length})</h3>
                    <ChannelList
                      channels={filteredChannels.filter(ch => favorites.includes(ch.name))}
                      currentChannel={currentChannel}
                      onSelectChannel={setCurrentChannel}
                      isFavorite={isFavorite}
                      onToggleFavorite={toggleFavorite}
                    />
                  </>
                )}
              </div>

              <h3>📺 Todos os Canais ({filteredChannels.length})</h3>
              <ChannelList
                channels={filteredChannels}
                currentChannel={currentChannel}
                onSelectChannel={setCurrentChannel}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App

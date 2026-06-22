import { useState } from 'react'
import './PlaylistLoader.css'
import { parseM3U } from '../utils/m3uParser'

const PRESET_PLAYLISTS = [
  {
    name: 'Brasil (IPTV-ORG)',
    url: 'https://raw.githubusercontent.com/iptv-org/iptv/master/streams/br.m3u',
  },
  {
    name: 'Todos os Canais (IPTV-ORG)',
    url: 'https://raw.githubusercontent.com/iptv-org/iptv/master/index.m3u',
  },
]

export default function PlaylistLoader({ onPlaylistLoaded }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadPlaylist = async (playlistUrl) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(playlistUrl, {
        mode: 'cors',
        headers: {
          'Accept': '*/*',
        }
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const text = await response.text()
      const channels = parseM3U(text)

      if (channels.length === 0) {
        throw new Error('Nenhum canal encontrado na playlist')
      }

      onPlaylistLoaded(channels)
    } catch (err) {
      setError(`Erro ao carregar playlist: ${err.message}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadPreset = (presetUrl) => {
    setUrl(presetUrl)
    loadPlaylist(presetUrl)
  }

  const handleLoadCustom = (e) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Por favor, insira uma URL válida')
      return
    }
    loadPlaylist(url.trim())
  }

  return (
    <div className="playlist-loader">
      <div className="loader-container">
        <h1>📺 IPTV Player</h1>
        <p>Carregue uma playlist M3U para começar</p>

        <div className="preset-section">
          <h2>Playlists Populares</h2>
          <div className="preset-buttons">
            {PRESET_PLAYLISTS.map(preset => (
              <button
                key={preset.url}
                className="preset-btn"
                onClick={() => handleLoadPreset(preset.url)}
                disabled={loading}
              >
                {loading && url === preset.url ? '⏳' : '▶'} {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="divider">ou</div>

        <form onSubmit={handleLoadCustom} className="custom-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Cole aqui a URL de sua playlist M3U"
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !url.trim()}>
              {loading ? '⏳ Carregando...' : '🔄 Carregar'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-box">
            <p>❌ {error}</p>
          </div>
        )}

        <div className="info-box">
          <h3>💡 Onde obter uma playlist?</h3>
          <ul>
            <li>Use as playlists populares acima (recomendado)</li>
            <li>Ou forneça a URL de sua própria playlist M3U</li>
            <li>A playlist deve estar em formato M3U com links válidos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

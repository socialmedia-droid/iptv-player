import { useEffect, useRef, useState } from 'react'
import HLS from 'hls.js'
import './Player.css'

export default function Player({ channel }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!channel || !videoRef.current) return

    setError(null)
    const video = videoRef.current
    const url = channel.url

    if (!url) {
      setError('URL do canal não disponível')
      return
    }

    // Limpar HLS anterior
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    if (url.includes('.m3u8') || url.includes('.m3u')) {
      // Usar HLS.js para streams HLS
      if (HLS.isSupported()) {
        const hls = new HLS({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
        })
        hlsRef.current = hls
        hls.loadSource(url)
        hls.attachMedia(video)
        hls.on(HLS.Events.MANIFEST_PARSED, () => {
          video.play().catch(err => {
            console.error('Erro ao reproduzir:', err)
          })
          setIsPlaying(true)
        })
        hls.on(HLS.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setError(`Erro ao carregar: ${data.type}`)
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback para navegadores que suportam HLS nativamente (Safari)
        video.src = url
        video.play().catch(err => {
          console.error('Erro ao reproduzir:', err)
        })
        setIsPlaying(true)
      }
    } else {
      // Para outros tipos de stream (HTTP, MP4, etc)
      video.src = url
      video.play().catch(err => {
        console.error('Erro ao reproduzir:', err)
      })
      setIsPlaying(true)
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [channel])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => console.error('Erro:', err))
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="player">
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <small>Verifique se a URL é válida e está acessível</small>
        </div>
      )}
      <div className="video-container">
        <video
          ref={videoRef}
          controls
          autoPlay
          controlsList="nodownload"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
}

import './ChannelList.css'

export default function ChannelList({
  channels,
  currentChannel,
  onSelectChannel,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <div className="channel-list">
      {channels.length === 0 ? (
        <div className="no-channels">
          <p>Nenhum canal encontrado</p>
        </div>
      ) : (
        channels.map(channel => (
          <div
            key={`${channel.name}-${channel.url}`}
            className={`channel-item ${
              currentChannel?.name === channel.name ? 'active' : ''
            }`}
            onClick={() => onSelectChannel(channel)}
          >
            <div className="channel-name">
              {channel.logo && (
                <img src={channel.logo} alt={channel.name} className="channel-logo" />
              )}
              <span>{channel.name}</span>
            </div>
            <button
              className={`star-btn ${isFavorite && currentChannel?.name === channel.name ? 'active' : ''}`}
              onClick={e => {
                e.stopPropagation()
                onToggleFavorite(channel.name)
              }}
              title="Adicionar aos favoritos"
            >
              ★
            </button>
          </div>
        ))
      )}
    </div>
  )
}

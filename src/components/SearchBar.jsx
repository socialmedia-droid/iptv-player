import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Buscar canais..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="search-input"
      />
      {value && (
        <button
          className="clear-btn"
          onClick={() => onChange('')}
          title="Limpar busca"
        >
          ✕
        </button>
      )}
    </div>
  )
}

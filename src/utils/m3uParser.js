export function parseM3U(content) {
  const lines = content.split('\n').map(line => line.trim())
  const channels = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('#EXTINF:')) {
      const extinf = line.substring(8)
      const parts = extinf.split(',')
      const metadata = parts[0]
      const name = parts.slice(1).join(',').trim()

      // Parse metadata
      let logo = ''
      let group = ''
      const logoMatch = metadata.match(/tvg-logo="([^"]*)"/)
      const groupMatch = metadata.match(/group-title="([^"]*)"/)

      if (logoMatch) logo = logoMatch[1]
      if (groupMatch) group = groupMatch[1]

      // Get next line as URL
      if (i + 1 < lines.length) {
        const url = lines[i + 1]
        if (url && !url.startsWith('#') && url.length > 0) {
          channels.push({
            name: name || 'Unknown',
            url,
            logo,
            group: group || 'Outros',
          })
          i++
        }
      }
    }
  }

  return channels
}

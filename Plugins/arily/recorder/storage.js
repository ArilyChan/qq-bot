class storage {
  constructor (options = {}) {
    this.messages = new Map()
    this.events = new Map()
    this.notices = new Map()
    this.requests = new Map()
    this.maxEntries = options.maxEntries || 10384
  }

  copy (meta) {
    return JSON.parse(JSON.stringify(meta))
  }

  record (meta) {
    meta = this.copy(meta)
    switch (meta.postType) {
      case 'message': {
        this.messages.set(meta.messageId, meta)
        if (this.messages.size > this.maxEntries) {
          Array.from(this.messages.keys())
            .slice(0, 100)
            .map(key => this.messages.delete(key))
        }
        break
      }
      case 'notice':
      case 'request':
        break
      case 'meta_event':
        break
      default:
        console.warn('unknown type')
    }
  }

  delete (meta) {
    switch (meta.postType) {
      case 'message': {
        this.messages.delete(meta.messageId)
        break
      }
      case 'notice':
      case 'request':
        break
      case 'meta_event':
        break
      default:
        console.warn('unknown type')
    }
  }
}

module.exports = storage

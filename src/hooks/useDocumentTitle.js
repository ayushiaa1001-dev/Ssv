import { useEffect } from 'react'

const BASE_TITLE = 'SSV Pharmaceuticals'

/**
 * Sets `document.title` on mount and restores the base title on unmount.
 * @param {string} title — Page-specific title (e.g. "About Us")
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE
    return () => {
      document.title = prev
    }
  }, [title])
}

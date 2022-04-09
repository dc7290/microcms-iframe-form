import { useEffect, useState } from 'react'

import { microcmsUpdateStyle } from '../utils/microcms'

export const useMicrocms = () => {
  const [, setId] = useState('')

  useEffect(() => {
    const setDefaultId = (event: MessageEvent) => {
      if (event.isTrusted === true && event.data.action === 'MICROCMS_GET_DEFAULT_DATA') {
        setId(event.data.id)
        microcmsUpdateStyle({
          id: event.data.id,
          message: { height: 600 },
        })
      }
    }

    window.addEventListener('message', setDefaultId)

    return () => {
      window.removeEventListener('message', setDefaultId)
    }
  }, [])

  return {}
}

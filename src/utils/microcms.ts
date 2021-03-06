import { CSSProperties } from 'react'

import { Form } from '../types/Form'

type Message = {
  id?: string // iFrame識別子
  title?: string
  description?: string
  imageUrl?: string
  updatedAt?: Date
  data: Form
}

type Data = {
  id: string
  message: Message
}

type Style = {
  id: string
  message: {
    width?: CSSProperties['width']
    height?: CSSProperties['height']
  }
}

const url = `https://${process.env.NEXT_PUBLIC_SERVICE_ID}.microcms.io`

export const microcmsPostData = (data: Data) => {
  window.parent.postMessage(
    {
      ...data,
      action: 'MICROCMS_POST_DATA',
    },
    url
  )
}

export const microcmsUpdateStyle = (style: Style) => {
  window.parent.postMessage(
    {
      ...style,
      action: 'MICROCMS_UPDATE_STYLE',
    },
    url
  )
}

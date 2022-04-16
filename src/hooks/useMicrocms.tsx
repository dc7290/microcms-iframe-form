import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Form } from '~/src/types/Form'

import { Notification } from '../components/Notification'
import { microcmsPostData, microcmsUpdateStyle } from '../utils/microcms'

export const useMicrocms = () => {
  const [id, setId] = useState('')
  const [data, setData] = useState<Form>()

  useEffect(() => {
    const setDefaultId = (event: MessageEvent) => {
      if (event.isTrusted === true && event.data.action === 'MICROCMS_GET_DEFAULT_DATA') {
        setId(event.data.id)
        setData(event.data.message?.data)
        microcmsUpdateStyle({
          id: event.data.id,
          message: { height: 600 },
        })
      } else if (event.isTrusted === true && event.data.action === 'MICROCMS_POST_DATA_SUCCESS') {
        toast.custom(<Notification state="success">microCMSにデータを連携しました</Notification>, { duration: 1000 })
      } else if (event.isTrusted === true && event.data.action === 'MICROCMS_POST_DATA_FAILURE') {
        toast.custom(<Notification state="error">保存に失敗しました</Notification>)
      }
    }

    window.addEventListener('message', setDefaultId)

    return () => {
      window.removeEventListener('message', setDefaultId)
    }
  }, [])

  const saveData = useCallback(
    (form: Form) => {
      microcmsPostData({
        id,
        message: {
          updatedAt: new Date(),
          data: form,
        },
      })
    },
    [id]
  )

  return [data, saveData] as const
}

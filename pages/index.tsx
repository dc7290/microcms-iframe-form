import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { AppendFieldsSection } from '~/src/components/AppendFieldsSection'
import { EditSideBar } from '~/src/components/EditSideBar'
import { FieldsList } from '~/src/components/FieldsList'
import { PrimaryButton } from '~/src/components/PrimaryButton'
import { useCurrentTargetIdSetValue } from '~/src/components/contexts/currentTagetId'
import { useMicrocms } from '~/src/hooks/useMicrocms'
import { FormKind, FormValuesType } from '~/src/types/Form'

const IndexPage = () => {
  const [data, saveData] = useMicrocms()

  const setCurrentTargetId = useCurrentTargetIdSetValue()

  const methods = useForm<FormValuesType>({})
  const { fields, append, remove, move, swap, replace } = useFieldArray({ name: 'form', control: methods.control })

  useEffect(() => {
    if (data !== undefined) {
      replace(data)
    }
  }, [data, replace])

  const handleAppend = (kind: FormKind) => () => {
    const fieldId = uuidv4()
    append({ fieldId, kind })

    // appendによる再レンダリングに違うステート更新を含められない
    setTimeout(() => {
      setCurrentTargetId(fieldId)
    }, 1)
  }
  const handleRemove = (index: number) => () => {
    if (index !== -1) {
      remove(index)

      // removeによる再レンダリングに違うステート更新を含められない
      setTimeout(() => {
        setCurrentTargetId(null)
      }, 1)
    }
  }
  const handleSave = methods.handleSubmit(({ form }) => {
    saveData(form)
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <FormProvider {...methods}>
        <div className="relative flex h-[600px] min-w-[800px] rounded-md bg-gray-100">
          <AppendFieldsSection handleAppend={handleAppend} />

          <EditSideBar fields={fields} handleRemove={handleRemove} />

          <motion.div layoutScroll className="h-full flex-1 overflow-y-auto px-16 pb-10">
            {fields.length === 0 ? (
              <p className="mt-10 text-center text-sm text-gray-500">
                左の項目から選択してフィールドを追加してください
              </p>
            ) : (
              <FieldsList fields={fields} handleRemove={handleRemove} move={move} swap={swap} />
            )}
            <motion.div className="mt-14 flex justify-center">
              <PrimaryButton type="button" onClick={handleSave}>
                保存する
              </PrimaryButton>
            </motion.div>
          </motion.div>
        </div>

        <Toaster position="top-right" />
      </FormProvider>
    </DndProvider>
  )
}

export default IndexPage

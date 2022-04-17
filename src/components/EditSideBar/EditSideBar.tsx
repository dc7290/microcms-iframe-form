import XIcon from '@heroicons/react/outline/XIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

import { InputGroupControl } from '../InputGroupControl'
import { SwitchGroupControl } from '../SwitchGroupControl'
import { TextareaGroupControl } from '../TextareaGroupControl'
import { useCurrentTargetIdSetValue, useCurrentTargetIdValue } from '../contexts/currentTagetId'

type Props = {
  fields: FieldArrayWithId<FormValuesType, 'form', 'id'>[]
  handleRemove: (index: number) => () => void
}

const EditSideBar = ({ fields, handleRemove }: Props) => {
  const { control } = useFormContext<FormValuesType>()

  const currentTargetId = useCurrentTargetIdValue()
  const setCurrentTargetId = useCurrentTargetIdSetValue()

  const index = fields.findIndex(({ fieldId }) => currentTargetId === fieldId)

  return (
    <AnimatePresence>
      {currentTargetId !== null && (
        <motion.div
          transition={{ ease: 'easeOut' }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="absolute inset-y-0 left-0 h-full w-1/3 max-w-xs rounded-r-md bg-indigo-100"
        >
          <button
            onClick={() => setCurrentTargetId(null)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border-2 border-white"
          >
            <XIcon className="h-6 w-6 text-white" />
          </button>

          <div className="flex h-20 items-center justify-center rounded-tr-md bg-indigo-700 text-xl font-bold text-white">
            項目編集
          </div>

          <div className="h-[calc(100%-5rem)] overflow-y-auto pt-8 pb-16">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={currentTargetId[0]}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 px-6 pb-2"
              >
                <InputGroupControl control={control} name={`form.${index}.title`} labelText="タイトル" />
                <InputGroupControl control={control} name={`form.${index}.placeholder`} labelText="プレースホルダー" />
                <TextareaGroupControl control={control} name={`form.${index}.description`} labelText="説明" />
                <SwitchGroupControl name={`form.${index}.isRequired`} control={control} defaultValue={false}>
                  必須チェックを行う
                </SwitchGroupControl>
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 px-6 text-center">
              <button
                type="button"
                onClick={handleRemove(index)}
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                削除する
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EditSideBar

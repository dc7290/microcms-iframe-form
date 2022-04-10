import { Switch } from '@headlessui/react'
import XIcon from '@heroicons/react/outline/XIcon'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

import { InputGroupControl } from '~/src/components/InputGroupControl'
import { useCurrentTargetIdSetValue, useCurrentTargetIdValue } from '~/src/components/contexts/currentTagetId'
import { TextField } from '~/src/components/fieds/TextField'
import { useMicrocms } from '~/src/hooks/useMicrocms'
import { FormKind, FormValuesType } from '~/src/types/Form'

const IndexPage = () => {
  useMicrocms()

  const currentTargetId = useCurrentTargetIdValue()
  const setCurrentTargetId = useCurrentTargetIdSetValue()

  const { control, watch, handleSubmit } = useForm<FormValuesType>()
  const { fields, append, remove } = useFieldArray({ name: 'form', control })

  const [isAppendRendering, setIsAppendRendering] = useState(false)
  useEffect(() => {
    if (isAppendRendering) {
      const id = fields.at(-1)?.id
      if (id !== undefined) {
        setCurrentTargetId(id)
        setIsAppendRendering(false)
      }
    }
  }, [fields, isAppendRendering, setCurrentTargetId])

  const handleAppend = (kind: FormKind) => () => {
    append({ kind })
    setIsAppendRendering(true)
  }
  const handleRemove = (index: number) => () => {
    if (index !== -1) {
      remove(index)
      setCurrentTargetId(null)
    }
  }

  return (
    <div className="relative flex h-[600px] min-w-[800px]">
      <div className="relative w-1/3 max-w-xs rounded-r-md bg-gray-100 pb-12 after:absolute after:inset-y-0 after:right-0 after:h-full after:w-3">
        <div className="flex h-20 items-center justify-center rounded-tr-md bg-gray-700 text-xl font-bold text-white">
          項目追加
        </div>
        <div className="mt-10 space-y-4 px-6">
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            onClick={handleAppend('text-field')}
          >
            テキストフィールドを追加する
          </button>
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            // eslint-disable-next-line no-console
            onClick={handleSubmit((data) => console.log(data))}
          >
            データを確認する
          </button>
        </div>
      </div>
      <AnimatePresence>
        {currentTargetId !== null && (
          <motion.div
            transition={{ ease: 'easeOut' }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute inset-y-0 left-0 h-full w-1/3 max-w-xs rounded-r-md bg-indigo-100 pb-16"
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
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={currentTargetId[0]}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 h-[calc(100%-)] space-y-8 overflow-y-auto px-6"
              >
                <InputGroupControl
                  control={control}
                  name={`form.${fields.findIndex(({ id }) => currentTargetId === id)}.title`}
                  labelText="タイトル"
                />
                <InputGroupControl
                  control={control}
                  name={`form.${fields.findIndex(({ id }) => currentTargetId === id)}.placeholder`}
                  labelText="プレースホルダー"
                />
                <Controller
                  name={`form.${fields.findIndex(({ id }) => currentTargetId === id)}.isRequired`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={value}
                        onChange={(e) => onChange(e)}
                        className={clsx(
                          value ? 'bg-indigo-600' : 'bg-gray-400',
                          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={clsx(
                            value ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                      <Switch.Label as="span" className="ml-3 cursor-pointer">
                        <span className="text-sm">必須チェックを行う</span>
                      </Switch.Label>
                    </Switch.Group>
                  )}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-20 px-6 text-center">
              <button
                type="button"
                onClick={handleRemove(fields.findIndex(({ id }) => currentTargetId === id))}
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                削除する
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-full flex-1 px-16">
        {fields.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-500">左の項目から選択してフィールドを追加してください</p>
        )}
        <div className="mx-auto h-full max-w-md space-y-10 overflow-y-auto">
          {fields.map((field, i) => {
            const isNoTarget = currentTargetId !== field.id
            switch (field.kind) {
              case 'text-field': {
                return (
                  <TextField
                    id={field.id}
                    handleRemove={handleRemove(i)}
                    isNoTarget={isNoTarget}
                    index={i}
                    control={control}
                    watch={watch}
                  />
                )
              }
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default IndexPage

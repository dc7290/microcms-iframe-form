import { Switch } from '@headlessui/react'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import XIcon from '@heroicons/react/outline/XIcon'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import type { NextLayoutPage } from 'next'
import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

import { useMicrocms } from '~/src/hooks/useMicrocms'
import { Form, FormKind } from '~/src/types/Form'

type FormValuesType = {
  form: Form
}

const IndexPage: NextLayoutPage = () => {
  useMicrocms()

  const [currentTargetId, setCurrentTargetId] = useState<string | null>(null)

  const { control, register, watch } = useForm<FormValuesType>()
  const { fields, append, remove } = useFieldArray({ name: 'form', control })

  const handleAppend = (kind: FormKind) => () => {
    append({ kind })
  }
  const handleRemove = (index: number) => () => {
    if (index !== -1) {
      remove(index)
      setCurrentTargetId(null)
    }
  }

  return (
    <div className="relative flex h-[600px] min-w-[800px]">
      <div className="relative w-2/5 rounded-r-md bg-gray-100 pb-12 after:absolute after:inset-y-0 after:right-0 after:h-full after:w-3">
        <div className="rounded-tr-md bg-gray-700 py-8 text-center text-xl font-bold text-white">項目追加</div>
        <div className="mt-10 space-y-4 px-6">
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            onClick={handleAppend('text-field')}
          >
            テキストフィールドを追加する
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
            className="absolute inset-y-0 left-0 h-full w-2/5 rounded-r-md bg-indigo-100 pb-16"
          >
            <button
              onClick={() => setCurrentTargetId(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border-2 border-white"
            >
              <XIcon className="h-6 w-6 text-white" />
            </button>

            <div className="rounded-tr-md bg-indigo-700 py-8 text-center text-xl font-bold text-white">項目編集</div>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={currentTargetId[0]}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 space-y-2 px-6"
              >
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
      <div className="h-full flex-1 space-y-10 overflow-y-auto px-14">
        {fields.length === 0 && (
          <p className="mt-10 text-sm text-gray-500">左の項目から選択してフィールドを追加してください</p>
        )}
        {fields.map((field, i) => {
          const isNoTarget = currentTargetId !== field.id
          switch (field.kind) {
            case 'text-field': {
              return (
                <div key={field.id} className="relative py-3">
                  {isNoTarget && (
                    <div className="group absolute inset-0">
                      <button
                        onClick={() => setCurrentTargetId(field.id)}
                        className="absolute inset-0 flex h-full w-full items-center justify-center border-2 border-dashed border-indigo-500 bg-indigo-400/40 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100"
                      >
                        <div className="inline-block rounded-md bg-white/50 px-2 py-1 font-bold">
                          このフィールドを編集する
                        </div>
                      </button>
                      <button
                        onClick={handleRemove(i)}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 opacity-0 transition hover:bg-gray-800 group-hover:opacity-100"
                      >
                        <TrashIcon className="w-6 text-white" aria-hidden />
                        <span className="sr-only">このフィールドを削除する</span>
                      </button>
                    </div>
                  )}

                  <div className="" aria-hidden={isNoTarget}>
                    <div className="flex items-center">
                      <input
                        tabIndex={isNoTarget ? -1 : 0}
                        type="text"
                        className="inline rounded border-transparent px-3 py-1 text-sm font-medium text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                        {...register(`form.${i}.title`, { value: '一行テキスト' })}
                      />
                      <AnimatePresence>
                        {watch(`form.${i}.isRequired`) && (
                          <motion.div
                            transition={{ duration: 0.15 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="ml-2 flex items-center justify-center rounded-md border border-indigo-500 px-2 text-sm  text-indigo-500"
                          >
                            必須
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <input
                      tabIndex={isNoTarget ? -1 : 0}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      {...register(`form.${i}.placeholder`)}
                    />
                    <textarea
                      rows={2}
                      className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                      {...register(`form.${i}.description`)}
                    />
                  </div>
                </div>
              )
            }
          }
        })}
      </div>
    </div>
  )
}

export default IndexPage

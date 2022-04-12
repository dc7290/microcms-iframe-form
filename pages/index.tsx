import { PlusCircleIcon, SaveIcon } from '@heroicons/react/outline'
import { useForm, useFieldArray } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { EditSideBar } from '~/src/components/EditSideBar'
import { useCurrentTargetIdSetValue, useCurrentTargetIdValue } from '~/src/components/contexts/currentTagetId'
import { TextField } from '~/src/components/fieds/TextField'
import { useMicrocms } from '~/src/hooks/useMicrocms'
import { FormKind, formKinds, FormValuesType } from '~/src/types/Form'

const IndexPage = () => {
  useMicrocms()

  const currentTargetId = useCurrentTargetIdValue()
  const setCurrentTargetId = useCurrentTargetIdSetValue()

  const { control, watch, handleSubmit } = useForm<FormValuesType>()
  const { fields, append, remove } = useFieldArray({ name: 'form', control })

  const handleAppend = (kind: FormKind) => () => {
    const fieldId = uuidv4()
    append({ fieldId, kind })

    // appendによる再レンダリングに違うステート更新を含められない
    setTimeout(() => {
      setCurrentTargetId(fieldId)
    }, 10)
  }
  const handleRemove = (index: number) => () => {
    if (index !== -1) {
      remove(index)

      // removeによる再レンダリングに違うステート更新を含められない
      setTimeout(() => {
        setCurrentTargetId(null)
      }, 10)
    }
  }

  return (
    <div className="relative flex h-[600px] min-w-[800px] bg-gray-100">
      <div className="relative w-1/3 max-w-xs rounded-r-md px-5 py-12 after:absolute after:inset-y-0 after:right-0 after:h-full after:w-3">
        <ul className="divide-y divide-gray-500">
          <li className="pb-10">
            <h2 className="flex items-center space-x-2 text-lg font-bold text-gray-900">
              <PlusCircleIcon className="w-5" />
              <span>フィールドの追加</span>
            </h2>
            <ul className="mt-6 space-y-4 pl-4">
              {(Object.keys(formKinds) as FormKind[]).map((key) => (
                <li key={key}>
                  <button
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="button"
                    onClick={handleAppend(key)}
                  >
                    {formKinds[key]}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li className="py-10">
            <h2 className="flex items-center space-x-2 text-lg font-bold text-gray-900">
              <SaveIcon className="w-5 pb-1" />
              <span>フォームの保存</span>
            </h2>
            <ul className="mt-6 space-y-4 pl-4">
              <li>
                <button
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="button"
                  // eslint-disable-next-line no-console
                  onClick={handleSubmit((data) => console.log(data))}
                >
                  保存する
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <EditSideBar fields={fields} handleRemove={handleRemove} control={control} />

      <div className="h-full flex-1 py-10 px-16">
        {fields.length === 0 ? (
          <p className="mt-10 text-center text-sm text-gray-500">左の項目から選択してフィールドを追加してください</p>
        ) : (
          <div className="mx-auto h-full max-w-md space-y-10 overflow-y-auto px-2">
            {fields.map((field, i) => {
              const isNoTarget = currentTargetId !== field.fieldId
              switch (field.kind) {
                case 'text-field': {
                  return (
                    <TextField
                      key={field.id}
                      id={field.fieldId}
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
        )}
      </div>
    </div>
  )
}

export default IndexPage

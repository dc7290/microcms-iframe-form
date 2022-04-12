import TrashIcon from '@heroicons/react/outline/TrashIcon'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { useCurrentTargetIdSetValue } from '~/src/components/contexts/currentTagetId'

export type Props = {
  id: string
  handleRemove: () => void
  isNoTarget: boolean
  children: ReactNode
  className?: string
}

const FieldWrapper = ({ id, handleRemove, isNoTarget, children, className }: Props) => {
  const setCurrentTargetId = useCurrentTargetIdSetValue()

  return (
    <div className={clsx(className, 'relative rounded-lg bg-white py-3 px-3 shadow')}>
      {isNoTarget && (
        <div className="group absolute inset-0">
          <button
            onClick={() => setCurrentTargetId(id)}
            className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-400/40 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100"
          >
            <div className="inline-block rounded-md bg-white/50 px-2 py-1 font-bold">このフィールドを編集する</div>
          </button>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 opacity-0 transition hover:bg-gray-800 group-hover:opacity-100"
          >
            <TrashIcon className="w-6 text-white" aria-hidden />
            <span className="sr-only">このフィールドを削除する</span>
          </button>
        </div>
      )}
      {children}
    </div>
  )
}

export default FieldWrapper

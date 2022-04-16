import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/outline'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { UseFieldArrayReturn } from 'react-hook-form'

import { useCurrentTargetIdSetValue } from '~/src/components/contexts/currentTagetId'

export type Props = {
  id: string
  index: number
  length: number
  handleRemove: () => void
  isNoTarget: boolean
  children: ReactNode
  className?: string
} & Pick<UseFieldArrayReturn, 'move' | 'swap'>

const FieldWrapper = ({ id, index, handleRemove, length, swap, isNoTarget, children, className }: Props) => {
  const setCurrentTargetId = useCurrentTargetIdSetValue()

  return (
    <motion.div
      layout="position"
      draggable={isNoTarget}
      className={clsx(className, 'relative rounded-lg bg-white py-3 px-3 shadow')}
    >
      {isNoTarget && (
        <div className="group absolute inset-0">
          <button
            onClick={() => setCurrentTargetId(id)}
            className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-400/40 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100"
          >
            <div className="inline-block rounded-md bg-white/50 px-2 py-1 font-bold">このフィールドを編集する</div>
          </button>
          {index !== 0 && (
            <button
              onClick={() => swap(index, index - 1)}
              className="absolute inset-x-0 -top-3 mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 opacity-0 transition hover:bg-gray-800 group-hover:opacity-100"
            >
              <ArrowCircleUpIcon className="w-6 text-white" aria-hidden />
              <span className="sr-only">このフィールドを一つ上に移動する</span>
            </button>
          )}
          {index !== length - 1 && (
            <button
              onClick={() => swap(index, index + 1)}
              className="absolute inset-x-0 -bottom-3 mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 opacity-0 transition hover:bg-gray-800 group-hover:opacity-100"
            >
              <ArrowCircleDownIcon className="w-6 text-white" aria-hidden />
              <span className="sr-only">このフィールドを一つ下に移動する</span>
            </button>
          )}
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
    </motion.div>
  )
}

export default FieldWrapper

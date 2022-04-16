import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  state: 'success' | 'error'
  children?: ReactNode
  className?: string
}

const Notification = ({ state, children, className }: Props) => {
  return (
    <div
      className={clsx(
        className,
        'pointer-events-auto w-full max-w-xs rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {state === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
            {state === 'error' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-gray-900">{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification

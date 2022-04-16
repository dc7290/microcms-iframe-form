import clsx from 'clsx'
import { ComponentProps, ForwardedRef, forwardRef } from 'react'

type Props = ComponentProps<'button'>

const PrimaryButton = ({ children, className, ...props }: Props, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      ref={forwardedRef}
      className={clsx(
        className,
        'inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      {children}
    </button>
  )
}

const _PrimaryButton = forwardRef(PrimaryButton)

export default _PrimaryButton

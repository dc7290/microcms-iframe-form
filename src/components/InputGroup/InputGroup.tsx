import clsx from 'clsx'
import { ComponentProps } from 'react'

export type Props = {
  labelText: string
  labelProps?: ComponentProps<'label'>
  inputProps?: ComponentProps<'input'>
  className?: string
}

const InputGroup = ({ inputProps, labelProps, labelText, className }: Props) => {
  return (
    <div className={className}>
      <label
        {...labelProps}
        htmlFor={inputProps?.id}
        className={clsx(labelProps?.className, 'block text-sm text-gray-700')}
      >
        {labelText}
      </label>
      <div className="mt-1">
        <input
          type="text"
          {...inputProps}
          className={clsx(
            inputProps?.className,
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          )}
        />
      </div>
    </div>
  )
}

export default InputGroup

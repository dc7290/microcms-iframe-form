import clsx from 'clsx'
import { ComponentProps, useId } from 'react'

export type Props = {
  labelText: string
  labelProps?: ComponentProps<'label'>
  textareaProps?: ComponentProps<'textarea'>
  className?: string
}

const TextareaGroup = ({ labelText, labelProps, textareaProps, className }: Props) => {
  const id = useId()

  return (
    <div className={className}>
      <label
        {...labelProps}
        htmlFor={textareaProps?.id ?? id}
        className={clsx(labelProps?.className, 'block text-sm text-gray-700')}
      >
        {labelText}
      </label>
      <div className="mt-1">
        <textarea
          {...textareaProps}
          rows={3}
          id={textareaProps?.id ?? id}
          className={clsx(
            textareaProps?.className,
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          )}
        />
      </div>
    </div>
  )
}

export default TextareaGroup

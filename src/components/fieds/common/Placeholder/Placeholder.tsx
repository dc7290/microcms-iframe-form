import clsx from 'clsx'
import { ComponentProps } from 'react'
import { Control, useController } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  control: Control<FormValuesType>
} & ComponentProps<'input'>

const Placeholder = ({ index, control, className, ...props }: Props) => {
  const name = `form.${index}.placeholder` as const
  const { field } = useController({ name, control })

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        プレースホルダー
      </label>
      <input
        {...{ ...field, value: field.value as string }}
        {...props}
        id={name}
        type="text"
        className={clsx(
          className,
          'block w-full rounded-md border-gray-300 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        )}
      />
    </div>
  )
}

export default Placeholder

import clsx from 'clsx'
import { ComponentProps, useId } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  controllerProps: Pick<
    UseControllerProps<FormValuesType, `form.${number}.placeholder`>,
    'defaultValue' | 'rules' | 'control'
  >
} & ComponentProps<'input'>

const Placeholder = ({ index, controllerProps, className, ...props }: Props) => {
  const name = `form.${index}.placeholder` as const
  const { field } = useController({ name, ...controllerProps })

  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        プレースホルダー
      </label>
      <input
        {...{ ...field, value: field.value as string }}
        {...props}
        id={id}
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

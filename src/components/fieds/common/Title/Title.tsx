import clsx from 'clsx'
import { ComponentProps, useId } from 'react'
import { useController, UseControllerProps, useFormContext } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
} & ComponentProps<'input'> &
  Pick<UseControllerProps<FormValuesType, `form.${number}.title`>, 'defaultValue' | 'rules'>

const Title = ({ index, defaultValue = '', rules, className, ...props }: Props) => {
  const { control } = useFormContext()

  const name = `form.${index}.title` as const
  const { field } = useController({ name, control, defaultValue, rules })

  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        タイトル
      </label>
      <input
        {...{ ...field, value: field.value as string }}
        {...props}
        id={id}
        type="text"
        className={clsx(
          className,
          'inline rounded border-transparent px-3 py-1 font-medium text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        )}
      />
    </div>
  )
}

export default Title

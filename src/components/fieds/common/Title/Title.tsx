import clsx from 'clsx'
import { ComponentProps } from 'react'
import { Control, useController } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  control: Control<FormValuesType>
} & ComponentProps<'input'>

const Title = ({ index, control, className, ...props }: Props) => {
  const { field } = useController({ name: `form.${index}.title`, control, defaultValue: '一行テキスト' })

  return (
    <input
      {...{ ...field, value: field.value as string }}
      {...props}
      type="text"
      className={clsx(
        className,
        'inline rounded border-transparent px-3 py-1 font-medium text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
      )}
    />
  )
}

export default Title

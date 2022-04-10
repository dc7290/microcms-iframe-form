import clsx from 'clsx'
import { ComponentProps } from 'react'
import { Control, useController } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  control: Control<FormValuesType>
} & ComponentProps<'textarea'>

const Description = ({ index, control, className, ...props }: Props) => {
  const { field } = useController({ name: `form.${index}.description`, control })

  return (
    <textarea
      {...field}
      {...props}
      rows={2}
      className={clsx(
        className,
        'block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm'
      )}
    />
  )
}

export default Description

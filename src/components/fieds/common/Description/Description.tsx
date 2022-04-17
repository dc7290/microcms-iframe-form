import clsx from 'clsx'
import { ComponentProps, useId } from 'react'
import { useController, UseControllerProps, useFormContext } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
} & ComponentProps<'textarea'> &
  Pick<UseControllerProps<FormValuesType, `form.${number}.description`>, 'defaultValue' | 'rules'>

const Description = ({ index, defaultValue = '', rules, className, ...props }: Props) => {
  const { control } = useFormContext<FormValuesType>()

  const name = `form.${index}.description` as const
  const { field } = useController({ name, control, defaultValue, rules })

  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        説明
      </label>
      <textarea
        {...field}
        {...props}
        id={id}
        rows={2}
        className={clsx(
          className,
          'block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm'
        )}
      />
    </div>
  )
}

export default Description

import clsx from 'clsx'
import { ComponentProps, useId } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  controllerProps: Pick<
    UseControllerProps<FormValuesType, `form.${number}.description`>,
    'defaultValue' | 'rules' | 'control'
  >
} & ComponentProps<'textarea'>

const Description = ({ index, controllerProps, className, ...props }: Props) => {
  const name = `form.${index}.description` as const
  const { field } = useController({ name, ...controllerProps })

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

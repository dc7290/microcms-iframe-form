import clsx from 'clsx'
import { ComponentProps, useId } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

type Props = {
  index: number
  controllerProps: Pick<
    UseControllerProps<FormValuesType, `form.${number}.title`>,
    'defaultValue' | 'rules' | 'control'
  >
} & ComponentProps<'input'>

const Title = ({ index, controllerProps, className, ...props }: Props) => {
  const name = `form.${index}.title` as const
  const { field } = useController({ name, ...controllerProps })

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

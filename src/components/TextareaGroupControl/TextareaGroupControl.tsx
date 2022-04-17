import { Control, FieldPath, useController } from 'react-hook-form'

import { TextareaGroupProps } from '../TextareaGroup'
import TextareaGroup from '../TextareaGroup/TextareaGroup'

type Props<FORM_TYPE> = {
  name: FieldPath<FORM_TYPE>
  control: Control<FORM_TYPE>
} & TextareaGroupProps

const TextareaGroupControl = <FORM_TYPE,>({
  name,
  control,
  labelText,
  labelProps,
  textareaProps,
  className,
}: Props<FORM_TYPE>) => {
  const { field } = useController({ name, control })

  return (
    <TextareaGroup
      labelText={labelText}
      labelProps={labelProps}
      textareaProps={{ ...field, ...textareaProps, value: field.value as string }}
      className={className}
    />
  )
}

export default TextareaGroupControl

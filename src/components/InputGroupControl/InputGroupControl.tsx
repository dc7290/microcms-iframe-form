import { Control, FieldPath, useController } from 'react-hook-form'

import { InputGroupProps } from '../InputGroup'
import InputGroup from '../InputGroup/InputGroup'

type Props<FORM_TYPE> = {
  name: FieldPath<FORM_TYPE>
  control: Control<FORM_TYPE>
} & InputGroupProps

const InputGroupControl = <FORM_TYPE,>({
  name,
  control,
  labelText,
  labelProps,
  inputProps,
  className,
}: Props<FORM_TYPE>) => {
  const { field } = useController({ name, control })

  return (
    <InputGroup
      labelText={labelText}
      labelProps={labelProps}
      inputProps={{ ...field, ...inputProps, value: field.value as string }}
      className={className}
    />
  )
}

export default InputGroupControl

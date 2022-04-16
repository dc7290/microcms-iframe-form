import { Control, FieldPath, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form'

import { SwitchGroupProps } from '../SwitchGroup'
import SwitchGroup from '../SwitchGroup/SwitchGroup'

type Props<FORM_TYPE> = {
  name: FieldPath<FORM_TYPE>
  control: Control<FORM_TYPE>
  defaultValue?: UnpackNestedValue<PathValue<FORM_TYPE, Path<FORM_TYPE>>>
} & Pick<SwitchGroupProps, 'children' | 'className'>

const SwitchGroupControl = <FORM_TYPE,>({ name, control, defaultValue, children, className }: Props<FORM_TYPE>) => {
  const { field } = useController({ name, control, defaultValue })

  return (
    <SwitchGroup className={className} checked={field.value as boolean} onChange={(e) => field.onChange(e)}>
      {children}
    </SwitchGroup>
  )
}

export default SwitchGroupControl

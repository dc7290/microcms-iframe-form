import { FieldArrayWithId, UseFieldArrayReturn } from 'react-hook-form'

import { formDefaultValues, FormValuesType } from '~/src/types/Form'

import { useCurrentTargetIdValue } from '../contexts/currentTagetId'
import { TextField } from '../fieds/TextField'

type Props = {
  fields: FieldArrayWithId<FormValuesType, 'form', 'id'>[]
  handleRemove: (index: number) => () => void
} & Pick<UseFieldArrayReturn, 'move' | 'swap'>

const FieldsList = ({ fields, handleRemove, move, swap }: Props) => {
  const currentTargetId = useCurrentTargetIdValue()

  return (
    <div className="mx-auto max-w-md space-y-14 px-2 pt-14">
      {fields.map((field, i) => {
        const isNoTarget = currentTargetId !== field.fieldId
        const fieldWrapperProps = {
          id: field.fieldId,
          handleRemove: handleRemove(i),
          move,
          swap,
          index: i,
          length: fields.length,
        }
        switch (field.kind) {
          case 'name': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues.name}
              />
            )
          }
          case 'email': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues.email}
              />
            )
          }
          case 'tel': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues.tel}
              />
            )
          }
          case 'organization': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues.organization}
              />
            )
          }
          case 'address-of-one-line': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues['address-of-one-line']}
              />
            )
          }
          case 'text-field': {
            return (
              <TextField
                {...fieldWrapperProps}
                key={field.id}
                isNoTarget={isNoTarget}
                defaultValues={formDefaultValues['text-field']}
              />
            )
          }
        }
      })}
    </div>
  )
}

export default FieldsList

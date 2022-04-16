import { FieldArrayWithId, UseFieldArrayReturn } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

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
        switch (field.kind) {
          case 'text-field': {
            return (
              <TextField
                key={field.id}
                id={field.fieldId}
                handleRemove={handleRemove(i)}
                move={move}
                swap={swap}
                isNoTarget={isNoTarget}
                index={i}
                length={fields.length}
              />
            )
          }
        }
      })}
    </div>
  )
}

export default FieldsList

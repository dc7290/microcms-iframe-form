import { AnimatePresence, motion } from 'framer-motion'
import { Control, UseFormWatch } from 'react-hook-form'

import { FormValuesType } from '~/src/types/Form'

import { Description } from '../common/Description'
import { FieldWrapper, FieldWrapperProps } from '../common/FieldWrapper'
import { Placeholder } from '../common/Placeholder'
import { Title } from '../common/Title'

type Props = Omit<FieldWrapperProps, 'children' | 'className'> & {
  index: number
  control: Control<FormValuesType>
  watch: UseFormWatch<FormValuesType>
  isNoTarget: boolean
}

const TextField = ({ index, control, watch, isNoTarget, ...fieldWrapperProps }: Props) => {
  return (
    <FieldWrapper isNoTarget={isNoTarget} {...fieldWrapperProps}>
      <div aria-hidden={isNoTarget} className="space-y-1">
        <div className="flex items-center">
          <Title
            tabIndex={isNoTarget ? -1 : 0}
            index={index}
            controllerProps={{ control, defaultValue: '一行テキスト' }}
          />
          <AnimatePresence>
            {watch(`form.${index}.isRequired`) && (
              <motion.div
                transition={{ duration: 0.15 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 flex items-center justify-center rounded-md border border-indigo-500 px-2 text-sm  text-indigo-500"
              >
                必須
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Placeholder tabIndex={isNoTarget ? -1 : 0} index={index} controllerProps={{ control, defaultValue: '' }} />
        <Description tabIndex={isNoTarget ? -1 : 0} index={index} controllerProps={{ control, defaultValue: '' }} />
      </div>
    </FieldWrapper>
  )
}

export default TextField

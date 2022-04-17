import { AnimatePresence, motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

import { Description } from '../common/Description'
import { FieldWrapper, FieldWrapperProps } from '../common/FieldWrapper'
import { Placeholder } from '../common/Placeholder'
import { Title } from '../common/Title'

type Props = Omit<FieldWrapperProps, 'children' | 'className'> & {
  isNoTarget: boolean
  defaultValues?: {
    title?: string
    placeholder?: string
    description?: string
  }
}

const TextField = ({ index, isNoTarget, defaultValues, ...fieldWrapperProps }: Props) => {
  const { watch } = useFormContext()

  return (
    <FieldWrapper isNoTarget={isNoTarget} index={index} {...fieldWrapperProps}>
      <div aria-hidden={isNoTarget} className="space-y-1">
        <div className="flex items-center">
          <Title tabIndex={isNoTarget ? -1 : 0} index={index} defaultValue={defaultValues?.title} />
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
        <Placeholder tabIndex={isNoTarget ? -1 : 0} index={index} defaultValue={defaultValues?.placeholder} />
        <Description
          className="mt-4"
          tabIndex={isNoTarget ? -1 : 0}
          index={index}
          defaultValue={defaultValues?.description}
        />
      </div>
    </FieldWrapper>
  )
}

export default TextField

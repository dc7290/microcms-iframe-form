import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useDrop } from 'react-dnd'

import { ItemTypes } from '~/src/components/FieldsList/Constants'

type Props = {
  handleMove: (fromIndex: number) => void
  className?: string
}

const DropLocation = ({ handleMove, className }: Props) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.FORM,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item) => {
      const index = (item as { index: number }).index
      handleMove(index)
    },
  })

  return (
    <motion.div
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={dropRef}
      className={clsx(className, 'relative flex h-14 items-center justify-center')}
    >
      <div className="absolute inset-0 my-auto h-[3px] w-full bg-indigo-500" />
      <div
        className={clsx(
          isOver ? 'bg-fuchsia-700 text-white' : 'bg-white',
          'relative inline-block rounded-md px-2 py-1 font-bold transition-colors'
        )}
      >
        この位置に移動する
      </div>
    </motion.div>
  )
}

export default DropLocation

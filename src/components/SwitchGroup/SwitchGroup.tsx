import clsx from 'clsx'

type Props = {
  className?: string
}

const SwitchGroup = ({ className }: Props) => {
  return <div className={clsx(className, '')}></div>
}

export default SwitchGroup

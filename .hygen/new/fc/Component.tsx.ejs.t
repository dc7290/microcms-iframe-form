---
to: src/components/<%= component_name %>/<%= component_name %>.tsx
---
import clsx from 'clsx'

type Props = {
  className?: string
}

const <%= component_name %> = ({ className }: Props) => {
  return (
    <div className={clsx(className, '')}>

    </div>
  )
}

export default <%= component_name %>

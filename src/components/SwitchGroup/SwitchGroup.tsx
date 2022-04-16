import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { ReactNode } from 'react'

export type Props = {
  checked: boolean
  onChange: (e: boolean) => void
  children?: ReactNode
  className?: string
}

const SwitchGroup = ({ checked, onChange, children, className }: Props) => {
  return (
    <Switch.Group as="div" className={clsx(className, 'flex items-center')}>
      <Switch
        checked={checked}
        onChange={onChange}
        className={clsx(
          checked ? 'bg-indigo-600' : 'bg-gray-400',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 cursor-pointer">
        <span className="text-sm">{children}</span>
      </Switch.Label>
    </Switch.Group>
  )
}

export default SwitchGroup

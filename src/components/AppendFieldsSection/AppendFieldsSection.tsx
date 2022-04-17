import { PlusCircleIcon } from '@heroicons/react/outline'

import { FormKind, formDefaultValues } from '~/src/types/Form'

import { SecondaryButton } from '../SecondaryButton'

type Props = {
  handleAppend: (kind: FormKind) => () => void
}

const AppendFieldsSection = ({ handleAppend }: Props) => {
  return (
    <div className="relative w-1/3 max-w-xs rounded-r-md px-5 py-12 after:absolute after:inset-y-0 after:right-0 after:h-full after:w-3">
      <h2 className="flex items-center space-x-2 text-lg font-bold text-gray-900">
        <PlusCircleIcon className="w-5" />
        <span>フィールドの追加</span>
      </h2>
      <ul className="flex-1 space-y-4 overflow-y-auto pt-6 pl-4">
        {(Object.keys(formDefaultValues) as FormKind[]).map((key) => (
          <li key={key}>
            <SecondaryButton type="button" onClick={handleAppend(key)}>
              {formDefaultValues[key]['title']}
            </SecondaryButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AppendFieldsSection

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const currentTargetIdContext = createContext<string | null>(null)
const setCurrentTargetIdContext = createContext<Dispatch<SetStateAction<string | null>>>(() => undefined)

export const CurrentTargetIdProvider = ({ children }: { children: ReactNode }) => {
  const [currentTargetId, setCurrentTargetId] = useState<string | null>(null)

  return (
    <currentTargetIdContext.Provider value={currentTargetId}>
      <setCurrentTargetIdContext.Provider value={setCurrentTargetId}>{children}</setCurrentTargetIdContext.Provider>
    </currentTargetIdContext.Provider>
  )
}

export const useCurrentTargetIdValue = () => useContext(currentTargetIdContext)
export const useCurrentTargetIdSetValue = () => useContext(setCurrentTargetIdContext)

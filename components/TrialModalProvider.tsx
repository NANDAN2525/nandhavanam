'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { TrialModal } from './TrialModal'

interface TrialModalContextType {
  openModal: () => void
}

const TrialModalContext = createContext<TrialModalContextType>({ openModal: () => {} })

export function TrialModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <TrialModalContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <TrialModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </TrialModalContext.Provider>
  )
}

export function useTrialModal() {
  return useContext(TrialModalContext)
}

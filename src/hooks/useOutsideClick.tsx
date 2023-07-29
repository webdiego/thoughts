import { useEffect, RefObject } from 'react'

type EventListener = (event: MouseEvent) => void

const useOutsideClickDetector = (
  ref: RefObject<HTMLElement>,
  onOutsideClick: EventListener
): void => {
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick])
}

export default useOutsideClickDetector

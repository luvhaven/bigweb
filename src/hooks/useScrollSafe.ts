import { useEffect, useState } from 'react'

/**
 * Returns true after component has mounted on client
 * Use this to conditionally apply scroll-based effects
 */
export function useIsomorphicMounted() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return mounted
}

import { useState, useEffect } from 'react'
import LiquidChrome from './LiquidChrome'
import { useTheme } from '@/components/use-theme'

const Background = () => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const resolve = () => {
      if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      } else {
        setIsDark(theme === 'dark')
      }
    }
    resolve()

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', resolve)
      return () => mq.removeEventListener('change', resolve)
    }
  }, [theme])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <LiquidChrome
        speed={0.1}
        amplitude={0.2}
        frequencyX={3}
        frequencyY={2.5}
        dark={isDark}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(11,15,25,0.5) 0%, rgba(11,15,25,0.35) 40%, rgba(11,15,25,0.45) 100%)'
            : 'linear-gradient(180deg, rgba(248,250,252,0.4) 0%, rgba(248,250,252,0.2) 40%, rgba(248,250,252,0.35) 100%)',
        }}
      />
    </div>
  )
}

export default Background

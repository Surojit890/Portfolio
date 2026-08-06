import { useState, useEffect } from 'react'
import Ballpit from './Ballpit'
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
  }, [theme])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <Ballpit
        count={100}
        gravity={0}
        friction={0.988}
        wallBounce={0.95}
        followCursor={true}
        colors={isDark
          ? [0x1e293b, 0x334155, 0x475569]
          : [0x314156, 0x475569, 0x64748b]
        }
        ambientColor={0x0b0f19}
        ambientIntensity={0.8}
        lightIntensity={140}
        minSize={0.5}
        maxSize={1}
        size0={1}
        maxVelocity={0.15}
        maxX={5}
        maxY={5}
        maxZ={2}
      />
    </div>
  )
}

export default Background

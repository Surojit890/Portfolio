import { useState, useEffect } from 'react'
import Ballpit from './Ballpit'
import { useTheme } from '@/components/use-theme'

const Background = () => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const [ballConfig, setBallConfig] = useState({
    count: 50,
    minSize: 0.5,
    maxSize: 1,
    maxVelocity: 0.15,
  })

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

  useEffect(() => {
    const updateConfig = () => {
      const w = window.innerWidth
      if (w < 640) {
        setBallConfig({ count: 12, minSize: 0.3, maxSize: 0.6, maxVelocity: 0.08 })
      } else if (w < 1024) {
        setBallConfig({ count: 25, minSize: 0.4, maxSize: 0.8, maxVelocity: 0.12 })
      } else {
        setBallConfig({ count: 50, minSize: 0.5, maxSize: 1, maxVelocity: 0.15 })
      }
    }
    updateConfig()
    window.addEventListener('resize', updateConfig)
    return () => window.removeEventListener('resize', updateConfig)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <Ballpit
        count={ballConfig.count}
        gravity={0}
        friction={0.988}
        wallBounce={0.95}
        followCursor={true}
        colors={isDark
          ? [0x1e293b, 0x334155, 0x475569]
          : [0x78350f, 0x92400e, 0xb45309]
        }
        ambientColor={0x0b0f19}
        ambientIntensity={0.8}
        lightIntensity={140}
        minSize={ballConfig.minSize}
        maxSize={ballConfig.maxSize}
        size0={1}
        maxVelocity={ballConfig.maxVelocity}
        maxX={5}
        maxY={5}
        maxZ={2}
      />
    </div>
  )
}

export default Background

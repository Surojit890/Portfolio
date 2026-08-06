import { useRef, useEffect } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const LiquidChrome = ({
  speed = 0.1,
  amplitude = 0.2,
  frequencyX = 3,
  frequencyY = 2.5,
  dark = true,
  className = '',
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const isMobile = window.innerWidth < 640
    const dpr = isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2)

    const renderer = new Renderer({
      antialias: !isMobile,
      dpr,
      alpha: false,
      powerPreference: 'high-performance',
    })
    const gl = renderer.gl

    const palettes = {
      dark: {
        clear: [0.059, 0.090, 0.165],
        c1: [0.059, 0.090, 0.165],
        c2: [0.118, 0.161, 0.231],
        c3: [0.200, 0.255, 0.333],
        c4: [0.392, 0.455, 0.545],
        c5: [0.580, 0.639, 0.722],
      },
      light: {
        clear: [0.973, 0.980, 0.988],
        c1: [0.973, 0.980, 0.988],
        c2: [0.886, 0.910, 0.941],
        c3: [0.792, 0.835, 0.882],
        c4: [0.580, 0.639, 0.722],
        c5: [0.992, 0.902, 0.541],
      },
    }
    const p = dark ? palettes.dark : palettes.light

    gl.clearColor(p.clear[0], p.clear[1], p.clear[2], 1)

    container.appendChild(gl.canvas)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShader = (isMobile ? '#define MOBILE\n' : '') + `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform vec3 uColor5;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
        vec2 fragCoord = uvCoord * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

        for (float i = 1.0; i < 10.0; i++) {
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
        }

        vec2 diff = (uvCoord - uMouse);
        float dist = length(diff);
        float falloff = exp(-dist * 20.0);
        float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
        uv += (diff / (dist + 0.0001)) * ripple * falloff;

        float chroma = 1.0 / abs(sin(uTime - uv.y - uv.x));
        float t = clamp((chroma - 1.0) / 3.0, 0.0, 1.0);

        vec3 color = uColor1;
        color = mix(color, uColor2, smoothstep(0.0, 0.25, t));
        color = mix(color, uColor3, smoothstep(0.25, 0.55, t));
        color = mix(color, uColor4, smoothstep(0.55, 0.80, t));
        color = mix(color, uColor5, smoothstep(0.85, 1.0, t));

        return vec4(color, 1.0);
      }

      void main() {
        #ifdef MOBILE
        gl_FragColor = renderImage(vUv);
        #else
        vec4 col = vec4(0.0);
        int samples = 0;
        for (int i = -1; i <= 1; i++) {
          for (int j = -1; j <= 1; j++) {
            vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
            col += renderImage(vUv + offset);
            samples++;
          }
        }
        gl_FragColor = col / float(samples);
        #endif
      }
    `

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1, 1]) },
        uColor1: { value: new Float32Array(p.c1) },
        uColor2: { value: new Float32Array(p.c2) },
        uColor3: { value: new Float32Array(p.c3) },
        uColor4: { value: new Float32Array(p.c4) },
        uColor5: { value: new Float32Array(p.c5) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      const mobile = w < 640
      renderer.dpr = mobile
        ? Math.min(window.devicePixelRatio, 1.5)
        : Math.min(window.devicePixelRatio, 2)
      renderer.setSize(w, h)
      const res = program.uniforms.uResolution.value
      res[0] = gl.canvas.width
      res[1] = gl.canvas.height
      res[2] = gl.canvas.width / gl.canvas.height
    }
    window.addEventListener('resize', resize)
    resize()

    function handleMouseMove(e) {
      const mouseUniform = program.uniforms.uMouse.value
      mouseUniform[0] = e.clientX / window.innerWidth
      mouseUniform[1] = 1 - e.clientY / window.innerHeight
    }

    function handleTouchMove(e) {
      if (e.touches.length > 0) {
        const mouseUniform = program.uniforms.uMouse.value
        mouseUniform[0] = e.touches[0].clientX / window.innerWidth
        mouseUniform[1] = 1 - e.touches[0].clientY / window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    let animationId
    let running = true

    function update(t) {
      if (!running) return
      animationId = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001 * speed
      renderer.render({ scene: mesh })
    }
    animationId = requestAnimationFrame(update)

    function handleVisibility() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(animationId)
      } else if (!running) {
        running = true
        animationId = requestAnimationFrame(update)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [dark, speed, amplitude, frequencyX, frequencyY])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default LiquidChrome

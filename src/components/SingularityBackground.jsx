import { useEffect, useRef } from 'react';
import { InspiraShaderToy } from '@/lib/InspiraShaderToy';

const SINGULARITY_SHADER = `
// ShaderToy URL: https://www.shadertoy.com/view/3csSWB
// "Singularity" by @XorDev — A whirling blackhole.
void mainImage(out vec4 O, vec2 F)
{
  float i = .2, a;
  vec2 r = iResolution.xy,
    p = (F + F - r) / r.y / .7,
    d = vec2(-1, 1),
    b = p - i * d,
    c = p * mat2(1, 1, d / (.1 + i / dot(b, b))),
    v = c * mat2(cos(.5 * log(a = dot(c, c)) + iTime * i + vec4(0, 33, 11, 0))) / i,
    w;

  for (; i++ < 9.; w += 1. + sin(v))
    v += .7 * sin(v.yx * i + iTime) / i + .5;

  i = length(sin(v / .3) * .4 + c * (3. + d));
  O = 1. - exp(-exp(c.x * vec4(.6, -.4, -1, 0))
    / w.xyyx
    / (2. + i * i / 4. - i)
    / (.5 + 1. / a)
    / (.03 + abs(length(p) - .7))
  );
}
`;

const SingularityBackground = ({
  hue = 217,
  saturation = 1,
  brightness = 0.8,
  speed = 0.5,
  mouseSensitivity = 0.5,
  damping = 0.9,
}) => {
  const containerRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let shader;

    try {
      shader = new InspiraShaderToy(
        container,
        'hover',
        60,
        1,
      );
      shaderRef.current = shader;

      shader.setHSV({ hue, saturation, brightness });
      shader.setSpeed(speed);
      shader.setMouseSensitivity(mouseSensitivity);
      shader.setMouseDamping(damping);

      const success = shader.setShader({ source: SINGULARITY_SHADER });
      if (!success) {
        console.error('Failed to compile singularity shader');
        return;
      }

      shader.play();
    } catch (err) {
      console.error('WebGL initialization failed:', err);
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!shaderRef.current) return;
        if (entry?.isIntersecting) {
          shaderRef.current.play();
        } else {
          shaderRef.current.pause();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (!shaderRef.current) return;
      if (document.visibilityState === 'visible') {
        shaderRef.current.play();
      } else {
        shaderRef.current.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      intersectionObserver.disconnect();
      shader?.dispose();
      shaderRef.current = null;
    };
  }, [hue, saturation, brightness, speed, mouseSensitivity, damping]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:max-w-full pointer-events-none"
    />
  );
};

export default SingularityBackground;

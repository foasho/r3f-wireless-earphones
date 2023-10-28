import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

export const Effects = () => {

  return (
    <EffectComposer>
      <DepthOfField target={[0, 0, -2.5]} focusRange={0.1} bokehScale={10} />
    </EffectComposer>
  )
}
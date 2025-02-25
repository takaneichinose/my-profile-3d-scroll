import { useContext, useEffect } from 'react';
import { AmbientLight, ColorRepresentation } from 'three';

import { ThreeContext } from '@/contexts/threeContext';

type props = {
  color?: ColorRepresentation;
  intensity?: number;
};

function AmbientLightNode({ color, intensity }: props) {
  const { scene } = useContext(ThreeContext);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    const object = new AmbientLight(color, intensity);

    scene.add(object);
  }, [scene, color, intensity]);

  return <></>;
}

export { AmbientLightNode as AmbientLight };

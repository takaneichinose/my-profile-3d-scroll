import { useContext, useEffect } from 'react';
import { Fog, ColorRepresentation } from 'three';

import { ThreeContext } from '@/contexts/threeContext';

type props = {
  color: ColorRepresentation;
  near?: number;
  far?: number;
};

function FogNode({ color, near, far }: props) {
  const { scene } = useContext(ThreeContext);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    const object = new Fog(color, near, far);

    scene.fog = object;
  }, [scene, color, near, far]);

  return <></>;
}

export { FogNode as Fog };

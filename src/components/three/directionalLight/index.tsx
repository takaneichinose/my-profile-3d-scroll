import { useContext, useEffect } from 'react';
import {
  ColorRepresentation,
  DirectionalLight,
  DirectionalLightShadow,
  Object3D,
  Vector3,
} from 'three';

import { ThreeContext } from '@/contexts/threeContext';

type props = {
  color?: ColorRepresentation;
  intensity?: number;
  castShadow?: boolean;
  position?: Vector3;
  shadow?: DirectionalLightShadow;
  target?: Object3D;
};

function DirectionalLightNode({
  color,
  intensity,
  castShadow,
  position,
  shadow,
  target,
}: props) {
  const { scene } = useContext(ThreeContext);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    const object = new DirectionalLight(color, intensity);

    if (castShadow != null) {
      object.castShadow = castShadow;
    }

    if (position != null) {
      object.position.set(position.x, position.y, position.z);
    }

    if (shadow != null) {
      object.shadow.bias = shadow.bias;
      object.shadow.camera.near = shadow.camera.near;
      object.shadow.camera.far = shadow.camera.far;
      object.shadow.mapSize = shadow.mapSize;
    }

    if (target != null) {
      object.target = target;
    }

    scene.add(object);
  }, [scene, color, intensity, castShadow, position, shadow, target]);

  return <></>;
}

export { DirectionalLightNode as DirectionalLight };

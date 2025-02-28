import { useContext, useEffect } from 'react';
import { Vector3 } from 'three';

import { modelsPath } from '@/constants/models';
import { ThreeContext } from '@/contexts/threeContext';
import { loadModel } from '@/utils/modelUtil';

type props = {
  position?: Vector3;
  rotation?: Vector3;
};

export function Clock({ position, rotation }: props) {
  const { scene } = useContext(ThreeContext);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    (async () => {
      const model = await loadModel(`${modelsPath}/Clock.glb`);

      model.scene.position.x = position?.x ?? 0;
      model.scene.position.y = position?.y ?? 0;
      model.scene.position.z = position?.z ?? 0;

      model.scene.rotation.x = rotation?.x ?? 0;
      model.scene.rotation.y = rotation?.y ?? 0;
      model.scene.rotation.z = rotation?.z ?? 0;

      scene.add(model.scene);
    })();
  }, [scene, position, rotation]);

  return <></>;
}

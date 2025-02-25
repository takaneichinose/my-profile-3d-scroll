import { useContext, useEffect } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';

import { modelsPath } from '@/constants/models';
import { ThreeContext } from '@/contexts/threeContext';
import { loadModel } from '@/utils/modelUtil';

export function Character() {
  const { scene } = useContext(ThreeContext);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    (async () => {
      const model = await loadModel(`${modelsPath}/Character.glb`);

      model.scene.rotation.y = degToRad(180);

      model.scene.position.x = 0;
      model.scene.position.y = -0.6;
      model.scene.position.z = -0.1;

      scene.add(model.scene);
    })();
  }, [scene]);

  return <></>;
}

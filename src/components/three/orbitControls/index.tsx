import { useContext, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { ThreeContext } from '@/contexts/threeContext';

function OrbitControlsNode() {
  const { camera, renderer, scene, setOrbitControls } =
    useContext(ThreeContext);

  useEffect(() => {
    if (
      camera == null ||
      renderer == null ||
      scene == null ||
      setOrbitControls == null
    ) {
      return;
    }

    setOrbitControls(new OrbitControls(camera, renderer.domElement));
  }, [camera, renderer, scene, setOrbitControls]);

  return <></>;
}

export { OrbitControlsNode as OrbitControls };

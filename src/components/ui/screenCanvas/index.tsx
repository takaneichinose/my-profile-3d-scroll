import React, { useContext, useEffect, useRef } from 'react';
import { WebGLRenderer } from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { ScreenFallback } from '@/components/ui/screenFallback';
import { rendererSettings } from '@/constants/settings';
import { ThreeContext } from '@/contexts/threeContext';

type props = {
  children?: React.ReactNode;
};

export function ScreenCanvas({ children }: props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { camera, renderer, screenWidth, screenHeight, setRenderer } =
    useContext(ThreeContext);

  useEffect(() => {
    if (ref.current == null || setRenderer == null) {
      return;
    }

    const canvas = ref.current;
    const { antialias, alpha, shadowMap } = rendererSettings;

    const renderer = new WebGLRenderer({
      canvas,
      antialias,
      alpha,
    });

    setRenderer(renderer);

    renderer.shadowMap.enabled = shadowMap.enabled;
    renderer.shadowMap.type = shadowMap.type;
  }, [setRenderer]);

  useEffect(() => {
    if (
      camera == null ||
      renderer == null ||
      screenWidth == null ||
      screenHeight == null
    ) {
      return;
    }

    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(screenWidth, screenHeight);
  }, [camera, renderer, screenWidth, screenHeight]);

  return !WebGL.isWebGL2Available() ? (
    <ScreenFallback />
  ) : (
    <>
      <canvas width={screenWidth} height={screenHeight} ref={ref} />
      {children}
    </>
  );
}

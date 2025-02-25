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
  const { renderer, screenWidth, screenHeight, setRenderer } =
    useContext(ThreeContext);

  useEffect(() => {
    if (ref.current == null || setRenderer == null) {
      return;
    }

    const canvas = ref.current;
    const { antialias, alpha } = rendererSettings;

    setRenderer(
      new WebGLRenderer({
        canvas,
        antialias,
        alpha,
      }),
    );
  }, [setRenderer]);

  useEffect(() => {
    if (renderer == null || screenWidth == null || screenHeight == null) {
      return;
    }

    renderer.setSize(screenWidth, screenHeight);
  }, [renderer, screenWidth, screenHeight]);

  return !WebGL.isWebGL2Available() ? (
    <ScreenFallback />
  ) : (
    <>
      <canvas width={screenWidth} height={screenHeight} ref={ref} />
      {children}
    </>
  );
}

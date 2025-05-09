import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';

import { cameraSettings } from '@/constants/settings';
import { ThreeContext } from '@/contexts/threeContext';

type props = {
  children?: React.ReactNode;
};

export function ScreenLayout({ children }: props) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    camera,
    scene,
    renderer,
    setCamera,
    setScreenHeight,
    setScreenWidth,
  } = useContext(ThreeContext);

  const resizeWindow = useCallback(() => {
    if (
      ref.current == null ||
      setScreenHeight == null ||
      setScreenWidth == null
    ) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();

    setScreenWidth(width);
    setScreenHeight(height);
  }, [setScreenWidth, setScreenHeight]);

  useEffect(() => {
    if (ref.current == null || setCamera == null) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();
    const { fov, near, far } = cameraSettings;
    const camera = new PerspectiveCamera(fov, width / height, near, far);

    camera.position.set(
      cameraSettings.position.x,
      cameraSettings.position.y,
      cameraSettings.position.z,
    );

    setCamera(camera);
    resizeWindow();

    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [setCamera, resizeWindow]);

  const update = useCallback(() => {
    requestAnimationFrame(update);

    if (renderer == null || scene == null || camera == null) {
      return;
    }

    renderer.render(scene, camera);
  }, [camera, renderer, scene]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <div ref={ref} className="bg-black w-dvw h-dvh shrink-0 fixed top-0">
      {children}
    </div>
  );
}

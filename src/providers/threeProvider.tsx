import React, { useContext, useEffect, useState } from 'react';
import { Camera, Clock, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { ThreeContext } from '@/contexts/threeContext';

type props = {
  children?: React.ReactNode;
};

export function ThreeProvider({ children }: props) {
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<Camera>();
  const [clock, setClock] = useState<Clock>();
  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [screenWidth, setScreenWidth] = useState<number>();
  const [screenHeight, setScreenHeight] = useState<number>();
  const [orbitControls, setOrbitControls] = useState<OrbitControls>();

  const threeContext = useContext(ThreeContext);

  useEffect(() => {
    if (threeContext.scene == null) {
      setScene(new Scene());
    }

    if (threeContext.clock == null) {
      setClock(new Clock());
    }
  }, [threeContext]);

  return (
    <ThreeContext.Provider
      value={{
        scene,
        camera,
        clock,
        renderer,
        screenWidth,
        screenHeight,
        orbitControls,
        setCamera,
        setClock,
        setRenderer,
        setScreenWidth,
        setScreenHeight,
        setOrbitControls,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
}

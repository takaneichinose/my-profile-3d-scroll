import { Dispatch, SetStateAction } from 'react';
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export type ThreeObjects = {
  scene?: Scene;
  camera?: PerspectiveCamera;
  clock?: Clock;
  renderer?: WebGLRenderer;
  screenWidth?: number;
  screenHeight?: number;
  orbitControls?: OrbitControls;
  setCamera?: Dispatch<SetStateAction<PerspectiveCamera | undefined>>;
  setClock?: Dispatch<SetStateAction<Clock | undefined>>;
  setRenderer?: Dispatch<SetStateAction<WebGLRenderer | undefined>>;
  setScreenWidth?: Dispatch<SetStateAction<number | undefined>>;
  setScreenHeight?: Dispatch<SetStateAction<number | undefined>>;
  setOrbitControls?: Dispatch<SetStateAction<OrbitControls | undefined>>;
};

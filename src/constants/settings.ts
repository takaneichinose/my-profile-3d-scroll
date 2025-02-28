import { DirectionalLightShadow, PCFShadowMap, Vector2, Vector3 } from 'three';

export const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 10,
  position: new Vector3(0, 0, 0.85),
};

export const rendererSettings = {
  antialias: false,
  alpha: true,
  shadowMap: {
    enabled: true,
    type: PCFShadowMap,
  },
};

export const ambientLightSettings = {
  color: 0xffffff,
  intensity: 1,
};

export const directionalLightSettings = {
  color: 0xffffff,
  intensity: 1,
  position: new Vector3(0, 8, 5),
  castShadow: true,
  shadow: {
    bias: -0.004,
    mapSize: new Vector2(1024, 1024),
    camera: {
      near: 0.1,
      far: 10,
    },
  } as DirectionalLightShadow,
};

export const fogSettings = {
  color: 0x065ab5,
  near: 3,
  far: 5,
};

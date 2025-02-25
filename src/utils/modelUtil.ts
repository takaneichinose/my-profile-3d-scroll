import { Mesh, Object3D, Object3DEventMap } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

/**
 * Load the model and return its GLTF data
 * @param {string} path Path of the model
 * @returns {Promise<GLTF>}
 */
export const loadModel = async (path: string): Promise<GLTF> => {
  const loader: GLTFLoader = new GLTFLoader();

  return new Promise(
    (
      resolve: (value: GLTF | PromiseLike<GLTF>) => void,
      reject: (reason?: unknown) => void,
    ): void => {
      loader.load(
        path,
        (gltf: GLTF): void => {
          gltf.scene.castShadow = true;
          gltf.scene.receiveShadow = true;
          gltf.scene.traverse((object: Object3D<Object3DEventMap>): void => {
            if (object instanceof Mesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
          });

          resolve(gltf);
        },
        undefined,
        (error: unknown): void => {
          reject(error);
        },
      );
    },
  );
};

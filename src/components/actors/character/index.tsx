import { useContext, useEffect, useState } from 'react';
import { AnimationClip, AnimationMixer } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { degToRad } from 'three/src/math/MathUtils.js';

import { modelsPath } from '@/constants/models';
import { cameraSettings } from '@/constants/settings';
import { ThreeContext } from '@/contexts/threeContext';
import { loadModel } from '@/utils/modelUtil';
import {
  animateSpeedStep1,
  animateSpeedStep2,
  animateStep1,
  animations,
  rotateInitial,
  rotateStep2,
  scrollStep1End,
  scrollStep1Start,
  scrollStep2End,
  scrollStep2Start,
  scrollStep3End,
  scrollStep3Start,
  scrollStep4End,
  scrollStep4Start,
  scrollStep5End,
  scrollStep5Start,
  walkInitialX,
  walkInitialZ,
  walkStep1,
  walkStep3,
  walkStep4,
} from '@/constants/character';

export function Character() {
  const cameraPosition = cameraSettings.position;

  const [characterPositionX, setCharacterPositionX] = useState(walkInitialX);
  const [characterPositionZ, setCharacterPositionZ] = useState(walkInitialZ);
  const [characterRotationY, setCharacterRotationY] = useState(rotateInitial);
  const [cameraPositionX, setCameraPositionX] = useState(cameraPosition.x);
  const [cameraPositionZ, setCameraPositionZ] = useState(cameraPosition.z);
  const [scrollY, setScrollY] = useState(0);
  const [model, setModel] = useState<GLTF>();
  const [clips, setClips] = useState<AnimationClip[]>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [currentClipName, setCurrentClipName] = useState<string>();

  const { scene, camera } = useContext(ThreeContext);

  const handleScroll = (evt: Event) => {
    const elm = evt.currentTarget as Window;

    setScrollY(elm.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scene == null) {
      return;
    }

    (async () => {
      const model = await loadModel(`${modelsPath}/Character.glb`);

      const character = model.scene;

      setModel(model);
      setClips(model.animations);
      setMixer(new AnimationMixer(character));

      scene.add(character);

      character.position.y = -0.6;
      character.rotation.x = 0;
      character.rotation.z = 0;
    })();
  }, [scene]);

  useEffect(() => {
    if (model == null || clips == null || mixer == null || scrollY == null) {
      return;
    }

    let clipName = null;

    if (scrollY >= 0 && scrollY <= animateStep1) {
      clipName = animations.walk;
    } else if (scrollY >= scrollStep4Start && scrollY <= scrollStep4End) {
      clipName = animations.stand;
    } else if (scrollY >= scrollStep5Start && scrollY <= scrollStep5End) {
      clipName = animations.jumpAndSit;
    }

    if (clipName != null) {
      const clip = AnimationClip.findByName(clips, clipName);
      const action = mixer.clipAction(clip);

      if (clipName === animations.walk) {
        mixer.setTime(scrollY / animateSpeedStep1);
      } else if (clipName === animations.stand) {
        mixer.setTime(0);
      } else if (clipName === animations.jumpAndSit) {
        mixer.setTime(scrollY / animateSpeedStep2);
      }

      setCurrentClipName(clipName);

      action.play();
    }

    if (scrollY === scrollStep1Start) {
      setCharacterPositionX(walkInitialX);
      setCharacterPositionZ(walkInitialZ);
      setCameraPositionX(cameraPosition.x);
      setCameraPositionZ(cameraPosition.z);
    }

    if (scrollY >= scrollStep1Start && scrollY <= scrollStep1End) {
      const percentage = scrollY / scrollStep1End;

      setCharacterPositionZ(walkInitialZ + walkStep1 * percentage);
      setCameraPositionZ(cameraPosition.z + walkStep1 * percentage);

      setCharacterRotationY(rotateInitial);
      setCameraPositionX(cameraPosition.x);
    }

    if (scrollY >= scrollStep2Start && scrollY <= scrollStep2End) {
      const percentage =
        (scrollY - scrollStep2Start) / (scrollStep2End - scrollStep2Start);

      setCharacterPositionX(walkInitialX);
      setCameraPositionX(cameraPosition.x);

      setCharacterRotationY(rotateInitial + rotateStep2 * percentage);
    }

    if (scrollY >= scrollStep3Start && scrollY <= scrollStep3End) {
      const percentage =
        (scrollY - scrollStep3Start) / (scrollStep3End - scrollStep3Start);

      // TODO: Something is wrong with this animation

      setCharacterPositionX(walkInitialX + walkStep3 * percentage);
      setCameraPositionX(cameraPosition.x + walkStep3 * percentage);
    }

    if (scrollY >= scrollStep5Start && scrollY <= scrollStep5End) {
      const percentage =
        (scrollY - scrollStep5Start) / (scrollStep5End - scrollStep5Start);

      setCharacterPositionX(walkStep3 + walkStep4 * percentage);
      setCameraPositionX(walkStep3 + walkStep4 * percentage);

      // TODO: Rotate camera in front of the character
    }

    // TODO: Condition after scroll step 5, put the "end" animation time to static
  }, [model, clips, mixer, scrollY, cameraPosition]);

  useEffect(() => {
    if (model == null) {
      return;
    }

    model.scene.position.x = characterPositionX;
    model.scene.position.z = characterPositionZ;
    model.scene.rotation.y = degToRad(characterRotationY);
  }, [model, characterPositionX, characterPositionZ, characterRotationY]);

  useEffect(() => {
    if (clips == null || mixer == null || currentClipName == null) {
      return;
    }

    for (const key in animations) {
      const animation = (animations as Record<string, string>)[key];

      const clip = AnimationClip.findByName(clips, animation);
      const action = mixer.clipAction(clip);

      action.stop();
    }
  }, [clips, mixer, currentClipName]);

  if (camera != null) {
    camera.position.setX(cameraPositionX);
    camera.position.setZ(cameraPositionZ);
  }

  return <></>;
}

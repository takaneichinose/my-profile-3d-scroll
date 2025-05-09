import { useCallback, useContext, useEffect, useState } from 'react';
import { AnimationClip, AnimationMixer } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  animateSpeedStep1,
  animateSpeedStep2,
  animations,
  cameraRotateY,
  cameraStep5X,
  cameraStep5Y,
  cameraStep5Z,
  cameraStep6X,
  cameraStep6Y,
  cameraStep6Z,
  positionInitialY,
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
  scrollStep6End,
  scrollStep6Start,
  scrollStep7End,
  scrollStep7Start,
  walkInitialX,
  walkInitialZ,
  walkStep1,
  walkStep3,
  walkStep4,
} from '@/constants/character';
import { modelsPath } from '@/constants/models';
import { cameraSettings } from '@/constants/settings';
import { ThreeContext } from '@/contexts/threeContext';
import { loadModel } from '@/utils/modelUtil';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: `+=${scrollStep7End * window.innerHeight}`,
    scrub: true,
  },
  repeat: 0,
});

export function Character() {
  const cameraPosition = cameraSettings.position;

  const [scrollY, setScrollY] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [model, setModel] = useState<GLTF>();
  const [clips, setClips] = useState<AnimationClip[]>();
  const [mixer, setMixer] = useState<AnimationMixer>();
  const [currentClipName, setCurrentClipName] = useState<string>();

  const { scene, camera } = useContext(ThreeContext);

  const handleScroll = (evt: Event) => {
    const elm = evt.currentTarget as Window;
    const scrollY = elm.scrollY;

    setScrollY(scrollY);
  };

  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  const getClipName = useCallback(() => {
    const step3End = scrollStep3End * screenHeight;
    const step4Start = scrollStep4Start * screenHeight;
    const step4End = scrollStep4End * screenHeight;
    const step5Start = scrollStep5Start * screenHeight;
    const step5End = scrollStep5End * screenHeight;

    if (scrollY >= 0 && scrollY <= step3End) {
      return animations.walk;
    } else if (scrollY >= step4Start && scrollY <= step4End) {
      return animations.stand;
    } else if (scrollY >= step5Start && scrollY <= step5End) {
      return animations.jumpAndSit;
    }

    return null;
  }, [scrollY, screenHeight]);

  // Initialize the scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    setScreenHeight(window.innerHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load the model of the character
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

      character.castShadow = true;
      character.receiveShadow = true;
    })();
  }, [scene]);

  // Set the animation of the character
  useEffect(() => {
    const clipName = getClipName();

    if (
      clipName == null ||
      clips == null ||
      mixer == null ||
      scrollY == null ||
      screenHeight === 0
    ) {
      return;
    }

    const clip = AnimationClip.findByName(clips, clipName);
    const action = mixer.clipAction(clip);

    if (clipName === animations.walk) {
      mixer.setTime(scrollY / (animateSpeedStep1 * screenHeight));
    } else if (clipName === animations.stand) {
      mixer.setTime(0);
    } else if (clipName === animations.jumpAndSit) {
      const stepStart = scrollY - scrollStep5Start * screenHeight;

      mixer.setTime(stepStart / (animateSpeedStep2 * screenHeight));
    }

    setCurrentClipName(clipName);

    action.play();
  }, [getClipName, clips, mixer, screenHeight, scrollY]);

  // Animate and move the character to another position
  useEffect(() => {
    if (model == null || camera == null || screenHeight === 0) {
      return;
    }

    const character = model.scene;

    tl.fromTo(
      character.position,
      {
        z: walkInitialZ,
      },
      {
        x: walkInitialX,
        z: walkInitialZ + walkStep1,
        duration: scrollStep1End * screenHeight,
      },
      scrollStep1Start * screenHeight,
    )
      .fromTo(
        camera.position,
        {
          y: cameraPosition.y,
          z: cameraPosition.z,
        },
        {
          x: cameraPosition.x,
          z: cameraPosition.z + walkStep1,
          duration: scrollStep1End * screenHeight,
        },
        scrollStep1Start * screenHeight,
      )
      .fromTo(
        character.rotation,
        {
          y: degToRad(rotateInitial),
        },
        {
          y: degToRad(rotateInitial) + degToRad(rotateStep2),
          duration: (scrollStep2End - scrollStep2Start) * screenHeight,
          ease: 'power2.out',
        },
        scrollStep2Start * screenHeight,
      )
      .fromTo(
        character.position,
        {
          x: walkInitialX,
        },
        {
          x: walkInitialX + walkStep3,
          duration: (scrollStep3End - scrollStep3Start) * screenHeight,
        },
        scrollStep3Start * screenHeight,
      )
      .fromTo(
        camera.position,
        {
          x: cameraPosition.x,
        },
        {
          x: cameraPosition.x + walkStep3,
          duration: (scrollStep3End - scrollStep3Start) * screenHeight,
        },
        scrollStep3Start * screenHeight,
      )
      .fromTo(
        character.position,
        {
          x: walkInitialX + walkStep3,
        },
        {
          x: walkInitialX + walkStep3 + walkStep4,
          duration: (scrollStep5End - scrollStep5Start) * screenHeight,
        },
        scrollStep5Start * screenHeight,
      )
      .fromTo(
        camera.position,
        {
          x: cameraPosition.x + walkStep3,
        },
        {
          x: cameraPosition.x + walkStep3 + walkStep4,
          duration: (scrollStep5End - scrollStep5Start) * screenHeight,
        },
        scrollStep5Start * screenHeight,
      )
      .fromTo(
        camera.position,
        {
          x: cameraPosition.x + walkStep3 + walkStep4,
          y: cameraPosition.y,
          z: cameraPosition.z + walkStep1,
        },
        {
          x: cameraPosition.x + cameraStep5X,
          y: cameraPosition.y + cameraStep5Y,
          z: cameraPosition.z + cameraStep5Z,
          ease: 'power4.out',
          duration: (scrollStep6End - scrollStep6Start) * screenHeight,
        },
        scrollStep6Start * screenHeight,
      )
      .fromTo(
        camera.position,
        {
          x: cameraPosition.x + cameraStep5X,
          y: cameraPosition.y + cameraStep5Y,
          z: cameraPosition.z + cameraStep5Z,
        },
        {
          x: cameraPosition.x + cameraStep6X,
          y: cameraPosition.y + cameraStep6Y,
          z: cameraPosition.z + cameraStep6Z,
          ease: 'power4.inOut',
          duration: (scrollStep7End - scrollStep7Start) * screenHeight,
        },
        scrollStep7Start * screenHeight,
      )
      .fromTo(
        camera.rotation,
        {
          y: 0,
        },
        {
          y: degToRad(cameraRotateY),
          ease: 'power4.inOut',
          duration: (scrollStep7End - scrollStep7Start) * screenHeight,
        },
        scrollStep7Start * screenHeight,
      );
  }, [model, camera, cameraPosition, screenHeight]);

  // Initialize the position of the character
  useEffect(() => {
    if (model == null || camera == null) {
      return;
    }

    const character = model.scene;

    character.position.x = walkInitialX;
    character.position.y = positionInitialY;
    character.position.z = walkInitialZ;

    character.rotation.x = 0;
    character.rotation.y = degToRad(rotateInitial);
    character.rotation.z = 0;

    camera.position.x = cameraPosition.x;
    camera.position.y = cameraPosition.y;
    camera.position.z = cameraPosition.z;
  }, [model, camera, cameraPosition]);

  // Stop the current animation before starting to another
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

  return <></>;
}

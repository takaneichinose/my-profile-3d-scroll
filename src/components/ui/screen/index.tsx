import { degToRad } from 'three/src/math/MathUtils.js';
import useErrorBoundary from 'use-error-boundary';

import { Character } from '@/components/actors/character';
import { AmbientLight } from '@/components/three/ambientLight';
import { DirectionalLight } from '@/components/three/directionalLight';
import { ScreenLayout } from '@/components/layouts/screenLayout';
import { Room } from '@/components/objects/room';
import {
  ambientLightSettings,
  directionalLightSettings,
  // fogSettings,
} from '@/constants/settings';
// import { Fog } from '@/components/three/fog';
import { ScreenCanvas } from '@/components/ui/screenCanvas';
import { ScreenError } from '@/components/ui/screenError';
import { ThreeProvider } from '@/providers/threeProvider';
import { Vector3 } from 'three';
import { Shelf } from '@/components/objects/shelf';
import { Desk } from '@/components/objects/desk';
import { Chair } from '@/components/objects/chair';
import { Clock } from '@/components/objects/clock';
import { Hydrangea } from '@/components/objects/hydrangea';
import { LampTable } from '@/components/objects/lampTable';
import { Laptop } from '@/components/objects/laptop';
import { Plant } from '@/components/objects/plant';

export function Screen() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return didCatch ? (
    <ScreenError message={error} />
  ) : (
    <ThreeProvider>
      <ScreenLayout>
        <ErrorBoundary>
          <ScreenCanvas>
            <AmbientLight {...ambientLightSettings} />
            <DirectionalLight {...directionalLightSettings} />
            {/* <Fog {...fogSettings} /> */}
            <Room
              position={new Vector3(-2, -0.6, 0.5)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Chair position={new Vector3(-4.55, -0.6, 0.375)} />
            <Clock
              position={new Vector3(0, 0.85, -0.475)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Desk
              position={new Vector3(-4.175, -0.6, -0.175)}
              rotation={new Vector3(0, degToRad(90), 0)}
            />
            <Hydrangea
              position={new Vector3(-3, -0.1, -0.3)}
              rotation={new Vector3(0, degToRad(90), 0)}
            />
            <LampTable
              position={new Vector3(-3, -0.6, -0.3)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Laptop
              position={new Vector3(-4.55, 0.025, -0.1)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Plant
              position={new Vector3(-2.3, -0.6, -0.2)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Shelf
              position={new Vector3(-1.5, -0.6, -0.3)}
              rotation={new Vector3(0, degToRad(180), 0)}
            />
            <Character />
          </ScreenCanvas>
        </ErrorBoundary>
      </ScreenLayout>
    </ThreeProvider>
  );
}

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
import { OrbitControls } from '@/components/three/orbitControls';
import { ThreeProvider } from '@/providers/threeProvider';

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
            <Room />
            <Character />
            {/* DELETEME */}
            <OrbitControls />
          </ScreenCanvas>
        </ErrorBoundary>
      </ScreenLayout>
    </ThreeProvider>
  );
}

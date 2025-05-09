import { MainLayout } from '@/components/layouts/mainLayout';
import { Content } from '@/components/ui/content';
import { Screen } from '@/components/ui/screen';
import { useEffect } from 'react';

export function MyProfile() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <MainLayout>
      <Screen />
      <Content />
    </MainLayout>
  );
}

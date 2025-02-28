import React from 'react';

type props = {
  children?: React.ReactNode;
};

export function MainLayout({ children }: props) {
  return (
    <div className="flex flex-col sm:items-baseline sm:flex-row">
      {children}
    </div>
  );
}

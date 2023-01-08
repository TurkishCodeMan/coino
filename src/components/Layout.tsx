import React, { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '10rem' }}>
      {children}
    </div>
  );
}

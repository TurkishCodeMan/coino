import React, { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return <div style={{ minHeight: '100vh' }}>{children}</div>;
}

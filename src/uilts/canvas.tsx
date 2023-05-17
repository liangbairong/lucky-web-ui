import React, { useRef, useEffect } from 'react';
import { render, View } from 'lucky-web';

const Canvas = ({ children }: any) => {
  const canvasRef = useRef<any>(null);
  const appRef = useRef<any>(null);
  useEffect(() => {
    if (canvasRef?.current) {
      appRef.current = render(
        <View style={{ flex: 1 }}>{children}</View>,
        canvasRef.current,
      );
    }
    return () => {
      appRef.current && appRef.current.unmount();
    };
  }, [canvasRef.current]);
  return (
    <div
      ref={canvasRef}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    />
  );
};

export default Canvas;

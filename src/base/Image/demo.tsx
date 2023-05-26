import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { Image, lpx } from 'lucky-web';

export default () => {
  return (
    <Canvas>
      <Image
        src={
          'https://showme-livecdn.elelive.net/avatar/10104201?1=1&t=1667002858358'
        }
        style={{ width: lpx(200), height: lpx(200) }}
      />
    </Canvas>
  );
};

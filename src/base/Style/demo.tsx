import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { View, Text, lpx } from 'lucky-web';
const style = {
  box: {
    width: 200,
    height: 100,
    backgroundColor: '#ffcc99',
    justifyContent: 'center',
    alignItem: 'center',
  },
};

export default () => {
  return (
    <Canvas>
      <View style={style.box} />
    </Canvas>
  );
};

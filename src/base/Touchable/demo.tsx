import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { Touchable, Text, lpx } from 'lucky-web';
const style = {
  box: {
    width: 100,
    height: 50,
    backgroundColor: '#4553df',
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
};

export default () => {
  return (
    <Canvas>
      <Touchable
        style={style.box}
        onPress={() => {
          alert('hi');
        }}
      >
        <Text style={style.text}>btn</Text>
      </Touchable>
    </Canvas>
  );
};

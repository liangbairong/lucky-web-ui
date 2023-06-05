import React, { useEffect, useState } from 'react';
import Canvas from '../../uilts/canvas';
import { Touchable, Text, lpx } from 'lucky-web';
import { Toast } from 'lucky-web-ui';
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
          Toast.open({
            content: 'hi',
            time: 2000,
          });
        }}
      >
        <Text style={style.text}>btn</Text>
      </Touchable>
    </Canvas>
  );
};

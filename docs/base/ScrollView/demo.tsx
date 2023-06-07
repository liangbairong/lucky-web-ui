import React, { useEffect, useState } from 'react';
import Canvas from '../../../src/uilts/canvas';
import { ScrollView, View, Text, lpx } from 'lucky-web';

const style = {
  content: {
    flex: 1,
  },
  box: {
    backgroundColor: '#ccc',
    height: lpx(800),
  },
};

export default () => {
  return (
    <Canvas>
      <ScrollView style={style.content}>
        <View style={style.box}>
          <Text>box1</Text>
        </View>
        <View style={[style.box, { backgroundColor: 'red' }]}>
          <Text>box2</Text>
        </View>
        <View style={[style.box, { backgroundColor: '#ee3434' }]}>
          <Text>box3</Text>
        </View>
      </ScrollView>
    </Canvas>
  );
};

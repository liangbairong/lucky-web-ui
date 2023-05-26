import React, { useEffect, useRef } from 'react';
import {
  RevasCanvas,
  Node,
  getFrameFromNode,
  clamp,
  View,
  AnimatedValue,
} from 'lucky-web';
import { Parser, Player, DB } from 'svga';

interface ILuckySvga {
  src: string;
  style?: any;
  playerConfig?: any;
  onInit?: (obj: any) => void;
}

const LuckySvga = ({
  src,
  style,
  playerConfig,
  onInit = () => {},
}: ILuckySvga) => {
  const defaultStyle = {
    width: 200,
    height: 200,
    animated: true,
    ...style,
  };

  const player = useRef<any>(null);
  const domCanvas = useRef<any>(null);
  const op = useRef<any>(new AnimatedValue(1));
  const requestTime = useRef<any>(null);
  useEffect(() => {
    if (src) {
      initSvga();
      animate();
    }

    return () => {
      player.current && player.current.destroy();
      requestTime.current && cancelAnimationFrame(requestTime.current);
      domCanvas.current && document.body.removeChild(domCanvas.current);
    };
  }, [src]);

  const initSvga = async () => {
    domCanvas.current = document.createElement('canvas');
    player.current = new Player({
      // loop: true,
      container: domCanvas.current,
      ...playerConfig,
    });
    let parser: any = null;
    const db = new DB();
    let svga: any = await db.find(src);
    if (!svga) {
      parser = new Parser({ isDisableImageBitmapShim: true });
      svga = await parser.load(src);
      await db.insert(src, svga);
    }
    document.body.appendChild(domCanvas.current);
    await player.current.mount(svga);

    domCanvas.current.style.opacity = '0';
    domCanvas.current.style.pointerEvents = 'none';
    domCanvas.current.style.position = 'absolute';
    domCanvas.current.style.left = '-1000px';
    onInit(player.current);
  };

  const animate = () => {
    requestTime.current = requestAnimationFrame(animate);
    op.current.setValue(1);
  };

  const drawEarth = (canvas: RevasCanvas, node: Node) => {
    if (!player?.current) return;
    const frame = getFrameFromNode(node);
    const { width, height, x, y } = frame;
    if (width <= 0 || height <= 0) {
      return;
    }
    const actualSize = {
      width: domCanvas.current.clientWidth * 1,
      height: domCanvas.current.clientHeight * 1,
    };

    const focusPoint = {
      x: actualSize.width * 0.5,
      y: actualSize.height * 0.5,
    };
    const scale =
      Math.max(width / actualSize.width, height / actualSize.height) || 1;

    const scaledSize = {
      width: actualSize.width * scale,
      height: actualSize.height * scale,
    };
    const sx =
      Math.round(
        clamp(width * 0.5 - focusPoint.x * scale, width - scaledSize.width, 0),
      ) *
      (-1 / scale);
    const sy =
      Math.round(
        clamp(
          height * 0.5 - focusPoint.y * scale,
          height - scaledSize.height,
          0,
        ),
      ) *
      (-1 / scale);
    const sw = Math.round(actualSize.width - sx * 2);
    const sh = Math.round(actualSize.height - sy * 2);
    const dw = Math.round(width);
    const dh = Math.round(height);
    const dx = Math.round(x);
    const dy = Math.round(y);
    if (player.current?.ofsCanvas) {
      canvas.context.drawImage(
        player.current.ofsCanvas,
        0,
        0,
        sw,
        sh,
        dx,
        dy,
        dw,
        dh,
      );
    }
  };
  return (
    <View
      customDrawer={drawEarth}
      style={[defaultStyle, { opacity: op.current }]}
    />
  );
};

export default LuckySvga;

import { useEffect, useRef } from 'react';
import { prepare } from './BubbleAsset';
import styled from '@emotion/styled';

const Bubble = ({ labelScale, textColor, items, bounds }) => {
  const containerRef = useRef(null);

  const resize = () => {
    const scale = containerRef.current.offsetWidth / bounds.width;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const x = item.x * scale;
      const y = item.y * scale;
      const r = item.r * scale;
      const textRef = containerRef.current.querySelector(`#text${i}`);
      const circleRef = containerRef.current.querySelector(`#circle${i}`);
      let fontSize = 1;
      for (let j = 1; j < r * 2; j++) {
        textRef.setAttribute('font-size', `${j}px`);
        const bounds = textRef.getBBox();
        if (bounds.width > r * 2 * labelScale) {
          break;
        }
        fontSize = j;
      }

      circleRef.setAttribute('cx', `${x}px`);
      circleRef.setAttribute('cy', `${y}px`);
      circleRef.setAttribute('r', `${r}px`);
      textRef.setAttribute('font-size', `${fontSize}px`);
      textRef.setAttribute('dy', `${fontSize / 3}px`);
      textRef.setAttribute('x', `${x}px`);
      textRef.setAttribute('y', `${y}px`);
    }
  };

  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 50);
    };
    window.addEventListener('resize', handleResize);

    resize();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [items, bounds, labelScale]);

  return (
    <div ref={containerRef} style={{ transition: '2s', height: '100%' }}>
      <svg width={'100%'} height={'100%'}>
        {items.map(({ x, y, r, backgroundColor, text }, index) => (
          <g key={index}>
            <circle fill={backgroundColor} id={`circle${index}`} />
            <text textAnchor="middle" fill={textColor} id={`text${index}`}>
              {text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const ChartBubble = ({ items, palette, textColor = 'black', labelScale = 0.8 }) => {
  const { preparedItems, bounds } = prepare({
    items,
    palette,
  });

  return (
    <BubbleWrap>
      <Bubble items={preparedItems} bounds={bounds} textColor={textColor} labelScale={labelScale} />
    </BubbleWrap>
  );
};

const BubbleWrap = styled.div`
  width: 100%;
  height: 250px;
`;

export default ChartBubble;

import { useEffect, useRef } from 'react';
import { prepare } from './BubbleAsset';
import styled from '@emotion/styled';

const Bubble = ({ labelScale, items, bounds }) => {
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
            <text
              textAnchor="middle"
              fill={getTextColorByBackgroundColor(backgroundColor)}
              id={`text${index}`}
            >
              {text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

function getTextColorByBackgroundColor(hexColor) {
  const c = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // 색상 선택
  return luma < 127.5 ? 'white' : 'black'; // 글자색이
}

const ChartBubble = ({ items, palette, labelScale = 0.8 }) => {
  const { preparedItems, bounds } = prepare({
    items,
    palette,
  });

  return (
    <BubbleWrap>
      <Bubble items={preparedItems} bounds={bounds} labelScale={labelScale} />
    </BubbleWrap>
  );
};

const BubbleWrap = styled.div`
  width: 100%;
  height: 250px;
`;

export default ChartBubble;

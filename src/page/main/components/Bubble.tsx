import { MutableRefObject, useEffect, useRef } from 'react';
import { prepare } from './BubbleAsset';
import styled from '@emotion/styled';
import { BubbleInitType, BubbleType } from '../../../type/BubbleType';

const Bubble = ({ labelScale, items, bounds }: BubbleType) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const resize = () => {
    const scale = containerRef.current.offsetWidth / Number(bounds.width);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const x = item.x * scale;
      const y = item.y * scale;
      const r = item.r * scale;
      const textRef = containerRef.current.querySelector<SVGTextElement>(`#text${i}`);
      const circleRef = containerRef.current.querySelector<SVGCircleElement>(`#circle${i}`);

      if (!textRef || !circleRef) return;

      let fontSize = 1;
      for (let j = 1; j < r * 2; j++) {
        textRef.setAttribute('font-size', `${j}px`);
        const bounds = textRef.getBBox();
        if (Number(bounds.width) > r * 2 * labelScale) {
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
      circleRef.addEventListener('mouseover', () =>
        circleRef.style.setProperty('r', `${r + 10}px`),
      );
      circleRef.addEventListener('mouseout', () => circleRef.style.setProperty('r', `${r}px`));
      textRef.addEventListener('mouseover', () => circleRef.style.setProperty('r', `${r + 10}px`));
      textRef.addEventListener('mouseout', () => circleRef.style.setProperty('r', `${r}px`));
    }
  };

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
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
    <div ref={containerRef} style={{ transition: '2s, font-size 2s', height: '100%' }}>
      <svg width={'100%'} height={'100%'}>
        {items.map(({ backgroundColor, text }, index) => (
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

function getTextColorByBackgroundColor(hexColor: string) {
  const c = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // 색상 선택
  return luma < 127.5 ? 'white' : 'black'; // 글자색이
}

const ChartBubble = ({ items, labelScale = 0.8 }: BubbleInitType) => {
  const { preparedItems, bounds } = prepare(items);

  return (
    <BubbleWrap>
      <Bubble items={preparedItems} bounds={bounds} labelScale={labelScale} />
    </BubbleWrap>
  );
};

const BubbleWrap = styled.div`
  width: 100%;
  height: 270px;
  margin-bottom: 30px;

  & svg {
    overflow: visible;
    user-select: none;
    cursor: pointer;
    & g circle {
      transition: 0.5s;
    }
  }
`;

export default ChartBubble;

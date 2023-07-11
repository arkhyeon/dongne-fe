import styled from '@emotion/styled';

function AnimationCheck() {
  return (
    <SvgWrap>
      <svg viewBox="0 0 100 100" className="animate">
        <filter id="dropshadow" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood floodColor="rgba(0, 0, 0, 1)" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="blur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="5" />

        <path
          d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19"
          fill="none"
          stroke="rgba(0, 0, 0, 1)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80 1000"
          strokeDashoffset="-220"
          // style="filter:url(#dropshadow)"
        />
      </svg>
    </SvgWrap>
  );
}

const SvgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
  }

  svg.animate path {
    animation: dash 0.75s linear both;
    animation-delay: 0.5s;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 210;
    }
    75% {
      stroke-dashoffset: -220;
    }
    100% {
      stroke-dashoffset: -205;
    }
  }
`;

export default AnimationCheck;

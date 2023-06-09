import React from 'react';
import styled from '@emotion/styled';

function Progressbar({ exp, maxExp }) {
  return (
    <ProgressbarWrap>
      <GaugeWrap>
        <Gauge style={{ width: `${exp / maxExp}px` }}></Gauge>
      </GaugeWrap>
      <p>{exp / maxExp}%</p>
    </ProgressbarWrap>
  );
}

const ProgressbarWrap = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: normal;
  margin-top: 4px;
`;

const GaugeWrap = styled.div`
  width: 100%;
  height: 6px;
  background-color: white;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
`;

const Gauge = styled.div`
  width: 30%;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: darkorange;
  border-radius: 3px;
`;

export default Progressbar;

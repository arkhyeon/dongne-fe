import styled from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HiSortDescending } from 'react-icons/hi';
import { css } from '@emotion/react';

interface PopUpType {
  children: React.ReactNode;
  value: string | undefined;
  icon?: React.ReactNode | undefined;
}

function SelectPopup({ children, value, icon }: PopUpType) {
  const [show, setShow] = useState(false);
  const selectRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleOut = useCallback(
    (e: MouseEvent) => {
      if (show && !selectRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    },
    [show],
  );

  useEffect(() => {
    document.addEventListener('mousedown', e => handleOut(e));

    return () => {
      document.removeEventListener('mousedown', e => handleOut(e));
    };
  }, [handleOut]);

  return (
    <SelectPopupWrap ref={selectRef} onClick={() => setShow(prevState => !prevState)}>
      <SelectPopupLabel>
        {icon ? <>{icon}</> : <HiSortDescending style={{ top: '2px' }} />}
        {value}
      </SelectPopupLabel>
      {/*<SelectOptionWrap>{children}</SelectOptionWrap>*/}
      {show && <SelectOptionWrap value={value}>{children}</SelectOptionWrap>}
    </SelectPopupWrap>
  );
}

export function SelectPopupOption(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  return (
    <SelectOption {...props} data-selected={props.children}>
      {props.children}
    </SelectOption>
  );
}

const SelectPopupWrap = styled.div`
  min-width: 80px;
  border: 1px solid #aaa;
  border-radius: 5px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
`;

const SelectPopupLabel = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  & svg {
    font-size: 20px;
    position: relative;
  }
`;

const SelectOptionWrap = styled.div<{ value: string | undefined }>`
  width: 120px;
  position: absolute;
  top: 40px;
  overflow: hidden;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  ${({ value }) => {
    return css`
      & [data-selected=${value}] {
        color: #0a91ab;
      }
    `;
  }}
`;

const SelectOption = styled.div`
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding-left: 5px;

  &:hover {
    color: #0a91ab;
  }
`;

export default SelectPopup;

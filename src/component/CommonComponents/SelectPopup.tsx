import styled from '@emotion/styled';
import React, {
  AriaAttributes,
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
  value: string;
}

function SelectPopup({ children, value }: PopUpType) {
  console.log(typeof children);
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
        <HiSortDescending />
        {value}
      </SelectPopupLabel>
      {/*<SelectOptionWrap>{children}</SelectOptionWrap>*/}
      {show && <SelectOptionWrap value={value}>{children}</SelectOptionWrap>}
    </SelectPopupWrap>
  );
}

export function SelectPopupOption(props: HTMLDivElement) {
  return (
    <SelectOption {...props} aria-controls={props.children}>
      {props.children}
    </SelectOption>
  );
}

const SelectPopupWrap = styled.div`
  width: 100px;
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
    top: 2px;
  }
`;

const SelectOptionWrap = styled.div<{ value: string }>`
  width: 120px;
  position: absolute;
  top: 40px;
  overflow: hidden;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  ${({ value }) => {
    return css`
      & [aria-controls=${value}] {
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

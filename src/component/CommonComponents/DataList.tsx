import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { DataListInput } from './TextInput';

interface DataListType {
  id: string;
  valueList: string[];
  labelList: string[];
  setData: (value: string) => void;
  select?: boolean;
  defaultValue: string;
  height?: string;
  disabled?: boolean;
}

function DataList({
  id,
  valueList,
  labelList = [],
  setData,
  select = false,
  defaultValue = '',
  height = '400px',
  disabled = false,
}: DataListType) {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const dataListWrapRef = useRef() as MutableRefObject<HTMLUListElement>;
  const dataList = valueList.map((value, i) => {
    return { value, label: labelList[i] || value };
  });
  const [dataListState, setDataListState] = useState(dataList);

  useEffect(() => {
    document.addEventListener('mousedown', e => exitDataList(e));
    return () => document.removeEventListener('mousedown', e => exitDataList(e));
  }, []);

  useEffect(() => {
    setDataListState(dataList);
    if (defaultValue === '') {
      ref.current.value = labelList[0] || valueList[0];
      // setTextData(valueList[0], labelList[0] || valueList[0]);
    } else {
      for (let i = 0; i < valueList.length; i++) {
        if (valueList[i] === defaultValue) {
          ref.current.value = labelList[i] || defaultValue;
          // setTextData(defaultValue, labelList[i] || defaultValue);
        }
      }
    }
  }, [valueList]);

  useEffect(() => {
    if (labelList.length === 0) {
      ref.current.value = defaultValue;
    } else {
      for (let i = 0; i < valueList.length; i++) {
        if (valueList[i] === defaultValue) {
          ref.current.value = labelList[i];
        }
      }
    }
  }, [defaultValue]);

  const exitDataList = (e: MouseEvent) => {
    if (
      dataListWrapRef.current === null ||
      dataListWrapRef.current.contains(e.target as Node) ||
      ref.current.contains(e.target as Node)
    ) {
      return;
    }
    dataListWrapRef.current.style.display = 'none';
  };

  const searchData = (value: string, label: string) => {
    setData(value);
    if (select) {
      return;
    }
    const searchList = dataList.filter(data => {
      const stringLabel = data.label.toString();
      return stringLabel.includes(label);
    });

    dataListWrapRef.current.style.display = 'block';

    if (!searchList[0]) {
      dataListWrapRef.current.style.display = 'none';
      setDataListState([]);
      return;
    }

    if (searchList[0].label === value && searchList.length === 1) {
      dataListWrapRef.current.style.display = 'none';
      return;
    }

    setDataListState(searchList);
  };

  const setTextData = (value: string, label: string) => {
    ref.current.value = label;
    searchData(value, label);
    dataListWrapRef.current.style.display = 'none';
  };

  let moveCount = -1;

  const arrowMove = (e: React.KeyboardEvent<HTMLLIElement | HTMLInputElement>) => {
    const dataListItemList = dataListWrapRef.current.children;

    for (let i = 0; i < dataListItemList.length; i++) {
      dataListItemList[i].classList.remove('activeDataList');
    }

    // 위
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (moveCount <= 0) {
        (dataListItemList[dataListItemList.length - 1] as HTMLElement).focus();
        dataListItemList[dataListItemList.length - 1].classList.add('activeDataList');
        moveCount = dataListItemList.length - 1;
      } else {
        moveCount--;
        (dataListItemList[moveCount] as HTMLElement).focus();
        dataListItemList[moveCount]?.classList.add('activeDataList');
      }
    }

    // 아래
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (moveCount >= dataListItemList.length - 1) {
        (dataListItemList[0] as HTMLElement).focus();
        dataListItemList[0].classList.add('activeDataList');
        moveCount = 0;
      } else {
        moveCount++;
        (dataListItemList[moveCount] as HTMLElement).focus();
        dataListItemList[moveCount]?.classList.add('activeDataList');
      }
    }

    if (e.key === 'Enter') {
      const dataListItemValue = dataListItemList[moveCount]?.attributes.getNamedItem('value');
      if (!dataListItemValue?.value || !dataListItemValue?.ownerElement?.textContent) return;

      setTextData(dataListItemValue.value, dataListItemValue.ownerElement.textContent);
    }
  };

  return (
    <>
      <DataListWrap>
        <DataListInput
          id={id}
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            searchData(e.target.value, e.target.value)
          }
          autoComplete="off"
          onFocus={() => (dataListWrapRef.current.style.display = 'block')}
          onKeyDown={e => arrowMove(e)}
          readOnly={select}
          disabled={disabled ?? false}
        />
        <DataListItemWrap ref={dataListWrapRef} height={height}>
          {dataListState.map((data, i) => {
            return (
              <DataListItem
                tabIndex={i}
                key={data.value}
                value={data.value}
                onClick={() => setTextData(data.value, data.label)}
                onKeyDown={e => arrowMove(e)}
              >
                {data.label}
              </DataListItem>
            );
          })}
        </DataListItemWrap>
      </DataListWrap>
    </>
  );
}

const DataListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const DataListItemWrap = styled.ul<{ height: string }>`
  width: 100%;
  max-height: ${({ height }) => height};
  display: none;
  position: absolute;
  top: 99%;
  background: white;
  z-index: 9999;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d3d3d3;
  }
`;

const DataListItem = styled.li`
  border-bottom: 1px solid #ced4da;
  outline: none;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;

  &:hover,
  &:focus,
  &.activeDataList {
    background-color: #ffc045;
    color: white;
  }
`;

export default DataList;

import styled from '@emotion/styled';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

function Pagination({ totalLength = 0, buttonLength = 5, pageEvent, currentPage = 1 }) {
  const offset = () => {
    if (currentPage < buttonLength) {
      return Math.floor((currentPage - 1) / buttonLength) * buttonLength;
    }

    return currentPage - Math.ceil(buttonLength / 2);
  };

  const movePage = pageNum => {
    if (currentPage === pageNum || pageNum <= 0 || totalLength < pageNum) {
      return;
    }
    pageEvent(pageNum);
  };

  return (
    <PaginationWrap>
      <PaginationItem onClick={() => movePage(currentPage - 1)}>
        <BsArrowLeft />
        Previous
      </PaginationItem>
      <PaginationListWrap>
        {currentPage >= buttonLength && (
          <>
            <PaginationItem
              onClick={() => movePage(1)}
              aria-current={currentPage === 1 ? 'page' : null}
            >
              1
            </PaginationItem>
            <PaginationItem onClick={() => movePage(currentPage - (buttonLength - 1))}>
              . . .
            </PaginationItem>
          </>
        )}
        {Array.from(Array(totalLength), (_, i) => i + 1)
          .slice(offset(), offset() + buttonLength)
          .map(arr => (
            <PaginationItem
              onClick={() => movePage(arr)}
              aria-current={currentPage === arr ? 'page' : null}
              key={arr}
            >
              {arr}
            </PaginationItem>
          ))}
        <PaginationItem onClick={() => movePage(currentPage + (buttonLength - 1))}>
          . . .
        </PaginationItem>
        <PaginationItem
          onClick={() => movePage(totalLength)}
          aria-current={currentPage === totalLength ? 'page' : null}
        >
          {totalLength}
        </PaginationItem>
      </PaginationListWrap>
      <PaginationItem onClick={() => movePage(currentPage + 1)}>
        Next
        <BsArrowRight />
      </PaginationItem>
    </PaginationWrap>
  );
}

const PaginationWrap = styled.ul`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  border-top: 1px solid #0a91ab;
  border-bottom: 1px solid #0a91ab;
  box-sizing: border-box;
  user-select: none;
`;

const PaginationListWrap = styled.div`
  display: flex;
`;

const PaginationItem = styled.li`
  padding: 0 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #3e3e3e;
  gap: 5px;

  &:hover,
  &[aria-current] {
    color: #0a91ab;
    font-weight: bold;
  }

  &[aria-current] {
    box-shadow: inset 0 2px 0 #0a91ab;
  }

  & svg {
    font-size: 20px;
  }
`;

export default Pagination;

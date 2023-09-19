import { logRoles, render, screen } from '@testing-library/react';
import SirenReport from '../SirenReport';
import userEvent from '@testing-library/user-event';
import Modal from '../../modal/Modal';

test.only('신고 버튼 클릭 시 모달 확인', async () => {
  render(<SirenReport boardId="1" />);
  const user = userEvent.setup();

  const sirenButton = screen.getByRole('button');

  expect(sirenButton).toBeInTheDocument();
  expect(sirenButton).toHaveClass('flex-cc');

  user.click(sirenButton);

  const closeButton = document.querySelector<Element>('cloes-btn');
  logRoles(closeButton as HTMLElement);
  // screen.debug(container);
  // screen.debug(closeButton);
});

test('모달', async () => {
  const handleClose = jest.fn();
  const user = userEvent.setup();
  const modalOpen = true;
  render(
    <Modal open={modalOpen} handleClose={handleClose}>
      <Modal.Header closeButton>Header Test</Modal.Header>
      <Modal.Body>Body Test</Modal.Body>
      <Modal.Footer>Footer Test</Modal.Footer>
    </Modal>,
  );

  const modalHeader = screen.getByText('Header Test');
  const modalBody = screen.getByText('Body Test');
  const modalFooter = screen.getByText('Footer Test');
  expect(modalHeader).toBeInTheDocument();
  expect(modalBody).toBeInTheDocument();
  expect(modalFooter).toBeInTheDocument();

  const closeButton = screen.getByRole('button');
  await user.click(closeButton);

  expect(handleClose).toHaveBeenCalled();
});

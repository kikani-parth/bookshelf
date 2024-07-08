import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalOpenButton, ModalContents } from "../modal";

test("can be opened and closed", async () => {
  const label = "Modal Label";
  const title = "Modal Title";
  const content = "Modal content";

  // render the Modal, ModalOpenButton, and ModalContents
  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <div>{content}</div>
      </ModalContents>
    </Modal>
  );
  await userEvent.click(screen.getByRole("button", { name: /open/i }));

  // verify the modal contains the modal contents, title, and label
  const modal = screen.getByRole("dialog");
  expect(modal).toHaveAttribute("aria-label", label);
  const inModal = within(modal);
  expect(inModal.getByRole("heading", { name: title })).toBeInTheDocument();
  expect(inModal.getByText(content)).toBeInTheDocument();

  await userEvent.click(inModal.getByRole("button", { name: /close/i }));

  //verify the modal is no longer rendered
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

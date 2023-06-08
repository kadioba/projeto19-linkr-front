import { Container, Cover, CancelButton, ConfirmButton } from "./styles";

export default function ConfirmationDialog(props) {
  const { onCancel, onConfirm } = props;

  const confirmationConfig = {
    submitDelete: {
      message: "Are you sure you want to delete this post?",
      cancelText: "No, go back",
      confirmText: "Yes, delete it",
    },
    submitRepost: {
      message: "Do you want to re-post this link?",
      cancelText: "No, cancel",
      confirmText: "Yes, share!",
    },
  };

  const actionType = onConfirm.name;
  const { message, cancelText, confirmText } = confirmationConfig[actionType];

  const confirmAction = () => {
    onConfirm(actionType);
  };

  return (
    <Cover>
      <Container>
        <h1>{message}</h1>
        <div>
          <CancelButton data-test="cancel" onClick={onCancel}>
            {cancelText}
          </CancelButton>
          <ConfirmButton data-test="confirm" onClick={confirmAction}>
            {confirmText}
          </ConfirmButton>
        </div>
      </Container>
    </Cover>
  );
}

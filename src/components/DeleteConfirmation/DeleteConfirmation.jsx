import { Container, Cover, DeleteButton, RetrieveButton } from "./styles";

export default function DeleteConfirmation(props) {
  return (
    <Cover>
      <Container>
        <h1>Are you sure you want to delete this post?</h1>
        <div>
          <RetrieveButton data-test="cancel" onClick={() => props.setDeleteConfirmation(false)}>
            No, go back
          </RetrieveButton>
          <DeleteButton data-test="confirm" onClick={props.submitDelete}>
            Yes, delete it
          </DeleteButton>
        </div>
      </Container>
    </Cover>
  );
}

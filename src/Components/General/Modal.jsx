function Modal(props) {
  const { removeModal } = props;
  return (
    <div className="modal-background" onClick={removeModal}>
      <div className="modal"></div>
    </div>
  );
}

export default Modal;

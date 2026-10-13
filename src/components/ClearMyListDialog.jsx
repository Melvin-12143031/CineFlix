const ClearMyListDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <section
        className="clear-list-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="clear-list-title"
        aria-describedby="clear-list-description"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="clear-list-title">Clear My List?</h2>

        <p id="clear-list-description">
          Are you sure you want to remove all saved movies?
          This action cannot be undone.
        </p>

        <div className="dialog-actions">
          <button
            className="cancel-button"
            onClick={onCancel}
          >
            Keep My List
          </button>

          <button
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Clear List
          </button>
        </div>
      </section>
    </div>
  );
};

export default ClearMyListDialog;
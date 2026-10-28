import Icon from './Icon';

function LoadingRows() {
  return (
    <div className="loading-rows" aria-label="Loading records">
      {[1, 2, 3].map((row) => <span key={row} />)}
    </div>
  );
}

function EmptyState({ title, detail }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon name="box" size={23} /></span>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-icon"><Icon name="alert" size={18} /></span>
      <div>
        <strong>Couldn’t load this data</strong>
        <p>{message}</p>
      </div>
      <button className="text-button" type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}

const RecordStates = {
  Loading: LoadingRows,
  Empty: EmptyState,
  Error: ErrorState,
};

export default RecordStates;

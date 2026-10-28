function DashboardFooter({ connectionStatus, hasError }) {
  return (
    <footer className="page-footer">
      <span>Commerce Desk</span>
      <span role="status">{connectionStatus} <i className={hasError ? 'footer-dot offline' : 'footer-dot'} /></span>
    </footer>
  );
}

export default DashboardFooter;

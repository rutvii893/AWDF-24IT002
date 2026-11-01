export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'rgba(239, 68, 68, 0.1)', 
      border: '1px solid rgba(239, 68, 68, 0.3)', 
      borderRadius: 'var(--radius-md)', 
      margin: '20px 0',
      textAlign: 'center'
    }}>
      <p style={{ color: '#f87171', margin: '0 0 14px 0', fontWeight: 500 }}>⚠️ {message}</p>
      <button 
        onClick={onRetry}
        className="btn"
        style={{ 
          padding: '8px 18px', 
          backgroundColor: '#ef4444', 
          color: 'white',
          fontSize: '0.9rem'
        }}
      >
        Try Again
      </button>
    </div>
  );
}

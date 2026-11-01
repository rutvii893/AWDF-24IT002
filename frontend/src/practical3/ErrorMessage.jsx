export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#ffe6e6', border: '1px solid red', borderRadius: '5px', margin: '10px 0' }}>
      <p style={{ color: 'red', margin: '0 0 10px 0' }}>Error: {message}</p>
      <button 
        onClick={onRetry}
        style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Try Again
      </button>
    </div>
  );
}

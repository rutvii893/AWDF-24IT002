function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '260px',
      padding: '30px',
      margin: '20px 0',
      background: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '6px'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid #e0e0e0',
        borderTopColor: '#0066cc',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '15px'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ margin: 0, fontSize: '1rem', color: '#555', fontWeight: 500 }}>
        Loading component...
      </p>
    </div>
  );
}

export default LoadingFallback;

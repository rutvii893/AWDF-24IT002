export default function Spinner() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px', 
      color: 'var(--text-muted)' 
    }}>
      <div style={{
        width: '34px',
        height: '34px',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '12px'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: '0.95rem' }}>Loading, please wait...</span>
    </div>
  );
}

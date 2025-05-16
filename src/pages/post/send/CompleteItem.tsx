export default function CompleteItem() {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto', background: '#f8ffe5', minHeight: '100dvh', fontFamily: "'font', 'Noto Sans KR', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
      <h2 style={{ fontSize: '1.3rem', margin: '18px 0 8px 0', textAlign: 'center' }}>언제든 다시 보고 싶은 편지,<br/>보관함에 소중히 넣어두었어요.</h2>
      <img src="/icons/office/otter_postman.webp" alt="postman" style={{ width: 120, height: 120, margin: '12px 0' }} />
      <p style={{ fontSize: '1.1rem', margin: '10px 0 2px 0', textAlign: 'center' }}>새로운 아이템이 도착했어요!<br/>어서 확인해보세요!</p>
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center', marginTop: 18 }}>
        <button style={{ width: 120, height: 60, fontSize: '1.1rem', borderRadius: 12, border: 'none', background: '#fffbe6', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}>아이템 보관함 가기</button>
        <button style={{ width: 120, height: 60, fontSize: '1.1rem', borderRadius: 12, border: 'none', background: '#fffbe6', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}>메인화면 가기</button>
      </div>
    </div>
  );
} 
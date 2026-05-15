import { MapPin, Clock, CheckCircle } from 'lucide-react';

function History() {
  const reports = [
    {
      id: 'REP-001',
      date: '2026-05-14',
      type: 'Pothole',
      location: 'Koramangala 80ft Road',
      status: 'pending',
      originalImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
      resolvedImage: null,
      points: 10
    },
    {
      id: 'REP-002',
      date: '2026-05-10',
      type: 'Garbage Dump',
      location: 'HSR Layout Sector 2',
      status: 'resolved',
      originalImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=400',
      resolvedImage: 'https://images.unsplash.com/photo-1584820927498-cafe2c1dc769?auto=format&fit=crop&q=80&w=400',
      points: 10
    },
    {
      id: 'REP-003',
      date: '2026-05-02',
      type: 'Pothole (Duplicate)',
      location: 'Indiranagar 100ft Road',
      status: 'resolved',
      originalImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
      resolvedImage: 'https://images.unsplash.com/photo-1584820927498-cafe2c1dc769?auto=format&fit=crop&q=80&w=400',
      points: 2
    }
  ];

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Reports</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track the progress of the issues you have reported.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {reports.map((report) => (
          <div key={report.id} className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '16px', flex: '1', minWidth: '300px' }}>
              <img 
                src={report.originalImage} 
                alt="Reported" 
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0 }}>{report.type}</h3>
                  <span className={`status-badge status-${report.status}`}>
                    {report.status === 'resolved' ? 'Resolved' : 'Pending'}
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <MapPin size={14} /> {report.location}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> Reported on {report.date}
                </div>
                <div style={{ marginTop: '8px', fontWeight: 'bold', color: 'var(--warning)' }}>
                  +{report.points} Points Earned
                </div>
              </div>
            </div>

            {report.status === 'resolved' && report.resolvedImage && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle size={24} color="var(--success)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 'bold' }}>FIXED BY ADMIN</div>
                </div>
                <img 
                  src={report.resolvedImage} 
                  alt="Resolved" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '2px solid var(--success)' }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;

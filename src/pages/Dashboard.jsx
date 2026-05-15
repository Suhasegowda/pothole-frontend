import { useState, useRef } from 'react';
import { Upload, Scan, CheckCircle, AlertTriangle, MapPin, Camera, Image as ImageIcon } from 'lucide-react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setScanResult(null);
    }
  };

  const handleScan = () => {
    if (!file || !category) return;
    
    setScanning(true);
    setScanResult(null);

    // Simulate AI Scan and PostGIS check
    setTimeout(() => {
      setScanning(false);
      // Simulate 80% success rate, 20% duplicate/invalid
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setScanResult({
          status: 'success',
          message: 'AI validated! No duplicates found in 10m radius. You will earn +10 points.',
          confidence: Math.floor(Math.random() * 15) + 85 // 85-99%
        });
      } else {
        setScanResult({
          status: 'warning',
          message: 'Duplicate detected! A similar issue was reported 4m away. You earn +2 points for verifying.',
          confidence: 94
        });
      }
    }, 2500);
  };

  const handleSubmit = () => {
    alert('Issue uploaded successfully! Points added to your profile.');
    setFile(null);
    setPreview(null);
    setCategory('');
    setOtherDescription('');
    setScanResult(null);
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Report an Issue</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Help keep Bengaluru clean and safe. Take a photo to report.</p>
      </div>

      <div className="dashboard-grid">
        <div className="main-content">
          <div className={`glass-panel upload-card ${scanning ? 'scanning' : ''}`}>
            {!preview ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div 
                  className="upload-area" 
                  style={{ marginBottom: 0, padding: '32px 16px' }}
                  onClick={() => cameraInputRef.current.click()}
                >
                  <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                    <Camera size={32} />
                  </div>
                  <h4 style={{ marginTop: '12px' }}>Take Photo</h4>
                </div>
                
                <div 
                  className="upload-area" 
                  style={{ marginBottom: 0, padding: '32px 16px' }}
                  onClick={() => galleryInputRef.current.click()}
                >
                  <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
                    <ImageIcon size={32} />
                  </div>
                  <h4 style={{ marginTop: '12px' }}>Upload Gallery</h4>
                </div>
              </div>
            ) : (
              <div className="upload-area has-image" onClick={() => galleryInputRef.current.click()}>
                <img src={preview} alt="Preview" className="preview-image" />
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Click image to change</p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={cameraInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <input 
              type="file" 
              accept="image/*" 
              ref={galleryInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />

            <div className="form-group" style={{ textAlign: 'left', marginTop: '24px' }}>
              <label>Select Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Choose the type of issue...</option>
                <option value="pothole">Pothole</option>
                <option value="garbage">Garbage Dump</option>
                <option value="manhole">Open Manhole</option>
                <option value="others">Others</option>
              </select>
            </div>

            {category === 'others' && (
              <div className="form-group animate-fade-in" style={{ textAlign: 'left' }}>
                <label>Describe the Problem</label>
                <textarea 
                  rows="3" 
                  value={otherDescription} 
                  onChange={(e) => setOtherDescription(e.target.value)}
                  placeholder="Please describe what the issue is..."
                />
              </div>
            )}

            {!scanResult && (
              <button 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '16px', opacity: (!file || !category || scanning) ? 0.5 : 1 }}
                onClick={handleScan}
                disabled={!file || !category || scanning}
              >
                {scanning ? (
                  <>Scanning with AI...</>
                ) : (
                  <><Scan size={20} /> Scan & Validate Image</>
                )}
              </button>
            )}

            {scanResult && (
              <div className="animate-fade-in" style={{ marginTop: '24px', textAlign: 'left' }}>
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  background: scanResult.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  border: `1px solid ${scanResult.status === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    {scanResult.status === 'success' ? <CheckCircle color="var(--success)" /> : <AlertTriangle color="var(--warning)" />}
                    <h4 style={{ color: scanResult.status === 'success' ? 'var(--success)' : 'var(--warning)' }}>
                      {scanResult.status === 'success' ? 'Validation Passed' : 'Duplicate Found'}
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
                    {scanResult.message}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    AI Confidence: <span style={{ color: 'white', fontWeight: 'bold' }}>{scanResult.confidence}%</span>
                  </p>
                </div>

                <button className="btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>
                  <Upload size={20} /> Ok, Upload Report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--accent-primary)" /> Live Map
            </h3>
            <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden' }}>
              <Map
                initialViewState={{
                  longitude: 77.5946,
                  latitude: 12.9716,
                  zoom: 11
                }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken="pk.eyJ1IjoiZHVtbXl1c2VyIiwiYSI6ImNsdW1teXRva2VuZm9yaGFja2F0aG9uIn0.dummytoken"
              >
                <Marker longitude={77.6} latitude={12.97} color="red" />
                <Marker longitude={77.58} latitude={12.93} color="orange" />
              </Map>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--warning)', marginTop: '8px', textAlign: 'center' }}>
              *Mapbox requires a valid API key in code
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--accent-primary)" /> Live Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Reports Today</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>142</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Resolved Issues</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success)' }}>89</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Your Points</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--warning)' }}>450</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

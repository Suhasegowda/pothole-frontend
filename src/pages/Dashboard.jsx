import { useState, useRef } from 'react';
import { Upload, Scan, CheckCircle, AlertTriangle, MapPin, Camera, Image as ImageIcon, X } from 'lucide-react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import uploadImage from '../utils/imageUpload';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setScanResult(null);
    }
  };

  const startCamera = async () => {
    setCameraError('');
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError('Unable to access camera. Please allow camera permissions or use gallery.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data url
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPreview(dataUrl);
      
      // Mock creating a file object from data url for the upload logic
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const capturedFile = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });
          setFile(capturedFile);
        });

      setScanResult(null);
      stopCamera();
    }
  };

  const handleScan = () => {
    if (!file || !category) return;
    setScanning(true);
    setScanResult(null);

    // Simulate AI Scan
    setTimeout(() => {
      setScanning(false);
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setScanResult({
          status: 'success',
          message: 'AI validated! No duplicates found in 10m radius. You will earn +10 points.',
          confidence: Math.floor(Math.random() * 15) + 85
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

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsSubmitting(true);
    const result = await uploadImage(file);
    
    if (result.success) {
      alert('Issue reported successfully! Your image has been securely uploaded.');
      console.log('ImgBB URL:', result.url);
      
      // Increment reported issues count
      const currentCount = parseInt(localStorage.getItem('issuesCount') || '0', 10);
      localStorage.setItem('issuesCount', (currentCount + 1).toString());
      
      setFile(null);
      setPreview(null);
      setCategory('');
      setRemarks('');
      setOtherDescription('');
      setScanResult(null);
    } else {
      alert('Failed to upload image: ' + result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Report an Issue</h1>
        <p className="text-slate-500">Help keep your city clean and safe. Take a photo to report an issue directly to authorities.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all ${scanning ? 'ring-4 ring-blue-50' : ''}`}>
            
            {/* Camera View */}
            {isCameraOpen ? (
              <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden mb-6 flex flex-col items-center justify-center">
                {cameraError ? (
                  <div className="text-center p-6 text-white">
                    <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
                    <p className="text-sm font-medium mb-4">{cameraError}</p>
                    <button 
                      onClick={stopCamera}
                      className="px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                      Close Camera
                    </button>
                  </div>
                ) : (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 px-6">
                      <button 
                        onClick={stopCamera}
                        className="px-6 py-3 bg-red-600/90 text-white rounded-full font-bold hover:bg-red-700 backdrop-blur-md transition shadow-lg"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={capturePhoto}
                        className="px-8 py-3 bg-white text-cyan-500 rounded-full font-bold hover:bg-slate-100 transition shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
                      >
                        <Camera size={20} /> Snap
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : !preview ? (
              /* Selection Buttons */
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={startCamera}
                  className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl hover:bg-cyan-50 hover:border-blue-300 transition-colors group"
                >
                  <div className="p-3 bg-white rounded-full shadow-sm text-cyan-500 group-hover:scale-110 transition-transform mb-3">
                    <Camera size={28} />
                  </div>
                  <span className="font-semibold text-slate-700">Take Photo</span>
                  <span className="text-xs text-slate-400 mt-2 font-medium bg-slate-200/50 px-2 py-1 rounded">Live Camera</span>
                </button>
                
                <button 
                  onClick={() => galleryInputRef.current.click()}
                  className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl hover:bg-cyan-50 hover:border-blue-300 transition-colors group"
                >
                  <div className="p-3 bg-white rounded-full shadow-sm text-cyan-500 group-hover:scale-110 transition-transform mb-3">
                    <ImageIcon size={28} />
                  </div>
                  <span className="font-semibold text-slate-700">Upload Gallery</span>
                  <span className="text-xs text-slate-400 mt-2 font-medium bg-slate-200/50 px-2 py-1 rounded">From Device</span>
                </button>
              </div>
            ) : (
              /* Preview View */
              <div 
                className="relative w-full h-[400px] rounded-xl overflow-hidden mb-6 cursor-pointer group bg-slate-100 flex items-center justify-center"
                onClick={() => setPreview(null)}
              >
                <img src={preview} alt="Preview" className="w-full h-full object-contain bg-black/5" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <span className="text-white font-bold px-6 py-3 border-2 border-white/50 rounded-xl flex items-center gap-2">
                    <X size={20} /> Clear Photo
                  </span>
                </div>
              </div>
            )}
            
            <input type="file" accept="image/*" ref={galleryInputRef} className="hidden" onChange={handleFileChange} />

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="" disabled>Choose the type of issue...</option>
                <option value="pothole">Pothole</option>
                <option value="garbage">Garbage Dump</option>
                <option value="manhole">Open Manhole</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Remarks</label>
              <textarea 
                rows="3" 
                value={remarks} 
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add any additional details or context..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {category === 'others' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Describe the Problem</label>
                <textarea 
                  rows="3" 
                  value={otherDescription} 
                  onChange={(e) => setOtherDescription(e.target.value)}
                  placeholder="Please describe what the issue is..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            )}

            {!scanResult && (
              <button 
                onClick={handleScan}
                disabled={!file || !category || scanning}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition ${
                  (!file || !category || scanning) ? 'bg-slate-300 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-500 shadow-md'
                }`}
              >
                {scanning ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Scanning with AI...
                  </span>
                ) : (
                  <><Scan size={20} /> Scan & Validate Image</>
                )}
              </button>
            )}

            {scanResult && (
              <div className="mt-6 animate-fade-in">
                <div className={`p-5 rounded-xl border mb-6 ${
                  scanResult.status === 'success' ? 'bg-cyan-50 border-blue-200' : 'bg-amber-50 border-amber-200'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    {scanResult.status === 'success' ? <CheckCircle className="text-cyan-500" /> : <AlertTriangle className="text-amber-500" />}
                    <h4 className={`font-bold text-lg ${scanResult.status === 'success' ? 'text-slate-800' : 'text-amber-800'}`}>
                      {scanResult.status === 'success' ? 'Validation Passed' : 'Duplicate Found'}
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    {scanResult.message}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    AI Confidence: <span className={scanResult.status === 'success' ? 'text-cyan-500' : 'text-amber-700'}>{scanResult.confidence}%</span>
                  </p>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white bg-cyan-500 hover:bg-cyan-500 shadow-md flex items-center justify-center gap-2 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Uploading...
                    </span>
                  ) : (
                    <><Upload size={20} /> Ok, Upload Report</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-cyan-500" /> Live Map
            </h3>
            <div className="h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <Map
                initialViewState={{
                  longitude: 77.5946,
                  latitude: 12.9716,
                  zoom: 11
                }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
              >
                <Marker longitude={77.6} latitude={12.97} color="#15803d" />
                <Marker longitude={77.58} latitude={12.93} color="#f59e0b" />
              </Map>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 text-center">
              *Powered by Maplibre (Free & Open Source)
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Live Stats</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                <span className="text-slate-500 font-medium text-sm">Reports Today</span>
                <span className="text-2xl font-bold text-slate-800">142</span>
              </div>
              <div className="bg-cyan-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                <span className="text-cyan-500 font-medium text-sm">Resolved Issues</span>
                <span className="text-2xl font-bold text-cyan-500">89</span>
              </div>
              <div className="bg-cyan-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                <span className="text-cyan-500 font-medium text-sm">Your Points</span>
                <span className="text-2xl font-bold text-cyan-500">450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

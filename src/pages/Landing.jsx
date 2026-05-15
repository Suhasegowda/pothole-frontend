import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function Landing() {
  const [dynamicStats, setDynamicStats] = useState({
    reported: 5,
    resolved: 2,
    rate: 40,
    time: 2
  });

  useEffect(() => {
    // Add user's reported issues to the global base count
    const userIssues = parseInt(localStorage.getItem('issuesCount') || '0', 10);
    if (userIssues > 0) {
      setDynamicStats(prev => ({
        ...prev,
        reported: 5 + userIssues,
        resolved: 2 + Math.floor(userIssues / 2),
        rate: Math.min(100, Math.floor(((2 + Math.floor(userIssues / 2)) / (5 + userIssues)) * 100))
      }));
    }
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="CivicLens" className="h-10 object-contain" onError={(e) => e.target.style.display='none'} />
              <span className="font-bold text-xl text-slate-800">CivicLens</span>
            </div>
            <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
              <Link to="/map" className="text-gray-600 hover:text-cyan-500 flex items-center gap-1">
                Map View
              </Link>
              <a href="#about" className="text-gray-600 hover:text-cyan-500 flex items-center gap-1">
                About
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-cyan-500 flex items-center gap-1">
                FAQs
              </a>
              <Link to="/login" className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-50 transition flex items-center gap-1">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
            Report Civic<br/>Issues. Drive<br/>Change Together.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
            Upload civic problems in your city, share with your community, and track resolutions with full transparency. Join thousands of Indians making their cities better.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition shadow-md">
              Report an Issue
            </Link>
            <Link to="/map" className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition shadow-md">
              View Global Issue Map
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          {/* Interactive Maplibre Map */}
          <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
            <Map
              initialViewState={{
                longitude: 72.8311,
                latitude: 21.1702,
                zoom: 11
              }}
              mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
              <Marker longitude={72.83} latitude={21.17} color="#15803d" />
              <Marker longitude={72.85} latitude={21.19} color="#15803d" />
              <Marker longitude={72.80} latitude={21.15} color="#ef4444" />
            </Map>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <span className="inline-block bg-cyan-50 text-cyan-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-blue-200">
              ✓ Simple & Effective Process
            </span>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our revolutionary 4-step process empowers every Indian citizen to drive meaningful change in their communities through transparency and collective action
            </p>
          </div>
          
          <div className="space-y-32 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="md:w-1/2 text-left md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-500 mb-4 md:ml-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Upload the Issue</h3>
                <p className="text-gray-600">Citizens report civic problems with detailed photos and precise location data, creating a comprehensive issue database.</p>
              </div>
              <div className="md:w-1/2 relative group">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20 hidden md:flex border-4 border-white shadow-sm">1</div>
                <div className="bg-cyan-50 rounded-2xl p-4 shadow-sm border border-blue-100 overflow-hidden relative h-64 w-full cursor-pointer">
                   <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Pothole illustration" className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Step 2 (Formerly Step 3) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 relative z-10">
              <div className="md:w-1/2 text-left md:pl-12">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-500 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Authority Action</h3>
                <p className="text-gray-600">Growing community pressure and transparent reporting compels local authorities to acknowledge and respond to urgent civic needs.</p>
              </div>
              <div className="md:w-1/2 relative group">
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20 hidden md:flex border-4 border-white shadow-sm">2</div>
                <div className="bg-cyan-50 rounded-2xl p-4 shadow-sm border border-blue-100 overflow-hidden relative h-64 w-full cursor-pointer">
                   <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Authority workers illustration" className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Step 3 (Formerly Step 4) */}
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="md:w-1/2 text-left md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-500 mb-4 md:ml-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Resolved & Tracked</h3>
                <p className="text-gray-600">Issues are marked as resolved with before-and-after documentation, ensuring transparency and community satisfaction.</p>
              </div>
              <div className="md:w-1/2 relative group">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20 hidden md:flex border-4 border-white shadow-sm">3</div>
                <div className="bg-cyan-50 rounded-2xl p-4 shadow-sm border border-blue-100 overflow-hidden relative h-64 w-full cursor-pointer">
                   <img src="/road-repair.png" alt="Worker fixing pothole" className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Recent Issues Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Recent Issues</h2>
          <p className="text-gray-500 mb-10">Stay updated with the latest CivicLenss reported by communities across India</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {/* Issue Card 1 */}
            <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">jkxg</h3>
                <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded border border-red-100">pending</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                <span>📍</span> MIDC, Maharashtra Industrial Development Corporation...
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">cvxnfn</p>
              <div className="flex justify-end items-center text-xs text-gray-400">
                <span>4 weeks ago</span>
              </div>
            </div>

            {/* Issue Card 2 */}
            <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">pothole in front of my house</h3>
                <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded border border-red-100">pending</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                <span>📍</span> Madhupura, Asarva Taluka, Ahmedabad, Gujarat...
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">there is a very big almost size of a truck tyre pothole in front of my house</p>
              <div className="flex justify-end items-center text-xs text-gray-400">
                <span>5 weeks ago</span>
              </div>
            </div>

            {/* Issue Card 3 */}
            <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">bad road conditions</h3>
                <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded border border-red-100">pending</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                <span>📍</span> Nathdwara, Nathdwara Tehsil, Rajsamand, Rajasthan...
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">bad road conditions in nathdwara</p>
              <div className="flex justify-end items-center text-xs text-gray-400">
                <span>7 weeks ago</span>
              </div>
            </div>

            {/* Issue Card 4 */}
            <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">Accidents</h3>
                <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded border border-red-100">pending</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                <span>📍</span> Green View Colony, Karaswada, Bardez, North Goa...
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">Pothole in roads</p>
              <div className="flex justify-end items-center text-xs text-gray-400">
                <span>8 weeks ago</span>
              </div>
            </div>

            {/* Issue Card 5 */}
            <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">No Street Light Issue</h3>
                <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded border border-red-100">pending</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                <span>📍</span> Ghatlodiya Taluka, Ahmedabad, Gujarat...
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">No Street Light Issue</p>
              <div className="flex justify-end items-center text-xs text-gray-400">
                <span>13 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-cyan-50 border-y border-blue-100 mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">Making Real Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-100 flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">{dynamicStats.reported}</div>
              <div className="text-xs text-gray-500 font-medium">Issues Reported</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-100 flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">{dynamicStats.resolved}</div>
              <div className="text-xs text-gray-500 font-medium">Issues Resolved</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-100 flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">{dynamicStats.rate}</div>
              <div className="text-xs text-gray-500 font-medium">Resolution Rate (%)</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-100 flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">{dynamicStats.time}</div>
              <div className="text-xs text-gray-500 font-medium">Avg Response Time (days)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpeg" alt="CivicLens" className="h-10 object-contain" onError={(e) => e.target.style.display='none'} />
              <span className="font-bold text-xl text-gray-800">CivicLens</span>
            </div>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Empowering Indian communities to create positive change through transparent CivicLens reporting and collaborative problem-solving.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">in</div>
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">tw</div>
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">em</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-xs text-gray-600">
              <li><Link to="/" className="hover:text-cyan-500">Home</Link></li>
              <li><a href="#how-it-works" className="hover:text-cyan-500">How It Works</a></li>
              <li><Link to="/dashboard" className="hover:text-cyan-500">View Map</Link></li>
              <li><a href="#about" className="hover:text-cyan-500">About</a></li>
              <li><a href="#faqs" className="hover:text-cyan-500">FAQ</a></li>
              <li><a href="http://t.me/CivicLensreportingbot" className="hover:text-cyan-500">Telegram Bot</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-3 text-xs text-gray-600">
              <li><a href="#" className="hover:text-cyan-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-500">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-cyan-500">Community Guidelines</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

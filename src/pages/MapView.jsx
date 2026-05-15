import { useState, useMemo } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/maplibre';
import { Filter, X, Search, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data for the map
const ISSUES_DATA = [
  { id: 1, lat: 12.9716, lng: 77.5946, category: 'pothole', status: 'pending', title: 'Large Pothole on MG Road' },
  { id: 2, lat: 12.9352, lng: 77.6245, category: 'garbage', status: 'resolved', title: 'Garbage dump near Koramangala' },
  { id: 3, lat: 12.9250, lng: 77.5938, category: 'manhole', status: 'in_progress', title: 'Open manhole in Jayanagar' },
  { id: 4, lat: 12.9856, lng: 77.5600, category: 'pothole', status: 'pending', title: 'Bad road condition in Rajajinagar' },
  { id: 5, lat: 12.9569, lng: 77.7011, category: 'garbage', status: 'pending', title: 'Illegal dumping in Whitefield' },
  { id: 6, lat: 13.0068, lng: 77.5816, category: 'manhole', status: 'resolved', title: 'Fixed manhole in Malleshwaram' },
  { id: 7, lat: 12.9141, lng: 77.6361, category: 'garbage', status: 'pending', title: 'Garbage piled up in HSR Layout' },
  { id: 8, lat: 12.9784, lng: 77.6408, category: 'pothole', status: 'in_progress', title: 'Pothole repair in Indiranagar' },
  // Adding more data to make the heatmap look better
  { id: 9, lat: 12.9720, lng: 77.5950, category: 'pothole', status: 'pending', title: 'Pothole nearby' },
  { id: 10, lat: 12.9710, lng: 77.5940, category: 'pothole', status: 'pending', title: 'Pothole cluster' },
  { id: 11, lat: 12.9350, lng: 77.6250, category: 'garbage', status: 'pending', title: 'More garbage' },
  { id: 12, lat: 12.9360, lng: 77.6240, category: 'garbage', status: 'pending', title: 'Garbage overflow' },
];

function MapView() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [popupInfo, setPopupInfo] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Filter issues based on selections
  const filteredIssues = useMemo(() => {
    return ISSUES_DATA.filter(issue => {
      const categoryMatch = categoryFilter === 'all' || issue.category === categoryFilter;
      const statusMatch = statusFilter === 'all' || issue.status === statusFilter;
      return categoryMatch && statusMatch;
    });
  }, [categoryFilter, statusFilter]);

  // Convert filtered issues to GeoJSON for the heatmap
  const geojson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: filteredIssues.map(issue => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [issue.lng, issue.lat] },
        properties: { id: issue.id, weight: 1 }
      }))
    };
  }, [filteredIssues]);

  // Heatmap Layer Styling
  const heatmapLayer = {
    id: 'heatmap',
    type: 'heatmap',
    paint: {
      'heatmap-weight': ['interpolate', ['linear'], ['get', 'weight'], 0, 0, 1, 1],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(33,102,172,0)',
        0.2, 'rgb(103,169,207)',
        0.4, 'rgb(209,229,240)',
        0.6, 'rgb(253,219,199)',
        0.8, 'rgb(239,138,98)',
        1, 'rgb(178,24,43)'
      ],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 30],
      'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 18, 0] // Fade out when zoomed in
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const visible = filteredIssues.length;
    const pending = filteredIssues.filter(i => i.status === 'pending').length;
    const resolved = filteredIssues.filter(i => i.status === 'resolved').length;
    return { visible, pending, resolved };
  }, [filteredIssues]);

  const getMarkerColor = (status) => {
    switch(status) {
      case 'pending': return '#fbbf24'; // Yellow
      case 'in_progress': return '#3b82f6'; // Blue
      case 'resolved': return '#10b981'; // Green
      default: return '#9ca3af'; // Gray
    }
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Map */}
      <Map
        initialViewState={{
          longitude: 77.5946,
          latitude: 12.9716,
          zoom: 11
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
      >
        {showHeatmap && (
          <Source type="geojson" data={geojson}>
            <Layer {...heatmapLayer} />
          </Source>
        )}

        {/* Only show markers if not purely showing heatmap, or maybe show both. We will show markers if zoomed in, but for now we'll just show markers if showHeatmap is false or both */}
        {!showHeatmap && filteredIssues.map(issue => (
          <Marker 
            key={issue.id} 
            longitude={issue.lng} 
            latitude={issue.lat}
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(issue);
            }}
          >
            <div 
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: getMarkerColor(issue.status),
                border: '2px solid white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-3 max-w-[200px]">
              <h3 className="font-bold text-slate-800 mb-1 leading-tight">{popupInfo.title}</h3>
              <p className="text-xs text-slate-500 mb-2 capitalize">Category: {popupInfo.category}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getMarkerColor(popupInfo.status) }}></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{popupInfo.status.replace('_', ' ')}</span>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Filter Panel (Left) */}
      <div className="absolute top-6 left-6 w-72 bg-white rounded-xl shadow-lg border border-slate-200 z-10 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Filter size={18} /> Filter Issues
          </div>
          <button 
            onClick={() => { setCategoryFilter('all'); setStatusFilter('all'); }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Category</label>
            <select 
              value={categoryFilter} 
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg outline-none focus:border-blue-500 transition text-sm"
            >
              <option value="all">All Categories</option>
              <option value="garbage">Garbage</option>
              <option value="pothole">Pothole</option>
              <option value="manhole">Manhole</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Status</label>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg outline-none focus:border-blue-500 transition text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button 
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition ${
                showHeatmap 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Layers size={16} /> {showHeatmap ? 'Show Markers' : 'Show Heatmap'}
            </button>
          </div>
          
          <Link to="/dashboard" className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition mt-2 shadow-sm">
            <span className="text-lg leading-none">+</span> Report New Issue
          </Link>
        </div>
      </div>

      {/* Floating Search (Top Center) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-96 bg-white rounded-xl shadow-lg border border-slate-200 z-10 flex items-center px-4 py-3">
        <Search size={18} className="text-slate-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search for city, area, or issue..." 
          className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Floating Stats (Top Right) */}
      <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg border border-slate-200 z-10 p-4 flex gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 leading-none mb-1">{stats.visible}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visible</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-500 leading-none mb-1">{stats.pending}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 leading-none mb-1">{stats.resolved}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resolved</div>
        </div>
      </div>

      {/* Floating Legend (Bottom Right) */}
      <div className="absolute bottom-8 right-6 bg-white rounded-xl shadow-lg border border-slate-200 z-10 p-4 w-48">
        <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-1">
           <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
           Status Legend
        </h4>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></span>
            <span className="text-xs text-slate-600 font-medium">Pending</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span>
            <span className="text-xs text-slate-600 font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="text-xs text-slate-600 font-medium">Resolved</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-gray-400 shadow-sm"></span>
            <span className="text-xs text-slate-600 font-medium">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;

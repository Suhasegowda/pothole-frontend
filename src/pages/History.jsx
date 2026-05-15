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
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Reports</h1>
        <p className="text-slate-500">Track the progress of the issues you have reported in your city.</p>
      </div>

      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex gap-6 flex-1">
              <img 
                src={report.originalImage} 
                alt="Reported" 
                className="w-32 h-32 object-cover rounded-xl shadow-sm"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-800 m-0">{report.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    report.status === 'resolved' ? 'bg-cyan-100 text-cyan-500' : 'bg-red-50 text-red-600'
                  }`}>
                    {report.status === 'resolved' ? 'Resolved' : 'Pending'}
                  </span>
                </div>
                <div className="text-slate-500 text-sm flex items-center gap-2 mb-1">
                  <MapPin size={16} /> {report.location}
                </div>
                <div className="text-slate-500 text-sm flex items-center gap-2 mb-3">
                  <Clock size={16} /> Reported on {report.date}
                </div>
                <div className="font-bold text-cyan-500 text-sm bg-cyan-50 px-3 py-1.5 rounded-lg inline-block w-max">
                  +{report.points} Points Earned
                </div>
              </div>
            </div>

            {report.status === 'resolved' && report.resolvedImage && (
              <div className="flex gap-4 items-center bg-cyan-50 p-4 rounded-xl border border-blue-100 mt-4 md:mt-0">
                <div className="text-center">
                  <CheckCircle size={24} className="text-cyan-500 mx-auto mb-2" />
                  <div className="text-[10px] text-cyan-500 font-bold tracking-wider">FIXED</div>
                </div>
                <img 
                  src={report.resolvedImage} 
                  alt="Resolved" 
                  className="w-24 h-24 object-cover rounded-lg border-2 border-blue-400 shadow-sm" 
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

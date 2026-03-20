import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ManageReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#21362e]">Manage Reviews</h1>
        <p className="text-[#21362e]/60 mt-1">Approve, reject, or delete user testimonials.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-10"><Loader2 className="w-8 h-8 text-[#b8ea27] animate-spin mx-auto" /></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map(review => (
              <div key={review._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#21362e]">{review.name}</h3>
                    <p className="text-sm text-gray-500">
                      {review.role} {review.company ? `at ${review.company}` : ''}
                    </p>
                    <div className="flex text-yellow-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {review.status === 'pending' && (
                       <>
                         <button onClick={() => handleUpdateStatus(review._id, 'approved')} className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors">
                           <CheckCircle className="w-4 h-4" /> Approve
                         </button>
                         <button onClick={() => handleUpdateStatus(review._id, 'rejected')} className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-600 hover:text-white transition-colors">
                           <XCircle className="w-4 h-4" /> Reject
                         </button>
                       </>
                    )}
                    {review.status === 'approved' && (
                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Approved</span>
                    )}
                    {review.status === 'rejected' && (
                       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Rejected</span>
                    )}
                    <button onClick={() => handleDelete(review._id)} className="ml-2 bg-red-50 text-red-500 p-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-700 text-sm whitespace-pre-wrap italic">
                  "{review.comment}"
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="p-10 text-center text-gray-500">No reviews found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Mail, Calendar, Trash2, Loader2, Phone } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ContactMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#21362e]">Contact Messages</h1>
        <p className="text-[#21362e]/60 mt-1">Review inquiries received from the website contact form.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-10"><Loader2 className="w-8 h-8 text-[#b8ea27] animate-spin mx-auto" /></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map(msg => (
              <div key={msg._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#21362e]">{msg.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {msg.phone}</span>}
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {msg.services && msg.services.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {msg.services.map((srv: string) => (
                      <span key={srv} className="bg-[#b8ea27]/20 text-[#21362e] text-xs font-semibold px-2.5 py-1 rounded-md">
                        {srv}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-700 text-sm whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="p-10 text-center text-gray-500">No contact messages received yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

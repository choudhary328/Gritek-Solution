import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Code2');
  const [accent, setAccent] = useState('#b8ea27');
  const [pricing, setPricing] = useState('Custom Quote');
  const [features, setFeatures] = useState('');
  const [process, setProcess] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEdit = (service: any) => {
    setEditingId(service._id);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setAccent(service.accent);
    setPricing(service.pricing);
    setFeatures(service.features.join(', '));
    setProcess(service.process.join(', '));
    setTechnologies(service.technologies.join(', '));
    setPreviewUrl(`http://localhost:5000${service.image}`);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle(''); setDescription(''); setIcon('Code2'); setAccent('#b8ea27'); setPricing(''); setFeatures(''); setProcess(''); setTechnologies(''); setPreviewUrl(''); setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Parse comma-separated inputs
    const featureArray = features.split(',').map(s => s.trim()).filter(Boolean);
    const processArray = process.split(',').map(s => s.trim()).filter(Boolean);
    const techArray = technologies.split(',').map(s => s.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('icon', icon);
    formData.append('accent', accent);
    formData.append('pricing', pricing);
    formData.append('features', JSON.stringify(featureArray));
    formData.append('process', JSON.stringify(processArray));
    formData.append('technologies', JSON.stringify(techArray));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const isEditing = !!editingId;
      const url = isEditing ? `${API_BASE_URL}/services/${editingId}` : `${API_BASE_URL}/services`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        handleCancelEdit();
        fetchServices();
      } else {
        alert('Failed to save service');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
      if (res.ok) fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#21362e]">Manage Services</h1>
        <p className="text-[#21362e]/60 mt-1">Add new offerings and manage existing services.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#21362e] mb-4">
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
               <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Lucide Icon Name</label>
               <input required type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="e.g. Code2, Smartphone" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color Hex</label>
               <input required type="text" value={accent} onChange={e => setAccent(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <input required type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
               <input required type="text" value={pricing} onChange={e => setPricing(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (Comma Separated)</label>
            <input required type="text" value={features} onChange={e => setFeatures(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="SEO, Custom UI, etc." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Process (Comma Separated)</label>
            <input required type="text" value={process} onChange={e => setProcess(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="Discovery, Design, Dev" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (Comma Separated)</label>
            <input required type="text" value={technologies} onChange={e => setTechnologies(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="React, Node.js" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Cover Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center bg-gray-50 border border-gray-300 border-dashed rounded-lg p-4 hover:bg-gray-100 transition w-full md:w-1/2">
                <ImageIcon className="w-6 h-6 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
                <input required={!editingId} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {previewUrl && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button disabled={isSubmitting} type="submit" className="flex items-center justify-center gap-2 bg-[#b8ea27] text-[#21362e] px-6 py-2 rounded-lg font-bold hover:bg-[#a6d420] transition-colors disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
              {editingId ? 'Update Service' : 'Add Service'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#21362e] mb-4">Existing Services ({services.length})</h2>
        {isLoading ? (
          <div className="text-center py-10"><Loader2 className="w-8 h-8 text-[#b8ea27] animate-spin mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
              <div key={service._id} className="border border-gray-100 rounded-xl overflow-hidden flex items-center p-4 gap-4 relative group">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <ImageWithFallback src={`http://localhost:5000${service.image}`} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div>
                   <h3 className="font-bold text-[#21362e]">{service.title}</h3>
                   <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                   <p className="text-xs font-medium mt-1 uppercase" style={{ color: service.accent }}>{service.pricing}</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleEdit(service)} className="bg-blue-50 text-blue-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(service._id)} className="bg-red-50 text-red-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && <p className="text-gray-500">No services found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

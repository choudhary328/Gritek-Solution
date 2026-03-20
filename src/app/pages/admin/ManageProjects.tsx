import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [techInput, setTechInput] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
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

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setTitle(project.title);
    setCategory(project.category);
    setTechInput(project.technologies.join(', '));
    setDemoLink(project.demoLink || '');
    setPreviewUrl(`http://localhost:5000${project.image}`);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setTechInput('');
    setDemoLink('');
    setPreviewUrl('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Parse technologies separated by commas
    const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('technologies', JSON.stringify(technologies));
    if (demoLink) formData.append('demoLink', demoLink);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const isEditing = !!editingId;
      const url = isEditing ? `${API_BASE_URL}/projects/${editingId}` : `${API_BASE_URL}/projects`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        handleCancelEdit();
        fetchProjects();
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#21362e]">Manage Projects</h1>
        <p className="text-[#21362e]/60 mt-1">Add new portfolio projects and manage existing ones.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#21362e] mb-4">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="E-Commerce App" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="E-Commerce, Websites, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (Comma Separated)</label>
              <input required type="text" value={techInput} onChange={e => setTechInput(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="React, Node.js, MongoDB" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link (Optional)</label>
              <input type="url" value={demoLink} onChange={e => setDemoLink(e.target.value)} className="w-full rounded-lg border-gray-300 border p-2 focus:ring-[#b8ea27] focus:border-[#b8ea27]" placeholder="https://example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center bg-gray-50 border border-gray-300 border-dashed rounded-lg p-4 hover:bg-gray-100 transition duration-300 w-full md:w-1/2">
                <ImageIcon className="w-6 h-6 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
                <input type="file" required={!editingId} accept="image/*" onChange={handleImageChange} className="hidden" />
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
              {editingId ? 'Update Project' : 'Add Project'}
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
        <h2 className="text-lg font-semibold text-[#21362e] mb-4">Existing Projects ({projects.length})</h2>
        {isLoading ? (
          <div className="text-center py-10"><Loader2 className="w-8 h-8 text-[#b8ea27] animate-spin mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project._id} className="border border-gray-100 rounded-xl overflow-hidden flex flex-col group">
                <div className="h-40 bg-gray-100 relative">
                  <ImageWithFallback src={`http://localhost:5000${project.image}`} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => handleEdit(project)} className="bg-blue-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#21362e]">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies?.map((tech: string) => (
                        <span key={tech} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-semibold hover:underline mt-auto">
                        View Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500 col-span-full">No projects found. Add some above.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin imports
import { AdminLayout } from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageServices from './pages/admin/ManageServices';
import ContactMessages from './pages/admin/ContactMessages';
import ManageReviews from './pages/admin/ManageReviews';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'portfolio', Component: Portfolio },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'projects', Component: ManageProjects },
      { path: 'services', Component: ManageServices },
      { path: 'reviews', Component: ManageReviews },
      { path: 'messages', Component: ContactMessages },
    ],
  },
]);

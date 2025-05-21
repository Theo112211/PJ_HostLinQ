
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set default meta tags for SEO
document.title = "HostLinQ | Find Perfect Hostels Worldwide";
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'HostLinQ helps you discover and book affordable hostels in top destinations worldwide. Compare prices, amenities, and read reviews to find your perfect accommodation.';
document.head.appendChild(metaDescription);

// Add canonical URL
const canonicalLink = document.createElement('link');
canonicalLink.rel = 'canonical';
canonicalLink.href = window.location.origin + window.location.pathname;
document.head.appendChild(canonicalLink);

createRoot(document.getElementById("root")!).render(<App />);

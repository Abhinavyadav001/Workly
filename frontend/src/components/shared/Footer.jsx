import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-gray-900 py-10 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Portal</h2>
            <p className="text-sm mt-1">&copy; 2025 Your Company. All rights reserved.</p>
          </div>

          {/* Links (you can add more if needed) */}
          <div>
            <ul className="flex flex-col md:items-center gap-2 md:gap-1">
              <li><a href="#" className="hover:underline hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:underline hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-indigo-600">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592..."/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0..."/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85..."/></svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

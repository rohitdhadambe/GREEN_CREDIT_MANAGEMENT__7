import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 border-t-4 border-green-500 w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">GREEN CREDIT MANAGEMENT</h3>
          <p className="text-sm">Helping you make a positive impact on the environment.</p>
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
          <Link to="/" className="hover:text-green-400 text-sm">Home</Link>
          <Link to="/register" className="hover:text-green-400 text-sm">Register</Link>
          <Link to="/login" className="hover:text-green-400 text-sm">Login</Link>
          <Link to="/" className="hover:text-green-400 text-sm">About Us</Link>
        </div>
        <div className="flex-1 text-center md:text-right">
          <p className="text-xs mb-2">&copy; {new Date().getFullYear()} GREEN CREDIT MANAGEMENT. All rights reserved.</p>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.326C.594 0 0 .593 0 1.325v21.351C0 23.406.594 24 1.326 24h11.495v-9.294H9.688v-3.622h3.134V8.412c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.098 2.797.142v3.24l-1.918.001c-1.503 0-1.794.714-1.794 1.762v2.309h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.326-.594 1.326-1.324V1.325C24 .593 23.407 0 22.676 0z"/>
              </svg>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.927 2.204-4.927 4.927 0 .386.045.762.127 1.124-4.094-.205-7.725-2.165-10.148-5.144-.424.729-.667 1.574-.667 2.476 0 1.71.869 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.388 1.693 4.382 3.946 4.835-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.631 1.953 2.448 3.374 4.604 3.415-1.685 1.319-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.175-.069 2.179 1.394 4.768 2.208 7.557 2.208 9.054 0 14.002-7.496 14.002-13.986 0-.21-.005-.423-.014-.633.962-.693 1.797-1.56 2.457-2.548l-.047-.02z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.241 1.317 3.607.058 1.267.07 1.647.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.241 1.255-3.607 1.317-1.267.058-1.647.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.241-1.317-3.607-.058-1.267-.07-1.647-.07-4.851s.012-3.584.07-4.85c.062-1.366.342-2.633 1.317-3.608.975-.975 2.241-1.255 3.607-1.317 1.267-.058 1.647-.07 4.85-.07zm0-2.163c-3.259 0-3.67.012-4.947.07-1.523.07-2.884.343-3.96 1.419-1.075 1.076-1.348 2.438-1.418 3.96-.058 1.277-.07 1.688-.07 4.947s.012 3.67.07 4.947c.07 1.523.343 2.884 1.418 3.96 1.076 1.075 2.438 1.348 3.96 1.418 1.277.058 1.688.07 4.947.07s3.67-.012 4.947-.07c1.523-.07 2.884-.343 3.96-1.418 1.075-1.076 1.348-2.438 1.418-3.96.058-1.277.07-1.688.07-4.947s-.012-3.67-.07-4.947c-.07-1.523-.343-2.884-1.418-3.96-1.076-1.075-2.438-1.348-3.96-1.418-1.277-.058-1.688-.07-4.947-.07zm0 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.163a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-10.845a1.44 1.44 0 1 0 0-2.882 1.44 1.44 0 0 0 0 2.882z"/>
              </svg>
            </a>
            <a href="mailto:contact@example.com" className="hover:text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 13.293l-11.946-8.15v13.434l11.946 8.15 11.946-8.15V5.144L12 13.293zm0-2.623l-7.857-5.43 7.857-5.43 7.857 5.43-7.857 5.43zM3.03 4.12l6.97 4.77 1.073.747 1.072-.747 6.97-4.77v-.015l-8.06-5.557-8.06 5.557v.015zm11.946 6.045l-1.072.747-1.073-.747-7.857-5.43v11.932l7.857 5.43 1.073-.747 1.072.747 7.857-5.43V10.58l-1.072-.747z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect } from 'react';
import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './components';
import './App.scss';

function App() {
   useEffect(() => {
      // Store the original title
      const originalTitle = document.title;

      // Function to update the title when the page becomes hidden
      const handleVisibilityChange = () => {
         if (document.hidden) {
            document.title = 'Return Back...';
         } else {
            // Reset the title to the original title
            document.title = originalTitle;
         }
      };

      // Add event listener for visibility change
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Clean up the event listener when the component unmounts
      return () => {
         document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
         );
      };
   }, []);

   return (
      <div className="app">
         <Navbar />
         <Header />
         <About />
         <Work />
         <Skills />
         <Testimonial />
         <Footer />
      </div>
   );
}

export default App;

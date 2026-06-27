import { useState, useEffect } from 'react';
import Wizard from './components/Wizard/Wizard';
import Portfolio from './components/Portfolio/Portfolio';
import { initialContent } from './content';

function App() {
  const [content, setContent] = useState(initialContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if we have saved content
    const saved = localStorage.getItem('portfolioContent');
    if (saved) {
      setContent(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const handlePublish = (finalContent) => {
    const publishedContent = { ...finalContent, isPublished: true };
    setContent(publishedContent);
    localStorage.setItem('portfolioContent', JSON.stringify(publishedContent));
  };

  const handleEdit = () => {
    const editContent = { ...content, isPublished: false };
    setContent(editContent);
    localStorage.setItem('portfolioContent', JSON.stringify(editContent));
  };

  if (!isLoaded) return <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-theme-purple selection:text-white">
      {content.isPublished ? (
        <Portfolio content={content} onEdit={handleEdit} />
      ) : (
        <Wizard initialData={content} onPublish={handlePublish} />
      )}
    </div>
  );
}

export default App;

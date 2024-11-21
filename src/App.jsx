import { useState, useEffect } from 'react'
import { QuoteDisplay } from './components/quoteDisplay'
import { FavoriteQuotes } from './components/favouriteQuote'
import { quoteService } from './service/service'

export default function App() {
  const [favorites, setFavorites] = useState([])
  const [duplicateError, setDuplicateError] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const savedFavorites = await quoteService.getFavoriteQuotes();
        setFavorites(savedFavorites);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      }
    };
    fetchFavorites();
  }, []);

   const addToFavorites = async (quote) => {
    try {
      const isDuplicate = favorites.some(
        (favQuote) => 
          favQuote.text === (quote.text || quote.content) && 
          favQuote.author === quote.author
      );

      if (isDuplicate) {
        setDuplicateError(true);
        setTimeout(() => setDuplicateError(false), 3000);
        return;
      }

      const savedQuote = await quoteService.saveFavoriteQuote({
        text: quote.text || quote.content,
        author: quote.author
      });
      
      setFavorites((prevFavorites) => [...prevFavorites, savedQuote]);
    } catch (error) {
      console.error('Failed to add to favorites', error);
    }
  }

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Random Quote Generator</h1>
        <QuoteDisplay addToFavorites={addToFavorites}
           duplicateError={duplicateError}
        />
        <FavoriteQuotes favorites={favorites} />
      </div>
    </div>
  )
}
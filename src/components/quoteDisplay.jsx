import { useState, useEffect } from 'react'
import { quoteService } from '../service/service'

export function QuoteDisplay({ addToFavorites }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const data = await quoteService.getRandomQuote();
      setQuote(data)
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  const handleSave = () => {
    if (quote) {
      addToFavorites(quote)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg mb-8">
      <div className="p-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : quote ? (
          <div>
            <p className="text-xl font-semibold mb-4">{quote.text}</p>
            <p className="text-right text-gray-600">- {quote.author}</p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={fetchQuote}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
              >
                New Quote
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors"
              >
                Save to Favorites
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No quote available</p>
        )}
      </div>
    </div>
  )
}

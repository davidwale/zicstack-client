
export function FavoriteQuotes({ favorites }) {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Favorite Quotes</h2>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-600">No favorite quotes yet</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((quote) => (
              <li key={quote.id} className="border-b pb-4 last:border-b-0">
                <p className="text-lg font-medium mb-2">{quote.text}</p>
                <p className="text-right text-gray-600">- {quote.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_PATH;


export const quoteService = {
  async getRandomQuote() {
        try {
      const response = await axios.get(`${BASE_URL}/quote`);
      return response.data;
    } catch (error) {
      console.error('Error fetching random quote:', error);
      throw error;
    }
  },

  async saveFavoriteQuote(quote) {
    try {
      const response = await axios.post(`${BASE_URL}/quote`, {
        text: quote.text,
        author: quote.author
      });
      return response.data;
    } catch (error) {
      console.error('Error saving favorite quote:', error);
      throw error;
    }
  },

  async getFavoriteQuotes() {
    try {
      const response = await axios.get(`${BASE_URL}/favourites`);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite quotes:', error);
      throw error;
    }
  }
};

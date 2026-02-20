import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/feedback');
      setFeedback(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load feedback. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const addFeedback = async (data) => {
    try {
      await axios.post('/api/feedback', data);
      await fetchFeedback();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.msg || 
                      err.response?.data?.error || 
                      "Submission failed";
      return { success: false, message };
    }
  };

  const upvoteFeedback = async (id) => {
    try {
      // Optimistic update
      setFeedback(prev => prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f));
      await axios.post(`/api/feedback/${id}/upvote`);
    } catch (err) {
      // Revert on failure
      fetchFeedback();
    }
  };

  return { 
    feedback, 
    loading, 
    error, 
    addFeedback, 
    upvoteFeedback, 
    refresh: fetchFeedback 
  };
};

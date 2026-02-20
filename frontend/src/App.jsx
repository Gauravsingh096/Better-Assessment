import React, { useState } from 'react';
import { Plus, Activity, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFeedback } from './hooks/useFeedback';
import FeedbackCard from './components/FeedbackCard';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const { feedback, loading, error, addFeedback, upvoteFeedback, refresh } = useFeedback();
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = async (data) => {
    const result = await addFeedback(data);
    if (result.success) {
      setShowForm(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Activity className="pulse-icon" size={32} color="var(--accent-color)" />
            <h1>Pulse</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Better Software: Team Feedback Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={refresh} title="Refresh list">
            <RefreshCw size={18} />
          </button>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> New Request
            </button>
          )}
        </div>
      </header>

      <main>
        <AnimatePresence>
          {showForm && (
            <FeedbackForm 
              onSubmit={handleFormSubmit} 
              onCancel={() => setShowForm(false)} 
            />
          )}
        </AnimatePresence>

        {error && (
          <div className="card" style={{ color: '#ff7b72', borderColor: '#ff7b72', textAlign: 'center' }}>
            <p>{error}</p>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={refresh}>Try Again</button>
          </div>
        )}

        <div className="feedback-list">
          {loading && !feedback.length ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: 'inline-block' }}
              >
                <RefreshCw size={32} color="var(--text-secondary)" />
              </motion.div>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Syncing with database...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {feedback.map(item => (
                <FeedbackCard 
                  key={item.id} 
                  item={item} 
                  onUpvote={upvoteFeedback} 
                />
              ))}
            </AnimatePresence>
          )}
          
          {!loading && !feedback.length && !error && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              <p>No requests yet. Be the first to suggest a feature!</p>
            </div>
          )}
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
        <p>&copy; 2026 Pulse Engineering. Built for Faster 0&rarr;1 Development.</p>
      </footer>
    </div>
  );
}

export default App;

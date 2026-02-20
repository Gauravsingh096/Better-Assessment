import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeedbackForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description });
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card"
      style={{ marginBottom: '2rem' }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Feature Title</label>
          <input 
            placeholder="e.g. Dark Mode for Analytics" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
            autoFocus
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
          <textarea 
            placeholder="Explain why this is needed..." 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            rows="4"
            disabled={isSubmitting}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;

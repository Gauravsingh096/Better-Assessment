import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from './Badge';

const FeedbackCard = ({ item, onUpvote }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
      style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <button 
          className="btn btn-outline" 
          onClick={() => onUpvote(item.id)}
          style={{ padding: '0.5rem', minWidth: '50px' }}
        >
          <ThumbsUp size={18} color={item.upvotes > 0 ? 'var(--accent-color)' : 'currentColor'} />
          <div style={{ fontWeight: 'bold' }}>{item.upvotes}</div>
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <Badge status={item.status} />
        <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;

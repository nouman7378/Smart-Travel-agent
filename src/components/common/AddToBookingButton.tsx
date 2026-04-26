import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface AddToBookingButtonProps {
  onAdd?: () => void | boolean | Promise<void | boolean>;
  className?: string;
  disabled?: boolean;
  stopPropagation?: boolean;
  idleLabel?: string;
  addedLabel?: string;
  redirectTo?: string;
}

const AddToBookingButton: React.FC<AddToBookingButtonProps> = ({
  onAdd,
  className = '',
  disabled = false,
  stopPropagation = true,
  idleLabel = 'Book Now',
  addedLabel = 'Added',
  redirectTo,
}) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<number | null>(null);
  const redirectTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    if (disabled) {
      return;
    }

    try {
      const result = await onAdd?.();
      if (result === false) {
        return;
      }
    } catch (error) {
      console.error('Add to booking failed:', error);
      return;
    }

    setAdded(true);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setAdded(false);
    }, 1700);

    if (redirectTo) {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
      redirectTimerRef.current = window.setTimeout(() => {
        navigate(redirectTo);
      }, 650);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`relative overflow-hidden px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-250 whitespace-nowrap ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : added
          ? 'bg-emerald-600 hover:bg-emerald-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="inline-flex items-center gap-2"
          >
            <motion.svg
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
            {addedLabel}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {idleLabel}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {added && (
          <motion.span
            initial={{ scale: 0.1, opacity: 0.35 }}
            animate={{ scale: 2.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute inset-0 bg-white rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AddToBookingButton;

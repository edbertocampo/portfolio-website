import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiTrash2 } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 12, 27, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: var(--navy);
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  border: 1px solid rgba(148, 180, 193, 0.2);
  box-shadow: 0 20px 50px rgba(2, 12, 27, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: rgba(33, 52, 72, 0.9);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(148, 180, 193, 0.1);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--lightest-slate);
    font-family: var(--font-heading);
  }

  button {
    background: none;
    border: none;
    color: var(--slate);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(148, 180, 193, 0.1);
      color: var(--green);
    }
  }
`;

const FormField = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid rgba(148, 180, 193, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;

  label {
    color: var(--slate);
    font-size: 14px;
    min-width: 50px;
    font-family: var(--font-heading);
  }

  input {
    background: none;
    border: none;
    color: var(--lightest-slate);
    width: 100%;
    font-size: 14px;
    outline: none;

    &::placeholder {
      color: rgba(148, 180, 193, 0.3);
    }
  }
`;

const EmailChip = styled(motion.div)`
  background: rgba(100, 255, 218, 0.1);
  color: var(--green);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.15);
    border-color: rgba(100, 255, 218, 0.3);
  }
`;

const MessageBody = styled.div`
  padding: 20px;
  flex-grow: 1;
  min-height: 250px;

  textarea {
    background: none;
    border: none;
    color: var(--lightest-slate);
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 15px;
    line-height: 1.6;
    outline: none;

    &::placeholder {
      color: rgba(148, 180, 193, 0.3);
    }
  }
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(33, 52, 72, 0.4);

  .actions-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .actions-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SendButton = styled.button`
  background: var(--green);
  color: var(--navy);
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  font-family: var(--font-heading);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--slate);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(148, 180, 193, 0.1);
    color: var(--green);
  }
`;

const EmailModal = ({ isOpen, onClose, defaultTo }) => {
  const [formData, setFormData] = useState({
    from: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [isFromEditing, setIsFromEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const currentTime = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const templateParams = {
      name: formData.from,
      email: formData.from,
      title: formData.subject,
      message: formData.message,
      time: currentTime
    };

    // Send the notification email to you
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Notification sent!', response.status, response.text);

        // Also send the auto-reply email to the sender
        return emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);
      })
      .then((response) => {
        console.log('Auto-reply sent!', response.status, response.text);
        setIsSending(false);
        setIsSent(true);
        setTimeout(() => {
          onClose();
          setTimeout(() => setIsSent(false), 500);
        }, 3000);
      })
      .catch((err) => {
        console.error('EMAILJS ERROR:', err);
        setIsSending(false);
        setError('Failed to send message. Please try again or reach out on LinkedIn.');
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ minHeight: isSent ? '300px' : 'auto', justifyContent: isSent ? 'center' : 'stretch' }}
          >
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ModalHeader>
                    <h3>New Message</h3>
                    <button onClick={onClose}><FiX size={18} /></button>
                  </ModalHeader>

                  <form onSubmit={handleSubmit}>
                    <FormField>
                      <label>From</label>
                      {isFromEditing ? (
                        <input
                          type="email"
                          name="from"
                          placeholder="Your email address"
                          required
                          autoFocus
                          value={formData.from}
                          onChange={handleChange}
                          onBlur={() => formData.from && setIsFromEditing(false)}
                        />
                      ) : (
                        <EmailChip
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          onClick={() => setIsFromEditing(true)}
                        >
                          {formData.from}
                        </EmailChip>
                      )}
                    </FormField>

                    <FormField>
                      <label>To</label>
                      <EmailChip>
                        {defaultTo}
                      </EmailChip>
                    </FormField>

                    <FormField>
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </FormField>

                    <MessageBody>
                      <textarea
                        name="message"
                        placeholder="Write your message here..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                      {error && (
                        <div style={{ marginTop: '10px', color: '#ff4d4d', fontSize: '12px', textAlign: 'center' }}>
                          {error}
                        </div>
                      )}
                    </MessageBody>

                    <ModalFooter>
                      <div className="actions-left">
                        <SendButton type="submit" disabled={isSending}>
                          {isSending ? 'Sending...' : 'Send'} <FiSend size={16} />
                        </SendButton>
                      </div>
                      <div className="actions-right" style={{ position: 'relative' }}>
                        <IconButton type="button" onClick={() => setFormData({ from: '', subject: '', message: '' })}>
                          <FiTrash2 size={18} />
                        </IconButton>
                      </div>
                    </ModalFooter>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(100, 255, 218, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '2px solid var(--green)' }}
                  >
                    <FiSend size={40} color="var(--green)" />
                  </motion.div>
                  <h2 style={{ color: 'var(--lightest-slate)', marginBottom: '10px' }}>Message Sent!</h2>
                  <p style={{ color: 'var(--slate)' }}>Thanks for reaching out. I've received your message and sent a confirmation to your email.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default EmailModal;

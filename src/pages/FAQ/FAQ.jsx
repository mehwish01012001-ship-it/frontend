import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer:
        'Browse our collection, select items, add them to your cart, and proceed to checkout. You will need an account to complete your purchase.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept Easypaisa, JazzCash, bank transfers, cash on delivery (where available), credit and debit cards for your convenience and secure payments.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout.',
    },
    {
      question: 'Can I return my items?',
      answer:
        'Yes, we offer a 30-day return policy for most items. Items must be unworn and in original packaging.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'Once your order ships, you will receive a tracking number via email. You can track it on our Orders page.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Currently, we ship to most countries. Additional shipping fees may apply for international orders.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach us via email at support@rqfashion.com or through the Contact page. We typically respond within 24 hours.',
    },
    {
      question: 'Do you have a loyalty program?',
      answer:
        'We offer exclusive discounts to our newsletter subscribers. Sign up to receive special offers and early access to new collections.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about RQ Fashion</p>
      </div>

      <div className="faq-content">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleExpand(index)}
                >
                  <span>{faq.question}</span>
                  <span className="toggle-icon">{expandedIndex === index ? '−' : '+'}</span>
                </button>
                {expandedIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-contact">
        <div className="container">
          <h2>Still have questions?</h2>
          <p>Contact our support team at support@rqfashion.com or call +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

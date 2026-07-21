import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: January 2024</p>
      </div>

      <div className="policy-content">
        <div className="container">
          <section>
            <h2>1. Introduction</h2>
            <p>
              RQ Fashion ("we", "our", or "us") operates the website. This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use
              our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2>2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes:</p>
            <ul>
              <li>Personal Data: Name, email address, phone number, shipping address</li>
              <li>Payment Information: Credit card details (processed securely)</li>
              <li>Usage Data: Browser type, IP address, pages visited, time spent</li>
              <li>Cookies: To enhance user experience and analytics</li>
            </ul>
          </section>

          <section>
            <h2>3. Use of Data</h2>
            <p>RQ Fashion uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information for improvement</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2>4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of
              transmission over the Internet or method of electronic storage is 100% secure. While
              we strive to use commercially acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "effective date" at the
              top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              support@rqfashion.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>

      <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By accessing or using the services provided by PhotoClinch, you agree to comply with these terms. If you do not agree, do
          not use the services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
        <p className="text-gray-700 mb-4">
          PhotoClinch provides an online marketplace for photographers and clients to connect. We facilitate bookings, payments, and
          offer customer support.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          Users agree to provide accurate information, maintain account security, and respect other users. Violation of terms may
          result in account suspension.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payments and Refunds</h2>
        <p className="text-gray-700 mb-4">
          Payments are processed through secure third-party providers. Refunds are subject to our cancellation policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
        <p className="text-gray-700 mb-4">
          PhotoClinch services are provided "as is" without warranty of any kind. We do not guarantee the availability or
          reliability of services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          To the extent permitted by law, PhotoClinch is not liable for damages arising from the use of our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We may update terms from time to time. Continued use of our services constitutes acceptance of the updated terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
        <p className="text-gray-700">
          For questions about these terms, contact us at support@photoclinch.com.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;


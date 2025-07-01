import React from 'react';
import { Shield, Eye, Lock, Users, Mail, Phone, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-brand-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Eye className="h-6 w-6 mr-2 text-brand-primary" />
            Information We Collect
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Personal Information:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-brand-primary" />
                <strong>Name:</strong> First and last name for account identification and communication
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-brand-primary" />
                <strong>Email Address:</strong> For account access, notifications, and service communications
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-brand-primary" />
                <strong>Phone Number:</strong> For booking confirmations and urgent communications (optional)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="h-6 w-6 mr-2 text-brand-primary" />
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Service Delivery:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Account creation and management</li>
                <li>• Photography booking coordination</li>
                <li>• Communication between clients and photographers</li>
                <li>• Payment processing and invoicing</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Platform Improvement:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Service quality enhancement</li>
                <li>• Customer support</li>
                <li>• Security and fraud prevention</li>
                <li>• Analytics and insights (anonymized)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-brand-primary" />
            Data Protection & Security
          </h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 bg-red-400 rounded-full mt-2 mr-3"></span>
                <span><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 bg-red-400 rounded-full mt-2 mr-3"></span>
                <span><strong>Access Control:</strong> Strict access controls limit who can view your personal information</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 bg-red-400 rounded-full mt-2 mr-3"></span>
                <span><strong>Data Minimization:</strong> We only collect information necessary for service delivery</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 bg-red-400 rounded-full mt-2 mr-3"></span>
                <span><strong>Regular Audits:</strong> Our security practices are regularly reviewed and updated</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Access</h3>
              <p className="text-sm text-gray-600">Request a copy of your personal data</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Correction</h3>
              <p className="text-sm text-gray-600">Update or correct your information</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Deletion</h3>
              <p className="text-sm text-gray-600">Request deletion of your account and data</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>We never sell your personal information.</strong> We only share data in these limited circumstances:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>With photographers:</strong> Only necessary booking and contact information</li>
              <li>• <strong>Service providers:</strong> Payment processors and essential service partners</li>
              <li>• <strong>Legal requirements:</strong> When required by law or to protect our users</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              For any privacy-related questions or to exercise your rights, contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@photoclinch.com</p>
              <p><strong>Mail:</strong> Privacy Officer, PhotoClinch, [Your Address]</p>
              <p><strong>Response Time:</strong> We will respond within 30 days</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

// utils/googleSheets.js

/**
 * Google Sheets Integration Utilities
 * These functions send data from your React app to Google Sheets via Google Apps Script
 */

// Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1KYtq-QWKRiUrLvKFU3uwZuDwC4oQIh5IBvm1_e82whKtyCKrxPwAA-8SMdv0uZ2kug/exec';

/**
 * Send data to Google Sheets via Google Apps Script
 * @param {Object} data - The data to send
 * @returns {Promise} Response from the Google Apps Script
 */
export const sendToGoogleSheets = async (data) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Note: With no-cors mode, we can't read the response
    // but the data will still be sent to Google Sheets
    console.log('Data sent to Google Sheets successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    throw error;
  }
};

/**
 * Format photographer application data for Google Sheets
 * @param {Object} formData - Raw form data from the photographer application
 * @returns {Object} Formatted data for Google Sheets
 */
export const formatPhotographerDataForSheets = (formData) => {
  return {
    type: 'photographer',
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    location: formData.location,
    businessName: formData.businessName,
    experience: formData.experience,
    specialties: formData.specialties, // Array
    equipment: formData.equipment,
    portfolioUrl: formData.portfolioUrl,
    instagramHandle: formData.instagramHandle,
    websiteUrl: formData.websiteUrl,
    startingPrice: formData.startingPrice,
    services: formData.services, // Array
    bio: formData.bio,
    travelDistance: formData.travelDistance,
    availability: formData.availability,
    submittedAt: new Date().toISOString()
  };
};

/**
 * Format project request data for Google Sheets
 * @param {Object} formData - Raw form data from the project request
 * @returns {Object} Formatted data for Google Sheets
 */
export const formatProjectDataForSheets = (formData) => {
  return {
    type: 'project',
    projectTitle: formData.projectTitle,
    serviceType: formData.serviceType,
    projectDescription: formData.projectDescription,
    location: formData.location,
    eventDate: formData.eventDate,
    budget: formData.budget,
    urgency: formData.urgency,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    experienceLevel: formData.experienceLevel,
    specificRequirements: formData.specificRequirements,
    portfolioPreferences: formData.portfolioPreferences,
    submittedAt: new Date().toISOString()
  };
};

/**
 * Generic function to format form data - determines type automatically
 * @param {Object} formData - Raw form data
 * @returns {Object} Formatted data for Google Sheets
 */
export const formatFormDataForSheets = (formData) => {
  // Determine if it's a photographer application or project request
  if (formData.firstName && formData.lastName && formData.specialties) {
    return formatPhotographerDataForSheets(formData);
  } else if (formData.projectTitle && formData.serviceType) {
    return formatProjectDataForSheets(formData);
  } else {
    throw new Error('Unable to determine form data type');
  }
};

/**
 * Send photographer application to Google Sheets
 * @param {Object} formData - Photographer application form data
 * @returns {Promise} Response from Google Sheets
 */
export const sendPhotographerApplication = async (formData) => {
  const formattedData = formatPhotographerDataForSheets(formData);
  return await sendToGoogleSheets(formattedData);
};

/**
 * Send project request to Google Sheets
 * @param {Object} formData - Project request form data
 * @returns {Promise} Response from Google Sheets
 */
export const sendProjectRequest = async (formData) => {
  const formattedData = formatProjectDataForSheets(formData);
  return await sendToGoogleSheets(formattedData);
};

/**
 * Test function to verify Google Sheets integration
 * @returns {Promise} Test result
 */
export const testGoogleSheetsIntegration = async () => {
  const testData = {
    type: 'test',
    message: 'Test data from PhotoClinch React app',
    timestamp: new Date().toISOString()
  };

  try {
    await sendToGoogleSheets(testData);
    console.log('Google Sheets integration test successful');
    return { success: true, message: 'Test successful' };
  } catch (error) {
    console.error('Google Sheets integration test failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Utility to validate required fields before sending to Google Sheets
 * @param {Object} data - Data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
      missingFields.push(field);
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields
  };
};

/**
 * Enhanced error handling wrapper for Google Sheets operations
 * @param {Function} operation - The operation to execute
 * @param {string} operationName - Name of the operation for logging
 * @returns {Promise} Result of the operation
 */
export const withErrorHandling = async (operation, operationName = 'Google Sheets Operation') => {
  try {
    const result = await operation();
    console.log(`${operationName} completed successfully`);
    return result;
  } catch (error) {
    console.error(`${operationName} failed:`, error);
    
    // You can add specific error handling here
    if (error.message.includes('network')) {
      throw new Error('Network error: Please check your internet connection and try again.');
    } else if (error.message.includes('quota')) {
      throw new Error('Service quota exceeded. Please try again later.');
    } else {
      throw new Error(`${operationName} failed: ${error.message}`);
    }
  }
};
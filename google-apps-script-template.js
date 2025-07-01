interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  serviceType: string;
  projectTitle: string;
  projectDescription: string;
  budget: string;
  urgency: string;
  eventDate?: string;
}

export const sendToGoogleSheets = async (data: FormData) => {
  try {
    const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return { success: false, error: error.message };
  }
};

export const formatFormDataForSheets = (formData: any) => {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    location: formData.location,
    serviceType: formData.serviceType,
    projectTitle: formData.projectTitle,
    projectDescription: formData.projectDescription,
    budget: formData.budget,
    urgency: formData.urgency,
    eventDate: formData.eventDate || ''
  };
};
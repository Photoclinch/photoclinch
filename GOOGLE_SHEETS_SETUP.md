# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your PhotoClinch application, so that all user form submissions are automatically saved to a Google Sheets spreadsheet.

## Prerequisites

- A Google account
- Access to Google Drive and Google Sheets
- Your PhotoClinch project running locally or deployed

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create" or "+" to create a new spreadsheet
3. Name your spreadsheet (e.g., "PhotoClinch User Submissions")
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
   The ID is the long string between `/d/` and `/edit`

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script-template.js`
5. Update the `SPREADSHEET_ID` variable with your actual spreadsheet ID:
   ```javascript
   const SPREADSHEET_ID = 'your_actual_spreadsheet_id_here';
   ```
6. Save the project (Ctrl+S) and give it a name like "PhotoClinch Sheets Integration"

## Step 3: Deploy the Script as a Web App

1. In Google Apps Script, click "Deploy" > "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Configure the deployment:
   - **Description**: PhotoClinch Form Integration
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" if you see a warning
   - Click "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

## Step 4: Configure Your PhotoClinch Application

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Google Apps Script URL:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Save the file

## Step 5: Test the Integration

1. Start your PhotoClinch application:
   ```bash
   npm run dev
   ```
2. Navigate to the "Post Project" page
3. Fill out and submit a test form
4. Check your Google Spreadsheet - you should see a new row with the form data

## Step 6: Test the Google Apps Script (Optional)

You can test the Google Apps Script directly:

1. In Google Apps Script, click on the `testAddRow` function
2. Click the "Run" button
3. Check your Google Spreadsheet for a test entry

## Data Structure

The Google Sheet will contain the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Name | User's full name |
| Email | User's email address |
| Phone | User's phone number |
| Location | Project location |
| Service Type | Type of photography service |
| Project Title | Title of the project |
| Project Description | Detailed description |
| Budget | Budget range |
| Urgency | Timeline preference |
| Event Date | Preferred event date |
| Company | Company/organization name |
| Specific Requirements | Additional requirements |

## Features

- **Automatic Headers**: The script automatically creates headers if the sheet is empty
- **Data Validation**: The script validates incoming data before adding it to the sheet
- **Error Handling**: Errors are logged and don't break the form submission
- **Non-blocking**: If Google Sheets fails, the form still saves to Supabase
- **Auto-resize**: Columns automatically resize for better readability

## Troubleshooting

### Common Issues

1. **Script not receiving data**:
   - Check that the Web app URL is correct in your `.env` file
   - Ensure the script is deployed with "Anyone" access
   - Verify the spreadsheet ID is correct

2. **Permission errors**:
   - Re-authorize the script in Google Apps Script
   - Check that your Google account has access to both the script and spreadsheet

3. **CORS errors**:
   - This is normal with Google Apps Script. The integration uses `mode: 'no-cors'` to handle this

4. **Data not appearing in sheets**:
   - Check the Google Apps Script logs for errors
   - Run the `testAddRow` function manually to test
   - Verify the spreadsheet ID and sheet name

### Checking Logs

1. In Google Apps Script, click "Executions" in the left sidebar
2. Look for recent executions and any error messages
3. Click on an execution to see detailed logs

## Security Notes

- The Google Apps Script URL is safe to include in your frontend code
- The script only accepts specific data structures and validates input
- No sensitive data should be passed through this integration
- Consider adding additional validation if needed

## Next Steps

Once the integration is working:

1. **Monitor the data**: Regularly check your Google Sheets for new submissions
2. **Set up notifications**: You can add Google Sheets notifications for new rows
3. **Data analysis**: Use Google Sheets features to analyze your lead data
4. **Backup**: Consider exporting data regularly for backup purposes

## Alternative: Google Sheets API

For more advanced use cases, you might consider using the Google Sheets API directly. This requires:
- Service account setup
- API key configuration
- More complex authentication

The current Google Apps Script approach is simpler and sufficient for most use cases.

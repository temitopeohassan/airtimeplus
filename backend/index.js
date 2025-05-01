/**
 * Airtime 101 - Sending Airtime using Africa's Talking API
 * 
 * This script demonstrates how to send airtime to a phone number
 * using the Africa's Talking API in a sandbox environment.
 */

// Initialize credentials for the Africa's Talking API
const credentials = {
    apiKey: '', // Add your API key from the sandbox application
    username: 'sandbox' // Using 'sandbox' as the username for testing environment
};

// Import the Africa's Talking SDK and initialize with credentials
const AfricasTalking = require('africastalking')(credentials);

// Get the Airtime service
const airtime = AfricasTalking.AIRTIME;

// Define recipient details
const options = {
    recipients: [
        {
            phoneNumber: '+CCCXXXXXXX', // Replace with your simulator phone number
            amount: 300,
            currencyCode: 'KES' // Kenyan Shillings
        }
    ]
};

// Send the airtime
airtime.send(options)
    .then(response => {
        console.log('Airtime sent successfully:');
        console.log(response);
    })
    .catch(error => {
        console.log('Error sending airtime:');
        console.log(error);
    });

/**
 * Notes:
 * 1. Replace the empty apiKey with your API key from the sandbox application
 * 2. Update the phoneNumber to match the one you're using in the simulator
 * 3. You can test this in the Africa's Talking sandbox environment
 */
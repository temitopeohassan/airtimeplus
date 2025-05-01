/**
 * Airtime API - Sending Airtime using Africa's Talking API
 * This script provides an API endpoint to send airtime using Africa's Talking API
 */

const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Initialize credentials for the Africa's Talking API
const credentials = {
    apiKey: process.env.AT_API_KEY || '', // Get API key from environment variables
    username: process.env.AT_USERNAME || 'sandbox'
};

// Import the Africa's Talking SDK and initialize with credentials
const AfricasTalking = require('africastalking')(credentials);

// Get the Airtime service
const airtime = AfricasTalking.AIRTIME;

// API endpoint to send airtime
app.post('/api/send-airtime', async (req, res) => {
    try {
        const { phoneNumber, amount, currencyCode = 'KES' } = req.body;

        // Validate required fields
        if (!phoneNumber || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and amount are required'
            });
        }

        const options = {
            recipients: [
                {
                    phoneNumber,
                    amount,
                    currencyCode
                }
            ]
        };

        // Send the airtime
        const response = await airtime.send(options);
        
        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Error sending airtime:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send airtime',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
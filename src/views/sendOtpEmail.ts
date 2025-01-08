const emailOtpHtml = (otp: string) => { 
    `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            color: #333333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0A2540;
            padding-bottom: 10px;
        }
        .header h1 {
            color: #0A2540;
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin: 20px 0;
        }
        .otp {
            font-size: 24px;
            color: #0A2540;
            font-weight: bold;
            text-align: center;
            padding: 10px 0;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
            border-top: 1px solid #dddddd;
            padding-top: 10px;
        }
        .button {
            display: inline-block;
            background-color: #0A2540;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Tapp</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your one-time password (OTP) is:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone for security reasons.</p>
            <a href="#" class="button">Sign In</a>
            <p>If you didn’t request this OTP, please ignore this email or contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>Thank you for choosing Tapp!</p>
            <p>&copy; 2025 Tapp Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
}
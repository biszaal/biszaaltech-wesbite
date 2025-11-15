# Email Setup Instructions

The contact form uses EmailJS to send emails. Follow these steps to configure it:

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service

1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and copy your **Template ID**

## 4. Get Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy it

## 5. Configure Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Add your EmailJS credentials:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Replace the placeholder values with your actual credentials from steps 2-4

## 6. Test the Contact Form

1. Restart your development server:
   ```bash
   npm start
   ```

2. Fill out the contact form on your website
3. Check your email inbox for the message

## Important Notes

- **Never commit the `.env` file** to git (it's already in .gitignore)
- For production deployment, add these environment variables to your hosting platform (Vercel, Netlify, etc.)
- EmailJS free tier allows 200 emails per month
- Make sure your email template variables match the ones sent from the form:
  - `from_name`
  - `from_email`
  - `message`
  - `to_email`

## Troubleshooting

If emails aren't sending:

1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure your EmailJS service is active
4. Check EmailJS dashboard for usage limits
5. Verify the template variable names match exactly

## Alternative: For Deployment Without EmailJS

If you prefer not to use EmailJS, you can also use:
- Formspree (https://formspree.io/)
- Web3Forms (https://web3forms.com/)
- Your own backend API endpoint

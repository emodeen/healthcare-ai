import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main>
      <h1>Privacy Policy</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create tasks in our application. This includes task titles and completion status.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, including to process and display your tasks.</p>

        <h2>3. Information Sharing and Disclosure</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

        <h2>4. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your task data for as long as your account is active or as needed to provide our services. You can delete your tasks at any time.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. You can manage your tasks directly in the application.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at privacy@example.com.</p>

        <p><Link href="/">← Back to Tasks</Link></p>
      </div>
    </main>
  );
}
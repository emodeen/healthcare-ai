import React from 'react';
import Link from 'next/link';

export default function TermsOfUse() {
  return (
    <main>
      <h1>Terms of Use</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this Task Management Application ("the App"), you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily use the App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose or for any public display;</li>
          <li>attempt to decompile or reverse engineer any software contained on the App;</li>
          <li>remove any copyright or other proprietary notations from the materials.</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>The materials on the App are provided on an 'as is' basis. The App makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2>4. Limitations</h2>
        <p>In no event shall the App or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the App, even if the App or its authorized representative has been notified orally or in writing of the possibility of such damage.</p>

        <h2>5. Accuracy of Materials</h2>
        <p>The materials appearing on the App could include technical, typographical, or photographic errors. The App does not warrant that any of the materials on its App are accurate, complete, or current.</p>

        <h2>6. Links</h2>
        <p>The App has not reviewed all of the sites linked to its App and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the App of the site.</p>

        <h2>7. Modifications</h2>
        <p>The App may revise these terms of service for its App at any time without notice. By using this App you are agreeing to be bound by the then current version of these terms of service.</p>

        <h2>8. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>

        <p><Link href="/">← Back to Tasks</Link></p>
      </div>
    </main>
  );
}
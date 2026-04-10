import React from "react";

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function PrivacyPolicyPage() {
  return (
    <PageTemplate slug="privacy-policy" title="Privacy Policy" narrow="true">
    
      <Block label="Privacy policy introduction">
        <p>This page explains what information Cryptid Quest collects and how it's used.
        </p>
        <p><em>Last updated: January 4, 2026</em></p>
      </Block>

      <Block title="Summary">
        <ul>
          <li>We don't use Google Analytics (GA4) or advertising trackers right now.</li>
          <li>If you contact us, we receive the information you send (like name, email, and message).</li>
          <li>Our hosting provider may process basic technical data (like IP address) to deliver the site.</li>
        </ul>
      </Block>

      <Block title="Information we collect">
        <h3>Information you provide</h3>
        <p>
          If you contact us (for example, by email or a contact form), we may receive information
          such as your name, email address, and the contents of your message.
        </p>
      </Block>

      <Block label="Basic technical data">
        <h3>Basic technical data</h3>
        <p>
          Like most websites, our hosting and infrastructure may process technical data to deliver
          the site and keep it secure. This can include things like your IP address, browser type,
          device information, pages requested, and timestamps (often called “server logs”).
        </p>
      </Block>

      <Block title="Cookies and local storage">
        <p>
          Cryptid Quest does not intentionally use advertising or analytics tracking cookies at
          this time.
        </p>
        <p>
          Some site features (or your browser) may store limited data locally (for example, basic
          preferences or cached files) to improve performance. You can typically control cookies
          and site storage through your browser settings.
        </p>
      </Block>

      <Block title="How we use information">
        <ul>
          <li>To respond to messages and support requests</li>
          <li>To maintain site security and prevent abuse</li>
          <li>To improve site content, games, and usability</li>
        </ul>
      </Block>

      <Block title="How information is shared">
        <p>
          We don't sell your personal information. We may share limited information with service
          providers that help us operate the site (for example, web hosting and infrastructure),
          only as needed to provide and secure the service.
        </p>
      </Block>

      <Block title="Data retention">
        <p>
          We keep personal information only as long as necessary for the purposes described above
          (for example, responding to your message), unless we need to retain it longer for
          legitimate operational or legal reasons.
        </p>
      </Block>

      <Block title="Security">
        <p>
          We take reasonable steps to protect information, but no method of transmission or
          storage is 100% secure.
        </p>
      </Block>

      <Block title="Children's privacy">
        <p>
          Cryptid Quest is not intended for children under 13, and we don't knowingly collect
          personal information from children under 13.
        </p>
      </Block>

      <Block title="Links to other sites">
        <p>
          Our site may link to third-party websites. We're not responsible for their content or
          privacy practices, and we recommend reviewing their policies.
        </p>
      </Block>

      <Block title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we'll update the
          “Last updated” date at the top of this page.
        </p>
      </Block>
      
      <Block title="Contact">
        <p>
          If you have questions about this Privacy Policy, email{" "}
          <a href="mailto:feedback@cryptid.quest">feedback@cryptid.quest</a>.
        </p>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}

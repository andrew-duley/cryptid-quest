import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function Contact() {
  return(
    <PageTemplate
      slug="contact"
      title="Contact Me"
      narrow={true}
    >
      <Block label="Contact introduction">
        <p>Want to report a bug, share feedback, or talk dev work? Send a message anytime.</p>
      </Block>

      <Block title="Email">
        <p><a contact__email href="mailto:feedback@cryptid.quest">feedback@cryptid.quest</a></p>
        <p className="contact__note">Get it? It's like feedback from a guitar amplifier!</p>
        <p>Helpful details (optional): the page URL, what you expected to happen, what happened, and your browser/device.</p>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}
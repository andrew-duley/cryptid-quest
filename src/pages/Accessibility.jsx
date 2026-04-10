import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function Accessibility() {
  return(
    <PageTemplate slug="accessibility" title="Accessibility" narrow="true">
    
      <Block label="Accessibility introduction">
          <p>Cryptid Quest is built to be usable for as many people as possible, including people who use screen readers, keyboard-only navigation, or other assistive technologies.</p>
      </Block>


      <Block title="The Crew's Approach">
        <ul>
          <li>Keyboard navigation and visible focus states</li>
          <li>Semantic HTML and accessible names/labels</li>
          <li>Color contrast and readable typography</li>
          <li>Responsive layouts for different devices and zoom levels</li>
          <li>Alt text for meaningful images</li>
        </ul>
      </Block>

      <Block title="Known limitations">
          <p>We're actively improving. If you run into something that doesn't work for you, please tell us and we'll fix it.</p>
      </Block>
    
      <Block title="Report an issue">
        <p>
          When possible, include: the page URL, what you were trying to do, what device/browser you're using, and what assistive technologies (if any).
        </p>
      </Block>

      <Block title="Email">
        <p>Email: <a href="mailto:feedback@cryptid.quest">feedback@cryptid.quest</a></p>
      </Block>
      
      <PageFooter />
    </PageTemplate>
  );
}
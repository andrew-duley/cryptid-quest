import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function Accessibility() {
  return(
    <PageTemplate slug="accessibility" title="Accessibility" narrow={true}>
    
      <Block label="Accessibility introduction">
          <p>Cryptid Quest aims to be usable and enjoyable for as many people as possible, including people who use screen readers, keyboard-only navigation, and other assistive technologies.</p>
      </Block>


      <Block title="The Crew's Approach">
        <p>Accessibility is an ongoing part of development, and we continue to improve the experience as the site grows.</p>
        <p>We work toward making Cryptid Quest accessible through:</p>
        <ul>
          <li>Keyboard navigation and visible focus states</li>
          <li>Semantic HTML and accessible names and labels</li>
          <li>Color contrast and readable typography</li>
          <li>Responsive layouts for different devices and screen sizes</li>
          <li>Alt text for meaningful images</li>
        </ul>
      </Block>

      <Block title="Known Limitations">
          <p>Some of our games are still being improved for keyboard navigation, screen readers, and mobile devices. While the main website is designed with accessibility in mind, certain interactive experiences may not yet work as expected with all devices or assistive technologies.</p>
          <p>We're working toward making these experiences more accessible. If you encounter a problem, please let us know.</p>
      </Block>
    
      <Block title="Report an issue">
        <p>If you experience an accessibility issue, we'd appreciate hearing about it.</p>
        <p>When possible, please include:</p> 
        <ul>
          <li>The page URL where you encountered the problem</li>
          <li>What you were trying to do</li>
          <li>Your device and browser</li>
          <li>Any assistive technologies you were using, if applicable</li>
        </ul>
      </Block>

      <Block title="Email">
        <p>Email: <a href="mailto:feedback@cryptid.quest">feedback@cryptid.quest</a></p>
      </Block>
      
      <PageFooter />
    </PageTemplate>
  );
}
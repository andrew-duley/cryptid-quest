import { Link } from 'react-router-dom';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function About() {
  return(
    <PageTemplate 
      slug="about"
      title="About the Northern Fringe"
      narrow={true}
    >
      <Block title="The Northern Fringe">

        <p>The Northern Fringe is a vast and unusual world, home to sprawling forests, towering mountains, quiet lakes, and countless places still waiting to be explored. Its wilderness can be as beautiful as it is unpredictable, and those who venture too far from familiar paths may discover that not everything is quite what it seems.</p>

        <p>Humans share this world with an extraordinary variety of inhabitants. Trolls, Sasquatches, gargoyles, and countless other beings have made their homes here, some native to the Fringe and others having arrived from worlds far beyond it. Their histories, customs, and ways of life are as varied as their appearances.</p>

        <p>Despite their differences, many have found ways to live and work alongside one another. Small settlements have taken root throughout the Fringe, offering places to trade, build homes, form friendships, and enjoy a little ordinary life in a world that is anything but ordinary.</p>
      </Block>

      <Block title="The Village of Baird">

        <p>Nestled along the eastern shore of Baird Lake is the village of Baird, a thriving community of approximately fifteen hundred residents, both human and otherwise. Founded roughly a century ago by a small group of settlers, Baird has gradually grown into an established home for people from many different backgrounds.</p>

        <p>Life in Baird is much like life in any small village. Fishing boats venture onto the lake, farmers tend their fields, and merchants and craftspeople provide the goods and services that keep the community running. Neighbors know one another, visitors come and go, and the occasional disagreement is usually settled without too much trouble.</p>

        <p>At the heart of the village stands Longfire Lodge, a welcoming place where residents and travelers gather for a meal, a comfortable room, or simply good company. Its great hearth provides warmth on chilly evenings, and there's rarely a shortage of friendly conversation.</p>

        <p>Beyond the village, the Northern Fringe stretches in every direction, offering opportunities for exploration, discovery, and the occasional unexpected encounter. For those who call Baird home, however, there's something reassuring about returning to familiar faces and a warm place to rest.</p>
      </Block>

      <Block title="The Inhabitants">

        <p>The Northern Fringe is home to individuals from remarkably different backgrounds. Some were born here, while others arrived from distant worlds, bringing their own customs, experiences, and perspectives. Despite their differences, many have found common ground, forming friendships and building lives alongside neighbors they might never have encountered anywhere else.</p>

        <p>Among Baird's residents is a particularly close-knit group of friends known simply as the Crew. Their curiosity and shared enthusiasm for exploration frequently take them beyond the village and into the surrounding wilderness. Some adventures begin with a carefully considered plan, while others start with little more than an interesting discovery and someone suggesting they take a closer look.</p>

        <p>Of course, life in Baird extends well beyond the Crew. Shopkeepers, craftspeople, merchants, families, and other familiar faces all contribute to the community. Some occasionally find themselves drawn into the Crew's adventures, while others have stories of their own.</p>
      </Block>

      <Block title="The Stories">

        <p>Life in the Northern Fringe rarely stands still. From everyday happenings in Baird to unexpected discoveries in the surrounding wilderness, there is always another story unfolding. Some begin with a simple conversation or an ordinary afternoon, while others lead to mysteries, adventures, and situations nobody quite anticipated.</p>

        <p>These stories follow the lives of Baird's inhabitants as their experiences unfold over time. Friendships develop, new faces appear, and events from one story may have consequences in another. While each story offers its own glimpse into life in the Fringe, together they form an ongoing narrative shaped by the characters and the world around them.</p>

        <p>Not every story takes place in the present. Occasionally, the narrative turns to earlier events, exploring how familiar faces first arrived, how friendships began, or what life was like in Baird years before. These glimpses into the past reveal more about the inhabitants, the lives they once led, and the events that helped shape the Northern Fringe as it exists today.</p>
      </Block> 

      <Block title="The Game Room">

        <p>Tucked away beneath Longfire Lodge is a room that has become one of Baird's favorite places to spend a little free time. Known simply as the Game Room, it began as a modest collection of games shared among friends. Over the years, that collection has steadily grown, drawing visitors from throughout the village.</p>

        <p>The Game Room offers something for just about everyone. Some come for a friendly competition, others to try their hand at something unfamiliar, and a few simply enjoy watching the games unfold. Familiar favorites sit alongside unusual creations, some brought to Baird from distant worlds and others dreamed up by the village's own inventive residents.</p>

        <p>There's almost always someone ready for another round, and with new games finding their way into the collection, there's usually something new to discover. Whether it's a quiet afternoon or a lively evening filled with friendly rivalries, the Game Room has become a place where friendships are strengthened, challenges are issued, and the occasional argument over the rules is inevitable.</p>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}
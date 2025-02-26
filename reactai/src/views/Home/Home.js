import React from 'react';
import { Carousel } from '../../components';

const Home = () => {
  return (
    <div className="container">
      <h2>Velkommen til Heiersmed's MC Touring!</h2>
      <p>
        Vi er en familievennlig motorsykkelklubb for alle som elsker friheten på to hjul og gleden av å dele veien med andre.
        Hos oss finner du et inkluderende fellesskap, der både erfarne motorsyklister og nybegynnere kan føle seg hjemme.
        Enten du søker nye eventyr, gode historier rundt bålet, eller bare ønsker noen å kjøre sammen med, er du hjertelig velkommen.
        Kom og bli med oss på neste tur – vi gleder oss til å møte deg!
      </p>

      <section className="quotes">
        <h3>Hva Medlemmene Sier</h3>
        <blockquote>"Å være en del av denne klubben har endret livet mitt. Turene, kameratskapet – det er noe helt spesielt." - Medlem 1</blockquote>
        <blockquote>"Den beste avgjørelsen jeg tok var å bli med i denne klubben. Det er mer enn et fellesskap; det er en familie." - Medlem 2</blockquote>
      </section>
      <Carousel postId="2YRVWvep958nAKkmREmjO8" />
    </div>
  );
};

export default Home;


import { Injectable } from '@nestjs/common';

import { JokesService } from '../../resources/jokes/jokes.service';

@Injectable()
export class JokeSeed {
    constructor(private readonly jokesService: JokesService) { }

    async seed() {
        const jokes = [
            { joke: 'Chuck Norris uses ribbed condoms inside out, so he gets the pleasure.' },
            { joke: 'MacGyver can build an airplane out of gum and paper clips. Chuck Norris can kill him and take it.' },
            { joke: 'Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants.' },
            { joke: 'Chuck Norris lost his virginity before his dad did.' },
            { joke: 'Since 1940, the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.' },
            { joke: 'Huck Norris sheds his skin twice a year.' },
            { joke: 'There are no steroids in baseball. Just players Chuck Norris has breathed on.' },
            { joke: 'When Chuck Norris goes to donate blood, he declines the syringe, and instead requests a hand gun and a bucket.' },
            { joke: 'Chuck Norris does not teabag the ladies. He potato-sacks them.' },
            { joke: 'In an average living room there are 1,242 objects Chuck Norris could use to kill you, including the room itself.' },
            { joke: 'Chuck Norris doesn\'t shower, he only takes blood baths.' },
            { joke: 'Time waits for no man. Unless that man is Chuck Norris.' },
            { joke: 'In the Bible, Jesus turned water into wine. But then Chuck Norris turned that wine into beer.' },
            { joke: 'Chuck Norris is not hung like a horse. Horses are hung like Chuck Norris.' },
            { joke: 'Chuck Norris has two speeds: Walk and Kill.' },
            { joke: 'Fool me once, shame on you. Fool Chuck Norris once and he will roundhouse kick you in the face.' },
            { joke: 'If you spell Chuck Norris in Scrabble, you win. Forever.' },
            { joke: 'Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Masacre.' },
            { joke: 'Chuck Norris will attain statehood in 2009. His state flower will be the Magnolia.' },
            { joke: 'huck Norris doesn\'t wash his clothes. He disembowels them.' },
        ];
        await this.jokesService.createMany(jokes);
        console.log('~~ Jokes seeded successfully! ~~');
    }
}

import twilio from 'twilio';
import dotenv from 'dotenv';
import Crawler from 'crawler';
import Cheerio from 'cheerio';
import { Router } from 'express';

const routes = Router();
const cheerio = Cheerio;
const env = dotenv.config()['parsed'];
const client = twilio(env.TWILIO_SID, env.TWILIO_TOKEN);

routes.get('/', (req, res) => {
    // testCrawler()
    sendMessage();
    res.send({
        message: 'This is a test web crawler route.'
    });
});


const sendMessage = () => {console.log(env)
    client.messages
    .create({ 
        body: 'This is a trial message sent from twilio npm and env.',
        from: env.WHATSAPP_SENDER,
        to: env.WHATSAPP_RECEIVER
      }) 
    .then(message => console.log('Message sent successfully.'))
    .catch(err => console.log('Error while sending message: ', err)).done();
}

const testCrawler = () => {
    var c = new Crawler({
        maxConnections : 10,
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                console.log($("title").text());
                const html = cheerio.load(res.body);
                const links = html('a');
                links.each((index, element) => {
                    console.log(`https://hamrobazaar.com/${html(element).attr('href')}`)
                });
            }
            done();
        }
    });

    c.queue('https://hamrobazaar.com/search.php?do_search=Search&order=&way=&searchword=1bhk&catid_search=0&city_search=&e_2=&e_1_from=10%2C000&e_1_to=20%2C000&e_4=&do_search=Search');
}

export default routes;
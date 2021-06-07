import Crawler from 'crawler';
import twilio from 'twilio';
import Cheerio from 'cheerio';
import { Router } from 'express';

const routes = Router();
const client = twilio('AC22d74ad29d606dcb5789bc950a5bb1d2', '05ccbb5c299ea89f816f1b6a79b7cb14');
// const client = require('twilio')('AC22d74ad29d606dcb5789bc950a5bb1d2', '05ccbb5c299ea89f816f1b6a79b7cb14');
const cheerio = Cheerio;

routes.get('/', (req, res) => {
    // testCrawler()
    sendMessage();
    res.send({
        message: 'This is a test web crawler route.'
    });
});


const sendMessage = () => {
    console.log('Inside message sender...');
    client.messages
    // Sending a SMS using message server
    // .create({
    //     body: 'This is a trial message sent from twilio npm.',
    //     from: '+18187148469',
    //     to: '+9779807921240'
    // })
    .create({ 
        body: 'This is a trial message sent from twilio npm.',
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+9779807921240' 
      }) 
    .then(message => console.log('Message sent successfully.'))
    .catch(err => console.log('Error while sending message: ', err)).done();
}

const testCrawler = () => {
    console.log('inside crawler..')
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
import Crawler from 'crawler';
import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    testCrawler()
    res.send({
        message: 'This is a test web crawler route.'
    });
});

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
            }
            done();
        }
    });

    c.queue('https://hamrobazaar.com/search.php?do_search=Search&order=&way=&searchword=1bhk&catid_search=0&city_search=&e_2=&e_1_from=10%2C000&e_1_to=20%2C000&e_4=&do_search=Search');
}

export default routes;
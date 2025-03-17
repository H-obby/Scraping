import axios from 'axios';
import * as cheerio from 'cheerio';
import { Feat } from '../app/interfaces';
import puppeteer from 'puppeteer'

export class FeatsScrap{
  constructor() {}
    
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async fetch_html(url: string): Promise<string> {
    try {
      console.log(`before launch`)
      const browser = await puppeteer.launch();
      console.log(`before newpage`)
      const page = await browser.newPage();
      console.log(`before goto(${url})`)
      await page.goto(url);
      console.log(`before content`)
      let html = await page.content();
      console.log(`hml = ${html}`)

      await browser.close();

      return html;
    } catch (error) {
      // handle error
      console.log(error);
      return '';
    }
  }
  
  public async get_all_feats(): Promise<Feat[]>{
    console.log(`very start of get_all_feats`)
    return await this.fetch_html('https://gemmaline.com/dons/description.php').then(async html => {
      const $ = cheerio.load(html);
      
      let feats_url = $('body table.tableau tbody tr td strong a')
      .map((_, element) => $(element).attr('href')?.substring(1))
      .get();
      
      let feats_data: Feat[] = [];
      
      const index = 0;
      const number = 5; //feats_url.length
      
      for(var url of feats_url.slice(index, number)){
        await this.fetch_html('https://gemmaline.com/dons'+url).then(html => {
          const $ = cheerio.load(html);
          let nom = $('body h1').clone().children().remove().end().text().trim();
          let type = $('body h1 em').text();
          let courte_desc = $('body p:first').clone().children().remove().end().text().split('\n')[1].trim();
          let source = $('body .source').text();
          let condition = $('body h4:contains("Condition") + ul li')
          .map((_, element) => {
            const $element = $(element);
            const text = $element.text().trim();
            return text;
          })
          .get()
          .join(', ');
          let condition_url = $('body h4:contains("Condition") + ul li')
          .map((_, element) => {
            const $element = $(element);
            const link = $element.find('a');

            if (link.length > 0) {
              const href = link.attr('href')?.trim();
              return `https://gemmaline.com${href}`;
            }
            
            return 'null';
          })
          .get()
          .join(', ');
          let avantage = $('h4:contains("Avantage") + p').text();
          let normal = $('h4:contains("Normal") + p').text();
          
          feats_data.push({
            'nom': nom,
            'type': type,
            'courte_description': courte_desc,
            'source': source,
            'condition': condition.split(', '),
            'condition_url': condition_url.split(', '),
            'avantage': avantage.slice(1, -1),
            'normal': normal.slice(1, -1),
            'url': 'https://gemmaline.com/dons'+url,
          });
          this.delay(1000);
        });
      };
      
      return feats_data;
    });
  }
}

import { default as axios } from 'axios';
import * as cheerio from 'cheerio';
import { promises } from 'dns';
import { readFile, readFileSync, writeFile } from 'fs';
import * as csvWriter from 'csv-writer';
import { parse } from 'csv-parse';
import * as path from 'path';
import ProgressBar from 'progress'

type FeatMap = { [K: string]: { [K: string]: string } };

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async function fetch_html(url: string): Promise<string> {
  try {
    const response = await axios.get<string>(url);
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
    return '';
  }
}

function get_all_feats(){
  const bar = new ProgressBar(':bar :percent (:current/:total)', { total: 100 });

  fetch_html('https://gemmaline.com/dons/description.php').then(async html => {
    const $ = cheerio.load(html);

    let feats_url = $('body table.tableau tbody tr td strong a')
      .map((_, element) => $(element).attr('href')?.substring(1))
      .get();

    let feats_data: FeatMap = {};

    const index = 0;
    const number = 5

    const bar = new ProgressBar(':bar :percent (:current/:total)', { total: feats_url.length });

    for(var url of feats_url){
      await fetch_html('https://gemmaline.com/dons'+url).then(html => {
        const $ = cheerio.load(html);
        let nom = $('body h1').clone().children().remove().end().text().trim();
        let type = $('body h1 em').text();
        let courte_desc = $('body p:first').clone().children().remove().end().text().split('\n')[1].trim();
        let source = $('body .source').text();
        let condition = $('body h4:contains("Condition") + ul li')
          .map((_, element) => {
            const $element = $(element);
            const link = $element.find('a');

            let text = $element.text().trim();
            if (link.length > 0) {
                const href = link.attr('href');
                text += ` <<https://gemmaline.com${href?.substring(4)}>>`;
            }

            return text;
          })
          .get()
          .join(', ');
        let avantage = $('h4:contains("Avantage") + p').text();
        let normal = $('h4:contains("Normal") + p').text();

        feats_data[nom] = {
          'nom': nom,
          'type': type,
          'courte_description': courte_desc,
          'source': source,
          'condition': '['+condition+']',
          'avantage': avantage.slice(1, -1),
          'normal': normal.slice(1, -1),
          'url': 'https://gemmaline.com/dons'+url,
        };
        delay(1000);
      });
      bar.tick();
    };

    writeFile('data/all_feats.json', JSON.stringify(feats_data), (err) => {
      if (err) {
        console.error('\nError writing file:', err);
      } else {
        console.log('\nFile written successfully');
      }
    })
  });
};


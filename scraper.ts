import { default as axios } from 'axios';
import * as cheerio from 'cheerio';
import { promises } from 'dns';
import { readFile, readFileSync, writeFile } from 'fs';
import * as csvWriter from 'csv-writer';
import { parse } from 'csv-parse';
import * as path from 'path';
import ProgressBar from 'progress'
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "node:buffer";


type FeatMap = { [K: string]: string };

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
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const bar = new ProgressBar(':bar :percent (:current/:total)', { total: 100 });

  fetch_html('https://gemmaline.com/dons/description.php').then(async html => {
    const $ = cheerio.load(html);

    let feats_url = $('body table.tableau tbody tr td strong a')
      .map((_, element) => $(element).attr('href')?.substring(1))
      .get();

    let feats_data: FeatMap[] = [];

    const index = 0;
    const number = feats_url.length

    const bar = new ProgressBar(':bar :percent (:current/:total)', { total: number });

    for(var url of feats_url.splice(index, number)){
      await fetch_html('https://gemmaline.com/dons'+url).then(html => {
        const $ = cheerio.load(html);
        let nom = $('body h1').clone().children().remove().end().text().trim();
        let type = $('body h1 em').text();
        let courte_desc = $('body p:first').clone().children().remove().end().text().split('\n')[1].trim();
        let source = $('body .source').text();
        let condition = $('body h4:contains("Condition") + ul li')
          .map((_, element) => $(element).text())
          .get()
          .join('], [');
        let avantage = $('h4:contains("Avantage") + p').text();
        let normal = $('h4:contains("Normal") + p').text();

        //Stocking data in a json like map
        feats_data.push({
          'nom': nom,
          'type': type,
          'courte_description': courte_desc,
          'source': source,
          'condition': '[['+condition+']]',
          'avantage': avantage.slice(1, -1),
          'normal': normal.slice(1, -1),
          'url': 'https://gemmaline.com/dons'+url,
        });
        
        delay(1000);
      });
      bar.tick();
    };

    // Converts your Array<Object> to a CsvOutput string based on the configs
    const csv = generateCsv(csvConfig)(feats_data);
    const filename = `data/all_feats.csv`;
    const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

    // Write the csv file to disk
    writeFile(filename, csvBuffer, (err) => {
      if (err) throw err;
      console.log("file saved: ", filename);
    });
  });
};

get_all_feats()


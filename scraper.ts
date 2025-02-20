import { default as axios } from 'axios';
import * as cheerio from 'cheerio';
import { promises } from 'dns';
import { readFile, readFileSync, writeFile } from 'fs';
import * as csvWriter from 'csv-writer';
import { parse } from 'csv-parse';
import * as path from 'path';

type FeatMap = { [K: string]: { [K: string]: string } };

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

async function get_feats(url: string, feats_data: FeatMap): Promise<FeatMap>{
  fetch_html('https://gemmaline.com/dons'+url).then(html => {
    const $ = cheerio.load(html);
    let name = $('body h1').clone().children().remove().end().text().trim();
    let type = $('body h1 em').text();
    
    feats_data[name] = {
      'name': name,
      'type': type
    };
    
    console.log(feats_data)
  });

  return feats_data;;
}

fetch_html('https://gemmaline.com/dons/dons-general.htm').then(async html => {
  const $ = cheerio.load(html);

  let feats_url = $('body table.tableau tbody tr td strong a')
    .map((_, element) => $(element).attr('href')?.substring(1))
    .get();

  let feats_data: FeatMap = {};

  for(var url of feats_url.slice(0, 1)){
    await fetch_html('https://gemmaline.com/dons'+url).then(html => {
      const $ = cheerio.load(html);
      let nom = $('body h1').clone().children().remove().end().text().trim();
      let type = $('body h1 em').text();
      let courte_desc = $('body p:first').clone().children().remove().end().text().split('\n')[1].trim();
      let source = $('.source').text()
      
      feats_data[nom] = {
        'nom': nom,
        'type': type,
        'courte_description': courte_desc,
        'source': source,
      };
    });
  };

  console.log(feats_data)
});

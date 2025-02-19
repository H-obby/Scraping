import { default as axios } from 'axios';
import * as cheerio from 'cheerio';
import { promises } from 'dns';

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

fetch_html('https://www.gemmaline.com/dons/dons-abjurateur-d-armure-1270.htm').then(html => {
  const $ = cheerio.load(html);
  let name = $('body > h1').clone().children().remove().end().text().trim()
  let type = $('body > h1 > em').text();

  console.log(name,'\n', type);
});

import axios from "axios";

//language

const language = async (req, res) => {
  // const options = {
  //   method: "GET",
  //   url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
  //   headers: {
  //     "Accept-Encoding": "application/gzip",
  //     "X-RapidAPI-Key": "bc56163dedmsh5bde41c965bb45dp13112fjsn9b51e5a72802",
  //     "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {

      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '4ec8a5afe7mshae40a53599b15e2p154a04jsn4a2f4ca23c19',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }

  };

  try {
    const response = await axios.request(options);
    // console.log(response.data.data.languages);

    const languagesData = response.data.data;

    const mappedLanguages = languagesData.languages.map(
      (lang, key) => lang.language + key
    );
   
    res.status(200).json(mappedLanguages);
  } catch (error) {
    console.error(error);
  }

  // const options = {
  //   method: 'GET',
  //   url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
  //   headers: {
  //     'Accept-Encoding': 'application/gzip',
  //     'X-RapidAPI-Key': '4ec8a5afe7mshae40a53599b15e2p154a04jsn4a2f4ca23c19',
  //     'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  //   }
  // };
  
  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  // }

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  //     "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  //   },
  // };

  // try {
  //   const response = await axios(
  //     "https://g-translate1.p.rapidapi.com/languages",
  //     options
  //   );

  //   const arrayOfData = Object.keys(response.data.data).map(
  //     (key) => response.data.data[key]
  //   );
  //   res.status(200).json(arrayOfData);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: err });
  // }
};

//translation

const translate =
  ("/translation",
  async (req, res) => {
    let { textToTranslate, outputLanguage, inputLanguage } = req.query;

    /**
     * ALTERNATUVE API INCASE OF EMERGANCY
     * */

    outputLanguage = outputLanguage.substring(0, 2).toLowerCase();

    inputLanguage = inputLanguage.substring(0, 2).toLowerCase();

    const encodedParams = new URLSearchParams();
    encodedParams.set("q", textToTranslate);
    encodedParams.set("target", outputLanguage);
    encodedParams.set("source", inputLanguage);

    // const options = {
    //   method: "POST",
    //   url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //     "Accept-Encoding": "application/gzip",
    //     "X-RapidAPI-Key": "bc56163dedmsh5bde41c965bb45dp13112fjsn9b51e5a72802",
    //     "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    //   },
    //   data: encodedParams,
    // };

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {

        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '4ec8a5afe7mshae40a53599b15e2p154a04jsn4a2f4ca23c19',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'

      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);      
      res.status(201).json(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
    /*
     */

    // const options = {
    //   method: "GET",
    //   params: {
    //     text: textToTranslate,
    //     tl: outputLanguage,
    //     sl: inputLanguage,
    //   },
    //   headers: {
    //     "x-rapidapi-host": process.env.RAPID_API_HOST,
    //     "x-rapidapi-key": process.env.RAPID_API_KEY,
    //   },
    // };

    // try {
    //   const response = await axios(
    //     "https://g-translate1.p.rapidapi.com/translate",
    //     options
    //   );
    //   console.log(response.data);
    //   res.status(200).json(response.data);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({ message: err });
    // }
  });

export default { language, translate };

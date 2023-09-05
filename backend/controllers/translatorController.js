import axios from 'axios'

//language

const language = async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };

  try {
    const response = await axios(
      "https://g-translate1.p.rapidapi.com/languages",
      options
    );

    const arrayOfData = Object.keys(response.data.data).map(
      (key) => response.data.data[key]
    );
    res.status(200).json(arrayOfData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

//translation

const translate =
  ("/translation",
  async (req, res) => {
    const { textToTranslate, outputLanguage, inputLanguage } = req.query;

    const options = {
      method: "GET",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage,
      },
      headers: {
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
    };

    try {
      const response = await axios(
        "https://g-translate1.p.rapidapi.com/translate",
        options
      );
      res.status(200).json(response.data.data.translation);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  });

export default { language, translate };

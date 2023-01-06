const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    let imageSize = "256x256";

    switch(size) {
        case "small":
            imageSize = "256x256";
        break;
        case "medium":
            imageSize = "512x512";
        break;
        case "large":
            imageSize = "1024x1024";
        break;
    }

    try {
        const response = await openai.createImage({
            prompt,
            n: 1, //number of images
            size: imageSize,
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        if(error.response) {
            console.log(error.response.status);
            console.log(error.response.data)
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: 'The image could not be generated.'
        });
    }
}

module.exports = { generateImage };
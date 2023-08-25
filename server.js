// // import OpenAI from "openai";

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// require("dotenv").config();
// const API_KEY = process.env.REACT_APP_API_KEY;

// // console.log(API_KEY);

// const OpenAI = require("openai");

// // const openai = new OpenAI({
// //   api_key: API_KEY,
// // });

// // Old?
// // const { Configuration, OpenAIApi } = require("openai");

// // const configuration = new Configuration({
// //   organization: "org-jWnEJ2d561jfwHpEEW6Q48mK",
// //   apiKey: API_KEY,
// // });

// // const openai = new OpenAIApi(configuration);
// // const response = await openai.listEngines();
// // console.log(response);

// // NEW ??
// const openai = new OpenAI({
//   apiKey: API_KEY,
// });

// // const chatCompletion = openai.chat.completions.create({
// //   model: "gpt-3.5-turbo",
// //   messages: [{ role: "user", content: "Hello!" }],
// // });

// // console.log(chatCompletion);

// // const completion = openai.completions.create({
// //   model: "text-davinci-003",
// //   prompt: "This story begins",
// //   max_tokens: 30,
// // });
// // console.log(completion);

// // Set up the server
// const app = express();
// app.use(bodyParser.json());
// app.use(cors);

// // Set up the ChatGPT endpoint
// app.post("/chat", async (req, res) => {
//   const { prompt } = req.body;

//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: prompt },
//     ],
//   });
//   res.send(chatCompletion.choices[0].message.content);

//   //   const completion = openai.completions.create({
//   //     model: "text-davinci-003",
//   //     prompt: prompt,
//   //   });
//   //   res.send(completion.choices[0].text);
// });

// // Start server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

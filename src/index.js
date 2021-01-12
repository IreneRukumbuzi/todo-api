import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index";

const App = express();

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.use(cors());
App.use(
  cors({
    origin: "*",
    methods: "GET, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
App.use(morgan("dev"));

App.use(router);

export default App;

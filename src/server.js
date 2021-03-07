import App from "./index";

const Port = process.env.Port || 5000;

App.listen(Port, () => {
  console.log(`App listening on Port ${Port}...`);
});

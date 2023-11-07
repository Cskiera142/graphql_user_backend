const express = require("express");
const app = express();
const PORT = 3500;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

import * as React from "react";
import * as ReactDOM from "react-dom";

// tslint:disable-next-line:no-floating-promises
(async () => {
  const App = require("./App").default;
  require("./index.css");

  require("./TextStyles.css");

  ReactDOM.render(<App />, document.getElementById("root"));
})();

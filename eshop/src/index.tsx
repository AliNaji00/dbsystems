import * as React from "react";
import * as ReactDOM from "react-dom/client";

// tslint:disable-next-line:no-floating-promises
(async () => {
  const App = require("./App").default;
  require("./index.css");

  require("./TextStyles.css");

  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Failed to find the root element");
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
})();

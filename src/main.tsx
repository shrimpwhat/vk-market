import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import { Provider } from "react-redux";
import { store } from "./state/store";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Provider store={store}>
          <App />
        </Provider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);

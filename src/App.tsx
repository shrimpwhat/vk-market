import "@vkontakte/vkui/dist/vkui.css";
import { useGetProductsQuery } from "./state/api";

export function App() {
  const { data } = useGetProductsQuery();

  return (
    <div>
      <h1>Hello, VK!</h1>
    </div>
  );
}

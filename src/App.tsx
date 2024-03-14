import "@vkontakte/vkui/dist/vkui.css";
import { useGetProductsQuery } from "./state/api";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { loadCart, selectTotalSum } from "./state/cartSlice";
import { useEffect, useState, ReactNode } from "react";
import Card from "./Card/Card";
import {
  Div,
  FixedLayout,
  Group,
  SplitCol,
  SplitLayout,
  Title,
  ScreenSpinner,
  Snackbar,
} from "@vkontakte/vkui";
import { Icon28ErrorCircleOutline } from "@vkontakte/icons";

export function App() {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetProductsQuery();

  const { products } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectTotalSum);

  const [poput, setPopout] = useState<ReactNode>(null);
  const [snackbar, setSnackbar] = useState<ReactNode>(null);

  const showErrorSnackbar = (text: string) => {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          <Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />
        }
        duration={4000}
      >
        {text}
      </Snackbar>
    );
  };

  useEffect(() => setPopout(<ScreenSpinner />), []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(loadCart(data));
      setPopout(null);
    }
  }, [isSuccess]);

  return (
    <Div>
      <SplitLayout popout={poput}>
        <SplitCol minWidth={"75%"}>
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              onError={showErrorSnackbar}
            />
          ))}
        </SplitCol>

        <SplitCol autoSpaced>
          <FixedLayout>
            <Group>
              <Title>Итого: {total}</Title>
            </Group>
          </FixedLayout>
        </SplitCol>
      </SplitLayout>
      {snackbar}
    </Div>
  );
}

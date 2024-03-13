import "@vkontakte/vkui/dist/vkui.css";
import { useGetProductsQuery } from "./state/api";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { loadCart, selectTotalSum } from "./state/cartSlice";
import { useEffect } from "react";
import Card from "./Card/Card";
import {
  Div,
  FixedLayout,
  Group,
  SplitCol,
  SplitLayout,
  Title,
} from "@vkontakte/vkui";

export function App() {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching } = useGetProductsQuery();

  const { products } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectTotalSum);

  useEffect(() => {
    if (isSuccess) dispatch(loadCart(data));
  }, [isSuccess]);

  if (isFetching) return <p>Загрузка</p>;

  return (
    <Div>
      <SplitLayout>
        <SplitCol minWidth={"75%"}>
          {products.map((product) => (
            <Card key={product.id} product={product} />
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
    </Div>
  );
}

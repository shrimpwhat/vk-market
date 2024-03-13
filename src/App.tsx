import "@vkontakte/vkui/dist/vkui.css";
import { useGetProductsQuery } from "./state/api";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { loadCart, selectTotalSum } from "./state/cartSlice";
import { useEffect } from "react";

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
    <>
      <h1>{total}</h1>
    </>
  );
}

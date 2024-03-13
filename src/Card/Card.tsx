import {
  Card,
  SplitLayout,
  SplitCol,
  Title,
  Div,
  Text,
  Tappable,
} from "@vkontakte/vkui";
import { Icon16Add, Icon16Minus, Icon16Delete } from "@vkontakte/icons";
import { Product, localeSum } from "../state/cartSlice";
import { useAppDispatch } from "../state/hooks";
import { increment, decrement, remove } from "../state/cartSlice";
import "./style.css";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    if (product.count < 10) dispatch(increment(product.id));
  };
  const handleDecrement = () => {
    if (product.count > 1) dispatch(decrement(product.id));
  };
  const handleRemove = () => {
    dispatch(remove(product.id));
  };

  return (
    <Card mode="outline" style={{ marginBottom: "30px" }}>
      <Div>
        <SplitLayout style={{ height: "300px" }}>
          <SplitCol maxWidth={300}>
            <img className="card-image" src={product.image} />
          </SplitCol>
          <SplitCol>
            <div className="content-container">
              <div>
                <Title>{product.title} </Title>
                <Title
                  style={{ fontStyle: "italic", marginBlock: "5px" }}
                  level="2"
                >
                  {localeSum(product.price)}
                </Title>
                <Text>{product.description}</Text>
              </div>

              <div className="actions">
                <div className="info">
                  <Text style={{ marginRight: "20px" }}>
                    В корзине: {product.count}
                  </Text>
                  <Tappable onClick={handleIncrement}>
                    <Icon16Add width={30} height={30} />
                  </Tappable>
                  <Tappable onClick={handleDecrement}>
                    <Icon16Minus width={30} height={30} />
                  </Tappable>
                </div>
                <Tappable onClick={handleRemove}>
                  <Icon16Delete width={30} height={30} />
                </Tappable>
              </div>
            </div>
          </SplitCol>
        </SplitLayout>
      </Div>
    </Card>
  );
}

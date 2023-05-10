import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, hasItemInCart } from '../../../recoil/cart';
import { Dialog } from 'react-tiny-dialog';
import SHOPPING_CART from '../../../assets/png/cart-icon.png';
import { Product } from '../../../types/products';
import { Button } from '../../common/Button/Button.styles';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './ItemCartDialog.styles';

interface ItemCartDialogProps extends Product {}

const ItemCartDialog: React.FC<ItemCartDialogProps> = (props) => {
  const { id, name, price, imageUrl } = props;
  const setCart = useSetRecoilState(cartState);
  const has = useRecoilValue(hasItemInCart(id));

  const addItemToCart = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);
    const quantity = Number(fields['item-quantity'] as String);
    setCart((cart) => {
      if (has) {
        return cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...cart,
        { id, quantity, product: { id, name, price, imageUrl } },
      ];
    });
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <S.CartButton>
          <S.CartImg alt="cart" src={SHOPPING_CART} />
        </S.CartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.BackDrop />
        <Dialog.Content>
          <S.Box onSubmit={addItemToCart}>
            <S.Thumbnail src={imageUrl} alt={name} />
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString()} 원</S.Price>
            <QuantityStepper label="item-quantity" />
            <Dialog.Close asChild>
              <Button size="M" view="black" type="submit">
                추가하기
              </Button>
            </Dialog.Close>
          </S.Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ItemCartDialog;

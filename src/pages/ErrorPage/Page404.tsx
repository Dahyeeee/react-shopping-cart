import * as S from './Page404.styles';
import Flex from '../../components/common/Flex';
import { PAGE_ROUTES } from '../../constants/routes';

const Page404 = () => {
  return (
    <Flex dir="column">
      <S.ErrorMessage>
        요청하신 페이지는 존재하지 않는 페이지입니다.
      </S.ErrorMessage>
      <S.LinkToHome to={PAGE_ROUTES.HOME}>Home으로 돌아가기</S.LinkToHome>
    </Flex>
  );
};

export default Page404;

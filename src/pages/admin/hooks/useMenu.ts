import { useState } from 'react';

import { Menu } from '../types/menu';

const useMenu = () => {
  const [menu, setMenu] = useState<Menu>('글감 설정');

  const [isClicked, setIsClicked] = useState<Record<Menu, boolean>>({
    '글감 설정': true,
    '멤버 관리': false,
    '모임 정보 수정': false,
  });

  const handleMenuItem = (menu: Menu) => {
    setMenu(menu);

    setIsClicked(() => ({
      '글감 설정': false,
      '멤버 관리': false,
      '모임 정보 수정': false,
      [menu]: true,
    }));
  };

  return {
    menu,
    isClicked,
    handleMenuItem,
  };
};

export default useMenu;

import { useCallback, useMemo } from 'react';
import { MdAdminPanelSettings, MdOutlineWifiTethering } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';

import { ROUTER_PATHS } from '@/router/constants';
import { SidenavModulesEnum } from '@/shared/interfaces';
import { hasSystemModule } from '@/shared/utils/auth';
import { FiHome } from 'react-icons/fi';
import { NestedMenuItemLevels } from '.';

export interface NestedMenuItem {
  title: string;
  path?: string; // to
  icon?: React.ReactNode;
  admin?: boolean;

  level?: number;
  items?: NestedMenuItem[];
}
export const useNestedMenuItems = () => {
  const renderByModule = useCallback(
    (
      module: SidenavModulesEnum,
      item: NestedMenuItem,
    ): NestedMenuItem | null => {
      return hasSystemModule(module) ? item : null;
    },
    [],
  );

  const cleanEmptyItems = (menu: NestedMenuItem[]): NestedMenuItem[] => {
    return menu
      .map(item => {
        if (item?.items && item?.items.length > 0) {
          item.items = cleanEmptyItems(item?.items);

          // if the item has no children, remove it (actual object)
          if (item?.items?.length === 0) {
            return null;
          }
        }

        // Si el item no tiene 'items' o tiene items válidos, es un item válido
        if (!item?.items || item?.items?.length > 0) {
          return item;
        }

        return null;
      })
      .filter((item): item is NestedMenuItem => item !== null);
  };

  const nestedMenu = useMemo(() => {
    return [
      {
        title: 'Inicio',
        icon: <FiHome />,
        path: ROUTER_PATHS.home,
        level: NestedMenuItemLevels.firsLevelAlone,
      },

    ];
  }, [renderByModule]);

  const cleanedMenu = cleanEmptyItems(nestedMenu);

  return { nestedMenu: cleanedMenu };
};

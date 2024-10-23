import { NavLink } from 'react-router-dom';

import { SideNavMultiLevel, SideNavSingleLevel } from '.';
import { NestedMenuItem, hasChildren } from '../utils';

export type CustomMenuItemProps = {
  item: NestedMenuItem;
};

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ item }) => {
  const Component =
    hasChildren(item) && item.level ? SideNavMultiLevel : SideNavSingleLevel;

  return (
    <>
      {item?.path ? (
        <NavLink to={item.path} className="sidenav__nav-link">
          <Component item={item} />
        </NavLink>
      ) : (
        <Component item={item} />
      )}
    </>
  );
};

export default CustomMenuItem;

import { useUiStore } from '@/store/ui';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { LuMenu } from 'react-icons/lu';

import { SingleIconButton } from '@/shared/components/CustomButtons';
import { useIsMediaQuery } from '@/shared/hooks';

const ToggleSidebarBtn: React.FC = () => {
  const isMd = useIsMediaQuery('md');

  const isOpenNav = useUiStore(s => s.isNavOpen);
  const setOpenNav = useUiStore(s => s.setIsNavOpen);
  const isOpenNavMobile = useUiStore(s => s.isNavOpenMobile);
  const setIsNavOpenMobile = useUiStore(s => s.setIsNavOpenMobile);

  return (
    <>
      {!isMd ? (
        <SingleIconButton
          startIcon={isOpenNav ? <HiBars3CenterLeft /> : <LuMenu />}
          onClick={() => setOpenNav(!isOpenNav)}
          customColor="black"
        />
      ) : (
        <SingleIconButton
          startIcon={isOpenNavMobile ? <HiBars3CenterLeft /> : <LuMenu />}
          onClick={() => setIsNavOpenMobile(!isOpenNavMobile)}
          customColor="black"
        />
      )}
    </>
  );
};

export default ToggleSidebarBtn;

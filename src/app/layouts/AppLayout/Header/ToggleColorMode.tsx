import { MdBrightness4, MdBrightness7 } from 'react-icons/md';

import { SingleIconButton } from '@/shared/components/CustomButtons';
import { useUiStore } from '@/store/ui';

export type ToggleColorModeProps = {};

const ToggleColorMode: React.FC<ToggleColorModeProps> = () => {
  const mode = useUiStore(s => s.colorMode);
  const setColorMode = useUiStore(s => s.setColorMode);

  return (
    <>
      {mode === 'light' ? (
        <SingleIconButton
          startIcon={<MdBrightness4 />}
          onClick={() => setColorMode('dark')}
          customColor="black"
        />
      ) : (
        <SingleIconButton
          startIcon={<MdBrightness7 />}
          onClick={() => setColorMode('light')}
          customColor="white"
        />
      )}
    </>
  );
};

export default ToggleColorMode;

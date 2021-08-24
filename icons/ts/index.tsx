import Fullscreen from './Fullscreen';
import FullscreenExit from './FullscreenExit';
import Logout from './Logout';
import VolumeDown from './VolumeDown';
import VolumeMuted from './VolumeMuted';
import VolumeUp from './VolumeUp';

export enum Colors {
  white = '#ffffff',
  black = '#000000',
}

export enum Sizes {
  small = '16px',
  medium = '28px',
  large = '36px',
}

const ICONS = {
  Fullscreen,
  FullscreenExit,
  Logout,
  VolumeUp,
  VolumeDown,
  VolumeMuted,
}

interface IconProps {
  name: keyof typeof ICONS,
  color?: keyof typeof Colors,
  size?: keyof typeof Sizes,
}

const Icon = ({ name, size = 'medium', color = 'white' }: IconProps) => {
  const SelectedIcon = ICONS[name];
  return <SelectedIcon fill={Colors[color]} width={Sizes[size]} height={Sizes[size]} />
}

export default Icon;

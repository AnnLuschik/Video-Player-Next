import { default as Fullscreen } from './Fullscreen';
import { default as FullscreenExit } from './FullscreenExit';
import { default as Logout } from './Logout';
import { default as VolumeDown } from './VolumeDown';
import { default as VolumeMuted } from './VolumeMuted';
import { default as VolumeUp } from './VolumeUp';

export enum Colors {
  white = '#ffffff',
  black = '#000000',
}

export enum Sizes {
  small = '16px',
  medium = '28px',
  large = '36px',
}

interface IconProps {
  color: keyof typeof Colors,
  size: keyof typeof Sizes,
}

const names = {
  fullscreen: ({ color, size }: IconProps) => <Fullscreen fill={Colors[color]} size={Sizes[size]} />,
  fullscreenExit: ({ color, size }: IconProps) => <FullscreenExit fill={Colors[color]} size={Sizes[size]} />,
  logout: ({ color, size }: IconProps) => <Logout fill={Colors[color]} size={Sizes[size]} />,
  volumeDown: ({ color, size }: IconProps) => <VolumeDown fill={Colors[color]} size={Sizes[size]} />,
  volumeUp: ({ color, size }: IconProps) => <VolumeUp fill={Colors[color]} size={Sizes[size]} />,
  volumeMuted: ({ color, size }: IconProps) => <VolumeMuted fill={Colors[color]} size={Sizes[size]} />,
}

const Icon = ({ name, color = 'white', size = 'medium' }: {
  name: keyof typeof names,
  color: keyof typeof Colors,
  size: keyof typeof Sizes,
}) => names[name]({ color, size })

export default Icon;

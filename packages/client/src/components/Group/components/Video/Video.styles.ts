import { Avatar, Box, Color, styled } from '@material-ui/core';
import theme from 'lib/theme';
import { darken, desaturate } from 'polished';

export const AudioIndicator = styled('div')({
  width: '28px',
  marginRight: '4px',
  display: 'flex',
  justifyContent: 'center',
});

export const Information = styled('div')({
  position: 'absolute',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  bottom: '0',
  padding: '8px',
  height: '32px',
  width: '100%',
  backgroundImage:
    '-webkit-linear-gradient(bottom,rgba(0,0,0,0.7) 0,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%)',
});

interface AvatarProps {
  size: number;
  userColor?: Color;
}

export const UserAvatar = styled(Avatar)({
  width: ({ size }: AvatarProps) => `${size}px`,
  height: ({ size }: AvatarProps) => `${size}px`,
  fontSize: ({ size }: AvatarProps) => `${size / 2}px`,
  fontWeight: 600,
  backgroundColor: ({ userColor }: AvatarProps) => userColor?.[300],
});

export const Video = styled('div')({
  position: 'absolute',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const VideoWrapper = styled('div')({
  background: '#111',
  height: '100%',
  position: 'relative',
});

export const EmptyVideo = styled(Box)({
  position: 'absolute',
  backgroundColor: ({ userColor }: { userColor?: Color }) =>
    desaturate(0.7, darken(0.3, userColor?.['A700'] || '#222')),
});

export const LoadingIndicator = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
});

export const CrownIcon = styled('div')({
  height: '12px',
  width: '12px',
  marginLeft: '6px',
  color: theme.palette.warning.light,
  position: 'relative',
  top: '-2px',
});

export const VideoLabel = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 600,
});

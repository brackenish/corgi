import { Button, Card, IconButton, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import React from 'react';

import { User } from '../../lib/useSocketHandler';
import Video from '../Video';

interface Props {
  groupName: string;
  isCameraOff: boolean;
  isMuted: boolean;
  onJoin: () => void;
  stream: MediaStream;
  toggleCamera: () => void;
  toggleIsMuted: () => void;
  userName: string;
  onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  users: User[];
}

export default function Preview(props: Props) {
  const theme = useTheme();
  const addButtonSpacing = theme.spacing(1);

  return (
    <Box data-testid="group">
      <Box m={theme.spacing(0.5)} display="flex" pb={addButtonSpacing}>
        <Box m={theme.spacing(0.5)}>
          <Card>
            <Video
              key={props.stream.id}
              srcObject={props.stream}
              autoPlay={true}
              isMuted={true}
              isMirrored={true}
              width="740px"
              height="400px"
            />

            <IconButton
              onClick={props.toggleIsMuted}
              aria-label="mute"
              color="primary"
            >
              {props.isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>

            <IconButton
              onClick={props.toggleCamera}
              aria-label="toggle-camera"
              color="primary"
            >
              {props.isCameraOff ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>
          </Card>
        </Box>
        <Box
          m={theme.spacing(0.5)}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={theme.spacing(0.5)}>
            <Typography>{props.groupName}</Typography>
          </Box>
          <input onChange={props.onUserNameChange} value={props.userName} />
          {props.users.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
          <Button
            onClick={props.onJoin}
            variant="contained"
            color="primary"
            id="callButton"
          >
            Call
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
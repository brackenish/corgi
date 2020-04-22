import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';

import { User } from '../../lib/useSocketHandler';
import MediaSettingsPopover from '../MediaSettingsPopover';
import Video from '../Video';
import * as S from './Preview.styles';

interface Props {
  groupName: string;
  isCameraOff: boolean;
  isMuted: boolean;
  onJoin: () => void;
  onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCamera: () => void;
  toggleIsMuted: () => void;
  stream?: MediaStream | null;
  users: User[];
  userName: string;
}

export default function Preview(props: Props) {
  const theme = useTheme();
  const classes = S.useStyles();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        height="100%"
        maxWidth="1600px"
        mx="auto"
        p={[
          theme.spacing(0.5),
          theme.spacing(0.5),
          theme.spacing(0.5),
          theme.spacing(1.5),
        ]}
      >
        <Grid container={true} spacing={10}>
          <Grid item={true} xs={12} md={7}>
            <S.VideoCard elevation={5}>
              <Box width="100%" position="relative" pb="56.25%">
                {props.stream && (
                  <Video
                    key={props.stream.id}
                    srcObject={props.stream}
                    isMuted={true}
                    isMirrored={true}
                    label="(You)"
                    userName={props.userName}
                  />
                )}
              </Box>

              <S.Gradient />
              <S.Controls>
                <Box />
                <Box>
                  <IconButton onClick={props.toggleIsMuted} aria-label="mute">
                    {props.isMuted ? <MicOffIcon /> : <MicIcon />}
                  </IconButton>

                  <IconButton
                    onClick={props.toggleCamera}
                    aria-label="toggle-camera"
                  >
                    {props.isCameraOff ? <VideocamOffIcon /> : <VideocamIcon />}
                  </IconButton>
                </Box>
                <Box>
                  <MediaSettingsPopover />
                </Box>
              </S.Controls>
            </S.VideoCard>
          </Grid>
          <Grid item={true} xs={12} md={5}>
            <Box display="flex" alignItems="center" height="100%">
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                width="100%"
              >
                <Box mb={theme.spacing(0.5)}>
                  <Typography variant="h4">{props.groupName}</Typography>
                </Box>
                <form onSubmit={props.onJoin}>
                  <Box>
                    <Box mb={theme.spacing(0.5)} width="100%">
                      <TextField
                        autoFocus={true}
                        fullWidth={true}
                        label="Name"
                        onChange={props.onUserNameChange}
                        required={true}
                        value={props.userName}
                        variant="outlined"
                      />
                    </Box>

                    <Box mb={theme.spacing(0.2)}>
                      <AvatarGroup max={5}>
                        {props.users.map(
                          (user, idx) =>
                            user.id && (
                              <Tooltip title={user.name} key={idx}>
                                <Avatar
                                  className={classes.Avatar}
                                  alt={user.name}
                                  src="fallback"
                                />
                              </Tooltip>
                            ),
                        )}
                      </AvatarGroup>
                    </Box>

                    <Button
                      color="primary"
                      disabled={!props.userName}
                      fullWidth={true}
                      id="callButton"
                      onClick={props.onJoin}
                      type="submit"
                      variant="contained"
                    >
                      Join
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

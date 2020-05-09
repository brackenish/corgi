import { Box } from '@material-ui/core';
import React from 'react';

import { Me } from '../../../../../MeProvider/MeProvider';
import { User } from '../../../../lib/useSocketHandler';
import DraggableSplitWrapper from '../../../DraggableSplitWrapper';
import Video from '../../../Video';
import * as S from './PinnedVideoLayout.styles';

interface Props {
  streams: { user: User; stream?: MediaStream }[];
  localStream: MediaStream;
  pinnedStreamId: string | null;
  me: Me;
}

export default function PinnedVideoLayout(props: Props) {
  const pinnedStream = props.streams.find(stream => {
    return stream.stream?.id === props.pinnedStreamId;
  });

  const otherStreams = props.streams.filter(stream => {
    return stream.stream?.id !== props.pinnedStreamId;
  });

  const left = (
    <Box height="100%" width="100%">
      {pinnedStream && pinnedStream.stream && (
        <Video
          hasContextMenu={true}
          isMuted={false}
          label={pinnedStream.user?.name}
          srcObject={pinnedStream.stream}
          user={pinnedStream.user}
        />
      )}
    </Box>
  );
  const right = (
    <S.Streams>
      {props.localStream && (
        <Box width="100%" position="relative" pb="56.25%">
          <Video
            key={props.localStream.id}
            srcObject={props.localStream}
            isMuted={true}
            isMirrored={true}
            user={props.me}
            label="(You)"
          />
        </Box>
      )}

      {otherStreams.map(({ stream, user }) => {
        if (!stream) return null;

        return (
          <Box key={stream?.id} width="100%" position="relative" pb="56.25%">
            <Video
              srcObject={stream}
              isMuted={false}
              label={user.name}
              user={user}
              hasContextMenu={true}
            />
          </Box>
        );
      })}
    </S.Streams>
  );
  return (
    <Box width="100%" height="100%">
      <DraggableSplitWrapper
        minAsideWidth="5%"
        maxAsideWidth="75%"
        left={left}
        right={right}
      />
    </Box>
  );
}
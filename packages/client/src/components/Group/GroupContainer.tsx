import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import useGroup from '../../lib/hooks/useGroup';
import useUpdateGroup from '../../lib/hooks/useUpdateGroup';
import Hotkeys from '../Hotkeys/Hotkeys';
import { MediaSettingsContext } from '../MediaSettingsProvider';
import { MeContext } from '../MeProvider';
import ActivityView from './components/ActivityView';
import BasicView from './components/BasicView';
import BrowseTogether from './components/BrowseTogetherView';
import PermissionsAlert from './components/PermissionsAlert';
import Preview from './components/Preview';
import VideoView from './components/VideoView';
import { groupAdminId } from './lib/GroupState';
import useMediaStream from './lib/useLocalMediaStream';
import useMute from './lib/useMute';
import useScreenShareSocketHandler from './lib/useScreenShareSocketHandler';
import useSocketHandler from './lib/useSocketHandler';
import useToggleCamera from './lib/useToggleCamera';

export default function GroupContainer(
  props: RouteComponentProps<{ groupId: string }>,
) {
  const groupId = props.match.params.groupId;
  const group = useGroup(groupId);
  const setGroupAdminId = useSetRecoilState(groupAdminId);
  const updateGroup = useUpdateGroup();
  const { me, updateMe } = useContext(MeContext);
  const { isPermissonAlertOpen, handleClosePermissionAlert } = useContext(
    MediaSettingsContext,
  );

  const isAdmin = Boolean(
    group.data?.roles.editors.some(editor => editor === me?.firebaseAuthId),
  );

  const creatorId = Object.keys(group?.data?.roles.byId || {})[0];

  useEffect(() => {
    setGroupAdminId(creatorId);
  }, [creatorId, setGroupAdminId]);

  const [userName, setUserName] = useState(me?.name || '');

  const { localStream, localStreamStatus } = useMediaStream();
  const { toggleIsMuted, isMuted } = useMute(localStream);
  const { toggleCamera, isCameraOff } = useToggleCamera(localStream);
  const userData = useMemo(
    () => ({
      ...me,
      name: userName,
      isMuted,
      isCameraOff,
    }),
    [userName, isMuted, isCameraOff, me],
  );

  const {
    isInRoom,
    joinRoom,
    leaveRoom,
    messages,
    sendMessage,
    setUnreadMessageCount,
    streams,
    unreadMessageCount,
    users,
  } = useSocketHandler({
    groupId,
    localStream,
    isMuted,
    isCameraOff,
    userData,
  });

  const {
    disconnectScreenShare,
    connectScreenShare,
    isScreenSharePeerConnected: isSharingScreen,
  } = useScreenShareSocketHandler({
    groupId,
    userData,
  });

  useEffect(() => {
    if (me?.name && !userName) {
      setUserName(me.name);
    }
  }, [me, userName]);

  function onJoinCall() {
    joinRoom();
  }

  const onHangup = () => {
    leaveRoom();
  };

  const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
    updateMe({ name, id: me?.id });
  };

  const renderCommon = () => (
    <>
      <Helmet>
        <title>{`Corgi${
          group.data?.name ? ` - ${group.data?.name}` : ''
        }`}</title>
        <meta
          name="description"
          content={`Join my room - ${group.data?.name}`}
        />
      </Helmet>

      <PermissionsAlert
        isOpen={isPermissonAlertOpen}
        handleClose={handleClosePermissionAlert}
      />
    </>
  );

  if (!isInRoom || localStream === undefined) {
    return (
      <Hotkeys toggleCamera={toggleCamera} toggleIsMuted={toggleIsMuted}>
        {renderCommon()}
        <Preview
          groupName={group.data?.name || ''}
          isCameraOff={isCameraOff}
          isMuted={isMuted}
          me={me}
          onJoin={onJoinCall}
          onUserNameChange={onUserNameChange}
          stream={localStream}
          streamStatus={localStreamStatus}
          toggleCamera={toggleCamera}
          toggleIsMuted={toggleIsMuted}
          userName={userName}
          users={users}
        />
      </Hotkeys>
    );
  }

  const toggleIsSharingScreen = () => {
    if (isSharingScreen) {
      return disconnectScreenShare();
    }
    connectScreenShare();
  };

  if (isInRoom && localStream !== undefined) {
    const setActiveView = (id: string) => {
      updateGroup({
        groupId,
        activityId: id,
      });
    };

    return (
      <Hotkeys toggleCamera={toggleCamera} toggleIsMuted={toggleIsMuted}>
        {renderCommon()}
        <VideoView
          activeViewId={group.data?.activityId || '0'}
          isAdmin={isAdmin}
          isCameraOff={isCameraOff}
          isMuted={isMuted}
          isSharingScreen={isSharingScreen}
          onHangup={onHangup}
          setActiveViewId={setActiveView}
          streams={streams}
          toggleCamera={toggleCamera}
          toggleIsMuted={toggleIsMuted}
          toggleIsSharingScreen={toggleIsSharingScreen}
          messages={messages}
          sendMessage={sendMessage}
          setUnreadMessageCount={setUnreadMessageCount}
          unreadMessageCount={unreadMessageCount}
        >
          {({ streams, messages }) => {
            switch (group.data?.activityId) {
              case '1': {
                return (
                  <BrowseTogether
                    localStream={localStream}
                    me={me}
                    streams={streams}
                    activityUrl={group.data?.activityUrl}
                    messages={messages}
                    updateActivityUrl={value =>
                      updateGroup({ groupId, activityUrl: value })
                    }
                  />
                );
              }
              case '0': {
                return (
                  <BasicView
                    localStream={localStream}
                    me={me}
                    streams={streams}
                    messages={messages}
                  />
                );
              }
              default: {
                return (
                  <ActivityView
                    id={group.data?.activityId || '0'}
                    localStream={localStream}
                    streams={streams}
                  />
                );
              }
            }
          }}
        </VideoView>
      </Hotkeys>
    );
  }

  return null;
}

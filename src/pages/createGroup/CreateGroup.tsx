import { ChangeEvent, useEffect, useReducer, useState } from 'react';

import CreateGroupInfo from './components/CreateGroupInfo';
import CreateGroupLeaderInfo from './components/CreateGroupLeaderInfo';
import { ActionTypes, CreateGroupTypes, CurrentPageType } from './types/stateType';

const CreateGroup = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPageType['currentPage']>('GroupInfoPage');

  const initialState = {
    groupName: '',
    groupInfo: '',
    groupImageFile: '',
    isPublic: true,
    topic: '',
    topicTag: '',
    topicDesc: '',
    leaderPenName: '',
    leaderDesc: '',
  };

  const reducer = (state: CreateGroupTypes, action: ActionTypes) => {
    switch (action.type) {
      case 'setGroupName': {
        return {
          ...state,
          groupName: action.value,
        };
      }
      case 'setGroupInfo': {
        return {
          ...state,
          groupInfo: action.value,
        };
      }
      case 'setGroupImageFile': {
        return {
          ...state,
          groupImageFile: action.value,
        };
      }
      case 'setIsPublic': {
        return {
          ...state,
          isPublic: action.value,
        };
      }
      case 'setTopic': {
        return {
          ...state,
          topic: action.value,
        };
      }
      case 'setTopicTag': {
        return {
          ...state,
          topicTag: action.value,
        };
      }

      case 'setTopicDesc': {
        return {
          ...state,
          topicDesc: action.value,
        };
      }
      case 'setLeaderPenName': {
        return {
          ...state,
          leaderPenName: action.value,
        };
      }
      case 'setLeaderDesc': {
        return {
          ...state,
          leaderDesc: action.value,
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    groupName,
    groupInfo,
    groupImageFile,
    isPublic,
    topic,
    topicTag,
    topicDesc,
    leaderPenName,
    leaderDesc,
  } = state;
  useEffect(() => {
    console.log(groupName, groupInfo, groupImageFile, isPublic);
  }, [groupName]);
  const setGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setGroupName', value: e.target.value });
  };

  const setGroupInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setGroupInfo', value: e.target.value });
  };

  const setGroupImageFile = (inputValue: string) => {
    dispatch({ type: 'setGroupImageFile', value: inputValue });
  };

  const setIsPublic = (inputValue: boolean) => {
    dispatch({ type: 'setIsPublic', value: inputValue });
  };

  const setTopic = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setTopic', value: e.target.value });
  };

  const setTopicTag = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setTopicTag', value: e.target.value });
  };
  const setTopicDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setTopicDesc', value: e.target.value });
  };
  const setLeaderPenName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setLeaderPenName', value: e.target.value });
  };
  const setLeaderDesc = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setLeaderDesc', value: e.target.value });
  };

  return (
    <>
      {currentPage === 'GroupInfoPage' && (
        <CreateGroupInfo
          setCurrentPage={setCurrentPage}
          groupName={groupName}
          setGroupName={setGroupName}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
          groupImageFile={groupImageFile}
          setGroupImageFile={setGroupImageFile}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          topic={topic}
          topicTag={topicTag}
          setTopic={setTopic}
          setTopicTag={setTopicTag}
          setTopicDesc={setTopicDesc}
        />
      )}
      {currentPage === 'GroupLeaderInfoPage' && (
        <CreateGroupLeaderInfo
          setCurrentPage={setCurrentPage}
          setLeaderPenName={setLeaderPenName}
          leaderDesc={leaderDesc}
          setLeaderDesc={setLeaderDesc}
        />
      )}
    </>
  );
};

export default CreateGroup;

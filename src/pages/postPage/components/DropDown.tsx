/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

import { Topics } from '../apis/fetchTopic';

interface DropDownDataPropsType {
  topicList: Topics[];
  setTopic: (e: React.MouseEvent<HTMLDivElement>) => void;
  setWriter: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedTopic: string | undefined;
  selectedWriter: string | undefined;
}

const DropDown = (props: DropDownDataPropsType) => {
  const { topicList, selectedTopicId, updateAnonymous, isTemp, tempTopicList, tempAnonymous } =
    props;
  // 드롭다운에서 선택된 값 저장 state

  const [selectedValues, setSelectedValues] = useState({
    topic: '',
    writer: '작자미상',
  });

  // 어느 뷰인지 확인
  const { type } = useParams() as { type: string };

  // 익명 여부 저장
  useEffect(() => {
    if (selectedValues.writer == '작자미상') {
      updateAnonymous(true);
    } else {
      updateAnonymous(false);
    }
  }, [selectedValues.writer]);

  // 드롭다운 리스트 중 선택된 값 저장 이벤트 핸들러
  const handleListItem = (key: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  // 불러온 글감 중 가장 초기값 보여주기 위함
  useEffect(() => {
    if (isTemp) {
      if (tempTopicList && tempTopicList.length > 0) {
        setSelectedValues({
          topic: tempTopicList?.find((topic) => topic.isSelected)?.topicName || '',
          writer: tempAnonymous ? '작자미상' : '필명',
        });
      }
    } else {
      if (type != 'edit') {
        if (topicList && topicList.length > 0) {
          setSelectedValues({
            topic: topicList[0]?.topicName,
            writer: selectedValues.writer,
          });
        }
      }
    }
  }, [tempTopicList, topicList, isTemp]);
  return (
    <DropDownWrapper>
      <TopicDropDown setTopic={setTopic} selectedTopic={selectedTopic} topicList={topicList} />
      <WriterDropDown setWriter={setWriter} selectedWriter={selectedWriter} />
    </DropDownWrapper>
  );
};

export default DropDown;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
  justify-content: flex-start;
  width: 82.6rem;
`;

export const DropDownToggle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.4rem;
  padding: 0.8rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  }
`;

export const DropDownContent = styled.span<{ $contentWidth: number }>`
  width: ${({ $contentWidth }) => `${$contentWidth}rem`};
  margin-right: 2rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button2};
`;

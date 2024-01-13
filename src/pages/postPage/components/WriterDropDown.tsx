import React from 'react';

import { DropDownToggle, DropDownContent, DropDownPropsType } from './DropDown';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';

const WriterDropDown = (props: DropDownPropsType) => {
  const { isOpen, activeDropDown } = props;

  const handleOnClick = () => {
    activeDropDown('writer');
  };

  return (
    <DropDownToggle>
      <DropDownContent $contentWidth={14.6} onClick={handleOnClick}>
        필명
      </DropDownContent>{' '}
      {/* api로 대체 필요 */}
      {isOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
    </DropDownToggle>
  );
};

export default WriterDropDown;

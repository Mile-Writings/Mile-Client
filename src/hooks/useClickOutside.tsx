import React, { useEffect, useState } from 'react';

const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 드롭다운이 열려있고, 드롭다운 외부가 클릭됐을 경우
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // 실행할 함수를 인자로 받아와서 실행시켜 줌
        callback();
      }
    };

    // 클릭 이벤트가 발생하면 handleClickOutside를 실행시킨다
    document.addEventListener('click', handleClickOutside);

    // 이벤트 지워주기
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);

  return useClickOutside;
};

export default useClickOutside;

// const useClickOutside = (ref: React.RefObject<HTMLElement>, initialState: boolean) => {
//   const [isListOpen, setListIsOpen] = useState(initialState);

//   useEffect(() => {
//     const onClick = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setListIsOpen(!isListOpen);
//       }
//     };

//     if (isListOpen) {
//       window.addEventListener('click', onClick);
//     }

//     return () => {
//       window.removeEventListener('click', onClick);
//     };
//   }, [isListOpen, ref]);

//   return [isListOpen, setListIsOpen];
// };

// export default useClickOutside;

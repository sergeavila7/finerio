import React, { useEffect, useState, useRef } from 'react';

const Movement = ({ movement }) => {
  const { _id, description, customDate, type, amount } = movement;

  const element = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(
    function () {
      Promise.resolve(
        typeof window.IntersectionObserver !== 'undefined'
          ? window.IntersectionObserver
          : import('intersection-observer')
      ).then(() => {
        const observer = new window.IntersectionObserver(function (entries) {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });
        observer.observe(element.current);
      });
    },
    [element]
  );

  return (
    <tr ref={element} key={_id}>
      {show && (
        <>
          <td>{customDate}</td>
          <td>{type}</td>
          <td>{description}</td>
          <td>${amount}</td>
        </>
      )}
    </tr>
  );
};

export default Movement;

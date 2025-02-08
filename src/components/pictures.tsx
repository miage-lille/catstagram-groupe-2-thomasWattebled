import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { picturesSelector } from '../reducer';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);

  return (
    <div>
      {pictures.map((picture, index) => (
        <img
          key={index}
          src={picture.previewFormat}
          alt={`Preview ${index}`}
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "SELECT_PICTURE", payload: picture })}
        />
      ))}
    </div>
  );
};

export default Pictures;

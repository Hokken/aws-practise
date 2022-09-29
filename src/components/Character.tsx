import { CharacterRemoteType } from "../types/Characters";
import styled from "styled-components";

const CharacterWrapper = styled.div`
display: flex;
justify-content: space-between;
  padding: 5px;
  border: 1px solid white;
`;

const DeleteButton = styled.button`
  margin-left: 10px;`

type Props = CharacterRemoteType & {
    deleteCharacter: (userId: string) => void;
}

export const Character: React.FC<Props> = (props) => {
  return (
    <CharacterWrapper>
      <span>
        {props.userName} is a {props.profession}
      </span>
      <DeleteButton onClick={() => props.deleteCharacter(props.userName)}>delete</DeleteButton>
    </CharacterWrapper>
  );
};

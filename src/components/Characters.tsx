import React from "react";
import styled from "styled-components";
import { CharacterRemoteType } from "../types/Characters";
import { Character } from "./Character";

// == TYPES START ==
type Props = {
  characters: CharacterRemoteType[];
  deleteCharacter: (userName: string) => void;
};
// == TYPES END ==

const CharactersWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;
const ListItem = styled.li`
  list-style: none;
`;

const Characters: React.FC<Props> = (props) => {
  const { characters } = props;
  return (
    <CharactersWrapper>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character, index) => {
            const { userId, userName, profession } = character;
            return (
              <ListItem key={userName}>
                <Character
                  userName={userName}
                  profession={profession}
                  userId={userId}
                  deleteCharacter={props.deleteCharacter}
                />
              </ListItem>
            );
          })}
        </ul>
      ) : (
        <p>No characters yet</p>
      )}
    </CharactersWrapper>
  );
};

export default Characters;

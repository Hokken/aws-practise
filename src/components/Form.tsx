import { useEffect, useState } from "react";
import styled from "styled-components";
import { CharacterRemoteType, CharacterType } from "../types/Characters";
import Characters from "./Characters";

// == STYLES START ==
const Wrapper = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  text-align: center;
  color: white;
  padding: 0 20px 20px;
  width: 400px;
  margin: 50px auto;
`;
const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const InputLabel = styled.label`
  display: inline-block;
  text-align: left;
  margin-right: 10px;
`;
const InputField = styled.input`
  width: 250px;
`;
const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 5px;
`;
// == STYLES END ==

// == TYPES START ==
type FormElements = HTMLFormControlsCollection & {
  userName: HTMLInputElement;
  profession: HTMLInputElement;
};
type UsernameFormElement = HTMLFormElement & {
  readonly elements: FormElements;
};
// == TYPES END ==

export const Form = () => {
  const [characters, setCharacters] = useState<CharacterRemoteType[]>([]);

  useEffect(() => {
    console.log(process.env);
    getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_AWS_API_URL}/dev/characters/all`
    );
    const result = await response.json();
    setCharacters(result.characters);
  };

  const deleteCharacter = async (userName: string) => {
    await fetch(`${process.env.REACT_APP_AWS_API_URL}/dev/characters/?userName=${userName}`, {
      method: "DELETE"
    });
    getAllCharacters();
  };

  const submitCharacter = async (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault();
    console.log(
      e.currentTarget.elements.userName.value,
      e.currentTarget.elements.profession.value
    );
    const character: CharacterType = {
      userName: e.currentTarget.elements.userName.value,
      profession: e.currentTarget.elements.profession.value,
    };

    await fetch(`${process.env.REACT_APP_AWS_API_URL}/dev/characters/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });
    getAllCharacters();
  };

  return (
    <>
      <Wrapper>
        <h2>Create an RPG Character</h2>
        <form action="" onSubmit={submitCharacter}>
          <BlockWrapper>
            <InputLabel htmlFor="userName">Name </InputLabel>
            <InputField type="text" name="userName" id="userName" />
          </BlockWrapper>
          <BlockWrapper>
            <InputLabel htmlFor="profession">Profession </InputLabel>
            <InputField type="text" name="profession" id="profession" />
          </BlockWrapper>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </Wrapper>
      <h2>Characters List</h2>
      <Characters characters={characters} deleteCharacter={deleteCharacter} />
    </>
  );
};

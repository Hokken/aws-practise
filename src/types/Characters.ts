export interface CharacterType {
    userName: string;
    profession: string;
}

export interface CharacterRemoteType extends CharacterType {
    userId: string;
}
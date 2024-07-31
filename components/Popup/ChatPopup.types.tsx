import { Dispatch, SetStateAction } from 'react';

export interface ChatPopupProps {
  closePopup: () => void;
  activityId: number;
  activityTitle: string;
  activityImage: string;
  isAdmin?: boolean;
}

export interface ChatRoomProps {
  id: number;
  message: string[];
  sender: string[];
  user: {
    id: number;
    name: string;
    profile: string;
  };
}

export interface ChatRoomPopupProps {
  activityId: number;
  handleSenderId: Dispatch<SetStateAction<number>>;
  handleSendEnable: Dispatch<SetStateAction<boolean>>;
  isEnter: boolean;
  handleIsEnter: Dispatch<SetStateAction<boolean>>;
  handleNickName: Dispatch<SetStateAction<string>>;
  handleProfile: Dispatch<SetStateAction<string>>;
}

export interface ChatListProps {
  isAdmin?: boolean;
}

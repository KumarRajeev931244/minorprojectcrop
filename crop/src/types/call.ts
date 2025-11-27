export interface IncomingCallPayload {
  offer: RTCSessionDescriptionInit;
  callerId: string;
}

export interface CallAnswerPayload {
  answer: RTCSessionDescriptionInit;
}

export interface IceCandidatePayload {
  candidate: RTCIceCandidateInit;
  userId: string;
}

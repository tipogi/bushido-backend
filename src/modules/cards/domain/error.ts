interface CardError {
  message: CardErrorMessage;
  key: CardErrorType;
}

export enum CardErrorMessage {
  PATH_NOT_FOUND = 'The selected topic, it does not have a path',
  DOMAIN_IS_NOT_FOUND = 'Domain is not found',
  WRONG_HASH = 'The hash does not match with the domain hash',
}

export enum CardErrorType {
  PATH_NOT_FOUND = 'PATH_NOT_FOUND',
  DOMAIN_IS_NOT_FOUND = 'DOMAIN_IS_NOT_FOUND',
  WRONG_HASH = 'WRONG_HASH',
}

export const PATH_NOT_FOUND_ERROR: CardError = {
  message: CardErrorMessage.PATH_NOT_FOUND,
  key: CardErrorType.PATH_NOT_FOUND,
};

export const DOMAIN_IS_NOT_FOUND_ERROR: CardError = {
  message: CardErrorMessage.DOMAIN_IS_NOT_FOUND,
  key: CardErrorType.PATH_NOT_FOUND,
};

export const DOMAIN_WRONG_HASH_ERROR: CardError = {
  message: CardErrorMessage.WRONG_HASH,
  key: CardErrorType.WRONG_HASH,
};

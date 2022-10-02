export const environment = {
  production: false,

  /**
   * User validation properties
   */
  PASSWORD_MIN_LENGTH: 2,
  PASSWORD_MAX_LENGTH: 30,
  USERNAME_MIN_LENGTH: 4,
  USERNAME_MAX_LENGTH: 10,

  /**
   * Product validation properties
   */
  RANKING_MIN: 1,
  RANKING_MAX: 5,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 30,
  DESCRIPTION_MIN_LENGTH: 25,
  DESCRIPTION_MAX_LENGTH: 255,

  /**
   * Cart validation properties
   */
  CART_QUANTITY_MIN: 1,
  CART_QUANTITY_MAX: 8,

  /** Session secret key */
  SESSION_SECRET_KEY: 'jagslk23#96@55$FhgFG%fsdlk;jwe5r7328yhGSHFDS',
};

export const getBasicInnerWidth = (): string => {
  const innerWidth = window.innerWidth;
  if (innerWidth <= 1230) {
    return '90%';
  } else if (innerWidth <= 1440) {
    return '75%';
  } else if (innerWidth <= 1630) {
    return '60%';
  } else return '50%';
};

export const getPremiumInnerWidth = (): string => {
  const innerWidth = window.innerWidth;
  if (innerWidth <= 1230) {
    return '90%';
  } else if (innerWidth <= 1440) {
    return '60%';
  } else if (innerWidth <= 1630) {
    return '50%';
  } else return '40%';
};

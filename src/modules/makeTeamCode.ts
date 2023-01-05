const makeTeamCode = () => {
  const code = new Date().getTime().toString(36).substr(2, 6);
  return code;
};

export default makeTeamCode;

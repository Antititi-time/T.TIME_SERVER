const makeTeamCode = () => {
  const code = new Date().getTime().toString(10).substr(2, 9);
  return Number(code);
};

export default makeTeamCode;

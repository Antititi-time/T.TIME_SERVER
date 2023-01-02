const makeTeamCode = () => {
    const code = Math.random().toString(36).substr(2,6);
    return code;
}

export default makeTeamCode;
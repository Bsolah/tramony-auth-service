const constructResponse = (status: number, message: string, data: any) => {
  return {
    status,
    message,
    data,
  };
};

export default constructResponse;
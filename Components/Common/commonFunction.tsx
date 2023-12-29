const changeDateFormat = (date: any) => {
  let newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1; // Months are zero-indexed
  const year = newDate.getFullYear().toString();

  const dayFormatted = day < 10 ? "0" + day : day;
  const monthFormatted = month < 10 ? "0" + month : month;

  const dateFormatted = `${dayFormatted}-${monthFormatted}-${year}`;
  return dateFormatted;
};

const keyNullManipulation = (data: any): any => {
  const updateValue = (value: any): any => {
    if (value === "") {
      return null;
    } else if (Array.isArray(value)) {
      return value.length === 0 ? [] : value.map(updateValue);
    } else if (typeof value === "object") {
      return keyNullManipulation(value);
    } else {
      return value;
    }
  };

  const updatedData: any = { ...data };

  Object.keys(updatedData).forEach((key) => {
    updatedData[key] = updateValue(updatedData[key]);
  });

  return updatedData;
};

export { changeDateFormat, keyNullManipulation };

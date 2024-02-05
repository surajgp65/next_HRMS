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

const replaceEmptyWithNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === null) {
      continue;
    }

    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      obj[key] = [];
    } else if (typeof obj[key] === "object") {
      obj[key] = JSON.parse(JSON.stringify(replaceEmptyWithNull(obj[key])));

      // If the nested object is empty, set it to null
      if (obj[key] && Object.keys(obj[key]).length === 0) {
        obj[key] = null;
      }
    } else if (typeof obj[key] === "string" && obj[key].trim() === "") {
      obj[key] = null;
    }
  }

  return obj;
};

export { changeDateFormat, keyNullManipulation, replaceEmptyWithNull };

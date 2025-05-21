// workers/dataWorker.js
self.onmessage = (event) => {
  const { type, data, properties, values } = event.data;
  // console.log(type);
  switch (type) {
    case "getUniqueOptions": {
      const uniqueOptions = getUniqueOptions(data, properties);
      console.log("work done getUniqueOptions");
      self.postMessage({ uniqueOptions });
      break;
    }
    case "handleSearch": {
      console.log("work in proress");
      const { filteredData, uniqueOptions } = handleSearch(
        data,
        values,
        properties
      );

      self.postMessage({ filteredData, uniqueOptions });
      console.log("work is done");
      break;
    }

    default:
      break;
  }
};

const getUniqueOptions = (data, properties) => {
  const uniqueOptions = {};

  properties.forEach((property) => {
    uniqueOptions[property] = Array.from(
      new Set(
        data
          .map((item) => String(item[property]))
          .filter((value) => value && value !== "N/A" && value !== "None")
      )
    ).sort();
  });

  return uniqueOptions;
};

const handleSearch = (data, values, properties) => {
  const filteredData = data.filter((item) => {
    return Object.keys(values).every(
      (key) =>
        !values[key] ||
        // @ts-ignore
        String(item[key]).toLowerCase() === values[key].toLowerCase()
    );
  });
  const uniqueOptions = getUniqueOptions(filteredData, properties);
  return {
    filteredData,
    uniqueOptions,
  };
};

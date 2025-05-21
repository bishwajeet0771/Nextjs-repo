self.onmessage = function (e) {
  const { data, bhkOption } = e.data;

  const filteredData =
    bhkOption === "0"
      ? data
      : data.filter((item) => item.bhkName === bhkOption);

  postMessage(filteredData);
};

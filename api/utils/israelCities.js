let data = {
  resource_id: "b7cf8f14-64a2-4b33-8d4b-edb286fdbd37",
  limit: 1500, //1273
};
$.ajax({
  url: "https://data.gov.il/api/action/datastore_search",
  data: data,
  dataType: "json",
  success: (data) => {
    //debugger;
    data.result.records.map((item) => console.log(item));
  },
});

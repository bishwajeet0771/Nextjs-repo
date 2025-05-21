export const getHomeListingData = async (
  city?:number|string, 
  // coordinates?:{
  //     lat:number,
  //     lng:number
  //   }
  ) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/listing`;
    if(city){
      url = `${url}?city=${city}`
    }
    const res = await fetch(url, {
      next: {
        revalidate: 90,
      },
    });
    const data = await res.json();
    return data;
  };

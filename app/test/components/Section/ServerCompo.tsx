import React from "react";

type Props = {};

export default async function ServerCompo({}: Props) {
  // const alblums = await getAlbums();
  return (
    <div>
      {/* {alblums.map((album) => (
        <div>{album.title}</div>
      ))} */}
    </div>
  );
}

// const getAlbums = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/albums");
//   const data = await res.json();
//   return data;
// };

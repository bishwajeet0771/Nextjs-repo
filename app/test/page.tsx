"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [iframeWidth, setIframeWidth] = useState(1200);
  const [iframeHeight, setIframeHeight] = useState(700);
  const BIN_ID = "67f630178960c979a58135b1";
  const API_KEY =
    "$2a$10$qeQSzTvJm5U01Pt7L5mOvu9yhC05Ms2MjXE8/NA09.mUdbHuH.Eca";

  const fetchPassword = async () => {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    const data = await res.json();
    return data.record.password;
  };

  const handleAuth = async (e: any) => {
    e.preventDefault();
    const correctPassword = await fetchPassword();
    if (inputValue === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Wrong password, try again.");
    }
  };

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        // User moved mouse out of the window
        setAuthenticated(false); // Reset authentication state
        setInputValue("");
      }
    };

    const handleMouseOver = () => {};

    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
        inventore eius veritatis quia, dolore mollitia natus magnam et dolorem
        sed alias fugit commodi soluta sequi delectus non distinctio adipisci
        numquam possimus, suscipit perferendis? Nobis dolor suscipit harum
        deserunt eaque ratione doloribus recusandae beatae, necessitatibus
        quibusdam reiciendis possimus pariatur nesciunt excepturi aperiam in
        praesentium asperiores ab. Quo hic ut tempore aut, voluptatibus
        mollitia, doloremque placeat sit modi ab provident nisi voluptas nulla
        esse rerum, nobis enim deleniti vitae facilis porro. Quis atque aliquam
        perspiciatis voluptate excepturi fuga assumenda culpa eos aut odit
        earum, consequuntur, quibusdam quia, temporibus recusandae blanditiis
        minus tempore? Consequatur tenetur debitis reprehenderit ipsum,
        cupiditate nesciunt iure! Assumenda, dolorum aliquam. Maxime esse ad
        maiores porro accusamus exercitationem cum aut, nesciunt et dolores
        harum fugit officiis, sequi nam quos inventore natus, eos dicta
        praesentium suscipit dolore quidem. Doloremque, laborum. Reiciendis
        praesentium dolore cum. Voluptatibus ad fugit vero corporis cum, cumque
        culpa! Earum ab, pariatur eaque sed quidem quaerat, temporibus dicta non
        beatae nisi officia vitae est, suscipit consectetur tenetur deleniti ad!
        Alias suscipit magni ipsum laudantium provident fugit praesentium
        dolorem culpa quo ratione obcaecati adipisci, dolor molestiae commodi?
        Ipsam in totam tempora. Molestiae deleniti dolores enim facere ratione.
        Architecto repudiandae in sint cumque repellendus ad mollitia fugiat
        quibusdam eum culpa iure alias accusamus adipisci, eaque error,
        voluptatum asperiores sit. Animi expedita, magnam itaque aliquid
        deserunt error! Rem, eveniet quos. Provident ex ab obcaecati quos nemo
        impedit possimus voluptatibus error officiis! Facilis minus voluptatibus
        sed consequatur, voluptate doloribus nam aperiam eius distinctio veniam
        sint nemo, mollitia dolorum! Quae fuga qui consequatur. Et placeat,
        asperiores optio laudantium soluta dicta ad vitae alias dolorum natus
        enim repudiandae molestias praesentium, unde rem. Ad distinctio fugit
        expedita porro, rerum aliquam eveniet suscipit, enim quo architecto,
        magni dicta fuga recusandae officia in assumenda a! Mollitia rem
        obcaecati, aspernatur libero natus reiciendis architecto veniam vitae,
        iusto in dolores recusandae pariatur, maxime sapiente. Laboriosam quos
        omnis natus quidem maxime consectetur repudiandae porro eos est, minima
        ex quibusdam ut dolore ducimus sint totam architecto harum quis ab?
        Dolore ipsa ratione obcaecati similique consequatur doloribus aliquam
        libero, veniam deserunt, illum provident expedita reiciendis officia
        minus, laborum earum error dolor suscipit quas ea voluptates aut. Id
        magni voluptates cum eos est pariatur debitis quis labore quia, et,
        porro qui iste aperiam obcaecati minus mollitia! Exercitationem vero
        dolorum quos magni sint eius quidem quis placeat dolorem ratione,
        numquam blanditiis enim explicabo saepe corrupti eveniet commodi
        excepturi animi eos! Ratione tenetur eaque dolore quo sunt sed, quos
        deserunt, beatae cumque fugit dolores autem cum tempore ut saepe labore,
        voluptas earum aliquam placeat nemo quas quod error suscipit. Recusandae
        voluptatum voluptates, asperiores quidem quis minima atque reprehenderit
        architecto impedit dolores incidunt molestiae consequatur harum
        necessitatibus cupiditate et, vel repellendus dolor quia fuga fugiat
        dignissimos! Optio est nobis, facilis asperiores libero rem quod
        consectetur beatae nam quis eligendi placeat repellendus harum fugiat
        modi blanditiis tempore autem atque. Illo eum amet, commodi, laborum
        impedit praesentium sapiente porro quaerat, iure et possimus explicabo
        expedita repellat laboriosam similique.
        {/* Content omitted for brevity */}
        <form onSubmit={handleAuth}>
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <label htmlFor="widthInputFiled" className="mr-2">
          Width:
        </label>
        <input
          id="widthInputFiled"
          type="number"
          value={iframeWidth}
          onChange={(e) => setIframeWidth(Number(e.target.value))}
          className="border border-gray-400 px-2 py-1 w-20 mr-4"
        />
        <label htmlFor="heightInputFiled" className="mr-2">
          Height:
        </label>
        <input
          id="heightInputFiled"
          type="number"
          value={iframeHeight}
          onChange={(e) => setIframeHeight(Number(e.target.value))}
          className="border border-gray-400 px-2 py-1 w-20"
        />
      </div>

      <iframe
        width={iframeWidth}
        height={iframeHeight}
        src="https://www.youtube.com/embed/ogjf7ORKfd8?si=7JKmtqJu20l82SRT"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

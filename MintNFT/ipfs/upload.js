async function run() {
  const { create } = await import("ipfs-http-client");
  //   const ipfs = await create();
  const ipfs = await create("/ip4/127.0.0.1/tcp/5001");

  // we added three attributes, add as many as you want!
  const metadata = {
    path: "/",
    content: JSON.stringify({
      name: "MeebPlay",
      attributes: [
        {
          trait_type: "Cool",
          value: "100",
        },
        {
          trait_type: "MetaReady",
          value: "100",
        },
        {
          trait_type: "Profit",
          value: "101",
        },
      ],
      // update the IPFS CID to be your image CID
      image:
        "https://ipfs.io/ipfs/QmVieYNziE6EHKg1VTym13nE4q7ydcds48TmyctZ8mqZjw",
      description: "MeebPlay!",
    }),
  };

  const result = await ipfs.add(metadata);
  console.log(result);

  process.exit(0);
}

run();

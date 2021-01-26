import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { Tema } from "contacter-theme";
import "contacter-theme/dist/index.css";

export default function DynamicPage() {
  const router = useRouter();
  const {
    query: { username },
  } = router;
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    if (username)
      await axios
        .get("https://api.bilink.me/api/public/userpage?username=" + username)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
          setLoad(true);
        })
        .catch((err) => {
          return err?.response?.data;
        });
  }, [username]);

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      {!load ? "loading" : <Tema data={data} />}
    </>
  );
}

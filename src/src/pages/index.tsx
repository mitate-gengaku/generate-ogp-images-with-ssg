import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import Head from "next/head";
import Image from "next/image";
import path from "path";
import { cwd } from "process";

interface Props {
  url: string;
}

const Home = ({ url }: Props) => {
  return (
    <>
      <Head>
        <title>OGPの生成の練習</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />

        <meta name="description" content={"OGPの生成の練習"} />

        <meta property="og:title" content={"OGPの生成の練習"} />

        <meta name="og:description" content={"description"} />

        <meta property="og:type" content={"website"} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={"OGPの生成の練習"} />
        <meta property="og:image" content={"/ogp.png"} />

        <meta name="twitter:title" content={"OGPの生成の練習"} />
        <meta name="twitter:description" content={"OGPの生成の練習"} />
        <meta name="twitter:image" content={"/ogp.png"} />

        <link
          rel="canonical"
          href={url}
        />
      </Head>
      <div>
        <Image 
          src={"/ogp.png"}
          alt="画像"
          width={1200}
          height={630}
          />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.font = 'bold 64px';
  ctx.fillStyle = '#1F2937';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';

  ctx.fillText("Hello World", 500, 100);
  const url = canvas.toDataURL("image/png");
  const image = url.split(";base64,").pop();

  if(!image) return;

  writeFileSync(path.join(cwd(), "public", 'ogp.png'), image, {
    encoding: "base64"
  });

  return {
    props: {
      url: process.env.BASE_URL,
    }
  }
}

export default Home;

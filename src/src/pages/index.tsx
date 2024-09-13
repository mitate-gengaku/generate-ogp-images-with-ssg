import { createCanvas } from "@napi-rs/canvas";
import Head from "next/head";
import Image from "next/image";

interface Props {
  url: string;
  imgUrl: string;
}

const Home = ({ url, imgUrl }: Props) => {
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
        <meta property="og:image" content={imgUrl} />

        <meta name="twitter:title" content={"OGPの生成の練習"} />
        <meta name="twitter:description" content={"OGPの生成の練習"} />
        <meta name="twitter:image" content={imgUrl} />

        <link
          rel="canonical"
          href={url}
        />
      </Head>
      <div>
        <Image 
          src={imgUrl}
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

  ctx.fillText("Hello World", 500, 100)

  return {
    props: {
      url: process.env.BASE_URL,
      imgUrl: canvas.toDataURL("image/png")
    }
  }
}

export default Home;

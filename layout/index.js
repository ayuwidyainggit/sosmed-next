import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function Layout({ children, metaTitle, metaDesc }) {
  return (
    <div>
      <Head>
        <title>CAT - {metaTitle}</title>
        <meta
          name="description"
          content={metaDesc || "Generated by create next app"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <div className="">
          <Navbar />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}

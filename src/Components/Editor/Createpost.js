import userAuth from "../Auth/UserAuth";
import MyComponent from "./Editor";
import Layout from "../Layout/Layout";
const Createpost = () => {
  return (
    <>
    {/* <Head>
        <title>Spilleet</title>
        <meta name="description" content="Spilleet social media app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
        <title>Create new post</title>
      </Head> */}
    <Layout>
      <MyComponent />
    </Layout>
    </>
  );
};


export default Createpost

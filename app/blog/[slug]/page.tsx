import BlogDetailsDescription from "../blogDetailSextion/BlogDetailsDescription";
import BlogDetailsFirstBlock from "../blogDetailSextion/BlogDetailsFirstBlock";
import FeaturedBlogs from "../blogDetailSextion/FeaturedBlogs";
import SubscribeBlock from "../blogDetailSextion/SubscribeBlock";

// type Params = {
//   params: {
//     slug: string;
//   };
// };

export async function generateMetadata() {
  // return { title: `Post: ${params.slug}` };
  return "Get Right Property";
}

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <BlogDetailsFirstBlock />
    <BlogDetailsDescription />
    <FeaturedBlogs />
    <SubscribeBlock />
  </div> 
}


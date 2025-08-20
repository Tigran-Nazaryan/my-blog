import {getPostById} from '@/lib/db';
import {Props} from "@/app/(main)/blog/types";
import PostContent from "@/components/ui/PostContent";

export default async function PostPage({params}: {
  params: Promise<Props>
}) {
  const {id} = await params;
  const post = await getPostById(id);
  return <PostContent post={post}/>
}

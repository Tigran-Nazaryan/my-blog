import { getPostById } from '@/lib/api';
import {Props} from "@/app/(main)/blog/types";
import PostContent from "@/components/ui/PostContent";

export default async function PostPage({ params }: Props) {
    const post = await getPostById(params.slug);
    return <PostContent post={post} />
}

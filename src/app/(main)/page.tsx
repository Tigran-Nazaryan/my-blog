import BlogListItem from "@/components/ui/BlogListItem";
import {fetchPosts} from "@/lib/db";

export default async function Home() {
    const posts = await fetchPosts();

    return (
        <div>
            {
                posts.map((post) => (
                    <BlogListItem key={post.id} post={post}/>
                ))
            }
        </div>
    );
}

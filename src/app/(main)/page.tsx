import styles from "../page.module.css";
import BlogListItem from "@/components/ui/BlogListItem";
import {Post} from "@/types/post";
import {getPosts} from "@/lib/api";


export default async function Home() {
    const posts: Post[] = await getPosts();

    return (
    <div className={styles.page}>
        {
            posts.map((post) => (
                <BlogListItem key={post.id} post={post} />
            ))
        }
    </div>
  );
}

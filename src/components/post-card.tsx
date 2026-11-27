import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="pcard lift">
      <div className="pimg">
        {post.cover && (
          <Image src={post.cover} alt={post.coverAlt} fill preload={priority} sizes="(min-width:1080px) 30vw, (min-width:640px) 45vw, 92vw" className="object-cover" />
        )}
      </div>
      <div className="pbody">
        <p className="meta">{formatDate(post.date)} · {post.readingMinutes} menit baca</p>
        <h3>
          <Link href={`/${post.slug}/`} className="after:absolute after:inset-0">{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}
